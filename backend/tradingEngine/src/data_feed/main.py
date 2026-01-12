import yaml
import databento as db
import pandas as pd
from db_manager import DatabaseManager
from pathlib import Path

def load_config(path="config.yaml"):
    config_path = Path(__file__).parent / path

    with open(config_path, "r") as f:
        return yaml.safe_load(f)

def run_ingestion():
    config = load_config()
    db_man = DatabaseManager(config['database'])
    client = db.Historical(config['databento']['api_key'])
    
    for job in config['ingestion_jobs']:
        dataset = job['dataset']
        symbols = job['symbols']
        start = job['start_date']
        end = job['end_date']
        
        print(f"--- Processing Job for {len(symbols)} symbols ---")
        
        for schema in job['schemas']:
            # 1. Generate the Idempotency Key (Signature)
            signature = db_man.generate_signature(dataset, schema, start, end, symbols)
            
            # 2. Check Manifest
            if db_man.is_job_complete(signature):
                print(f"[SKIP] Job for {schema} ({start} to {end}) already exists in DB.")
                continue  # Skip to next schema
            
            # 3. If not exists, Fetch Data
            print(f"[FETCH] Downloading {schema}...")
            try:
                data = client.timeseries.get_range(
                    dataset=dataset,
                    symbols=symbols,
                    schema=schema,
                    start=start,
                    end=end
                )
                df = data.to_df()
                
                if df.empty:
                    print(f"No data found for {schema}.")
                    continue

                df.reset_index(inplace=True)
                
                # 4. Write Data
                db_man.write_data(df, schema)
                
                # 5. Log Success to Manifest
                db_man.log_job_completion(signature, dataset, schema, start, end, symbols, len(df))
                print(f"[SUCCESS] Ingested {len(df)} rows.")
                
            except Exception as e:
                print(f"[ERROR] Failed processing {schema}: {e}")
                # Do NOT log completion so it retries next time

if __name__ == "__main__":
    run_ingestion()