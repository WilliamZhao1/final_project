import pandas as pd
import hashlib
import json
from datetime import datetime
from sqlalchemy import create_engine, inspect, text
import numpy as np

class DatabaseManager:
    def __init__(self, db_config):
        self.conn_str = f"postgresql+psycopg2://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['db_name']}"
        self.engine = create_engine(self.conn_str)
        self._init_manifest_table()

    def _init_manifest_table(self):
        """Creates the log table to track successful jobs."""
        create_sql = text("""
        CREATE TABLE IF NOT EXISTS ingestion_manifest (
            job_signature VARCHAR(64) PRIMARY KEY,
            dataset VARCHAR(50),
            schema VARCHAR(50),
            start_date DATE,
            end_date DATE,
            symbols TEXT[],
            row_count INT,
            ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        with self.engine.connect() as conn:
            conn.execute(create_sql)
            conn.commit()

    def generate_signature(self, dataset, schema, start, end, symbols):
        """
        Creates a unique deterministic hash for a specific job config.
        If any parameter changes (even 1 symbol added), the hash changes.
        """
        # Sort symbols to ensure ["AAPL", "NVDA"] produces same hash as ["NVDA", "AAPL"]
        sorted_symbols = sorted(symbols)
        
        # Create a raw string to hash
        raw_string = f"{dataset}|{schema}|{start}|{end}|{json.dumps(sorted_symbols)}"
        
        # Return SHA256 hash
        return hashlib.sha256(raw_string.encode('utf-8')).hexdigest()

    def is_job_complete(self, signature):
        """Checks if this exact job has been run before."""
        query = text("SELECT 1 FROM ingestion_manifest WHERE job_signature = :sig")
        with self.engine.connect() as conn:
            result = conn.execute(query, {"sig": signature}).fetchone()
            return result is not None

    def log_job_completion(self, signature, dataset, schema, start, end, symbols, row_count):
        """Records the successful job in the manifest."""
        query = text("""
            INSERT INTO ingestion_manifest (job_signature, dataset, schema, start_date, end_date, symbols, row_count)
            VALUES (:sig, :ds, :sch, :sd, :ed, :sym, :rc)
        """)
        with self.engine.connect() as conn:
            conn.execute(query, {
                "sig": signature,
                "ds": dataset,
                "sch": schema,
                "sd": start,
                "ed": end,
                "sym": symbols,
                "rc": row_count
            })
            conn.commit()

    def write_data(self, df: pd.DataFrame, schema_name: str):
        # Existing write logic...
        table_name = f"databento_{schema_name.replace('-', '_')}"
        df = self.sanitize_for_postgres(df)
        inspector = inspect(self.engine)
        if not inspector.has_table(table_name):
            df.head(0).to_sql(table_name, self.engine, if_exists='replace', index=False)
            
        df.to_sql(table_name, self.engine, if_exists='append', index=False, method='multi', chunksize=5000)

    def sanitize_for_postgres(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Iterates through a DataFrame's columns and converts types that 
        Postgres doesn't support (like uint64) into supported types (int64).
        """
        for col in df.columns:
            dtype = df[col].dtype

            if pd.api.types.is_unsigned_integer_dtype(dtype):
                if 'ts_' in col:
                    df[col] = pd.to_datetime(df[col], unit='ns')
                df[col] = df[col].astype('int64')        
                    
        return df