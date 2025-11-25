"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight, TrainFront } from 'lucide-react';
import AnimatedHeader from './_components/AnimatedHeader';

export default function App() {
    const [currentDate, setCurrentDate] = useState(new Date());
    // Set activation time to roughly 46 minutes ago to match the video feel
    const [activationTime] = useState(() => {
        const d = new Date();
        d.setMinutes(d.getMinutes() - 46);
        d.setSeconds(d.getSeconds() - 50);
        return d;
    });
    const [elapsedTime, setElapsedTime] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentDate(now);

            // Calculate elapsed time
            const diff = now - activationTime;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const formattedElapsed = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            setElapsedTime(formattedElapsed);
        }, 1000);

        return () => clearInterval(timer);
    }, [activationTime]);

    const formatDate = (date) => {
        // Match format: Nov 24, 2025 10:33:19 PM
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    };

    return (
        <div className="flex flex-col h-screen w-full items-center justify-start">
            {/* Main Container - constrained width for mobile view if on desktop */}
            <div className="w-full max-w-md h-full flex flex-col bg-white relative">

                {/* Header */}
                {/* <header className="bg-[#5e008b] text-white pt-6 pb-12 flex flex-col items-center relative">
                    <div className="mb-2">
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75 50 H90 A40 40 0 1 1 50 10 V30 A20 20 0 1 0 70 50 H60 V50" fill="white" stroke="white" strokeWidth="8" />
                            <rect x="58" y="42" width="20" height="16" fill="white" />
                            <path d="M28 50 V50" stroke="white" strokeWidth="8" />
                        </svg>
                    </div>

                    <h1 className="text-xl font-bold tracking-wide mb-2">GO TRANSIT</h1>

                    <div className="absolute top-1/2 left-4 w-1 h-1 bg-white rounded-full opacity-50"></div>
                    <div className="absolute top-1/2 right-4 w-1 h-1 bg-white rounded-full opacity-50"></div>

                    <p className="text-md font-medium">Union Station GO to Oakville GO</p>

                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#9c4dcc] rounded-full border-4 border-white z-20"></div>
                </header> */}

                <AnimatedHeader />

                {/* Ticket Body */}
                <main className="flex-1 flex flex-col items-center pt-8 px-4 relative">

                    {/* Info Section */}
                    <div className="flex w-full justify-between items-start mb-6 px-4">

                        {/* Passengers */}
                        <div className="flex flex-col items-center w-1/3">
                            <span className="text-4xl font-bold text-gray-800">x1</span>
                            <span className="text-sm font-bold text-gray-700">Passenger(s)</span>
                            <span className="text-xs text-gray-500 mt-1">1x Adult</span>
                        </div>

                        {/* Middle Divider & Icon */}
                        <div className="relative h-16 w-px bg-gray-300 mx-2 flex items-center justify-center">
                            <div className="absolute bg-white p-1">
                                <TrainFront className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>

                        {/* Direction */}
                        <div className="flex flex-col items-center w-1/3">
                            <div className="mb-1">
                                <ArrowRight className="w-10 h-10 text-gray-500 stroke-1" />
                            </div>
                            <span className="text-sm font-bold text-gray-700">One-Way</span>
                        </div>
                    </div>

                    <div className="w-full border-t border-gray-200 my-2"></div>

                    {/* Ticket Number */}
                    <div className="text-center my-4">
                        <p className="text-lg text-gray-800">Ticket Number: <span className="font-semibold">MZ65511098</span></p>
                    </div>

                    {/* Barcode Section */}
                    <div className="w-full relative h-32 flex items-center justify-center mb-6 overflow-hidden">
                        {/* Animated Barcode Background Simulation */}
                        <div className="absolute inset-0 flex justify-center items-center opacity-30 space-x-0.5">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-black h-full animate-pulse"
                                    style={{
                                        width: `${Math.random() * 4 + 1}px`,
                                        animationDuration: `${Math.random() * 1 + 0.5}s`
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* Static Sharp Barcode Foreground (The clear lines) */}
                        <div className="absolute inset-0 flex justify-center items-center space-x-1">
                            {Array.from({ length: 45 }).map((_, i) => (
                                <div
                                    key={`static-${i}`}
                                    className="bg-gray-400 h-24"
                                    style={{
                                        width: `${Math.random() > 0.5 ? 2 : 4}px`,
                                        opacity: 0.5
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* ACTIVE Badge */}
                        <div className="relative z-10 bg-white border-2 border-purple-200 px-6 py-1 rounded shadow-sm">
                            <span className="text-[#a855f7] font-bold text-xl tracking-widest">ACTIVE</span>
                        </div>

                        {/* Scan Line Animation */}
                        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-purple-100/20 to-transparent animate-scan"></div>
                    </div>

                    {/* Timers */}
                    <div className="flex w-full justify-between px-2 text-center text-xs font-bold tracking-tight text-gray-800">
                        <div className="flex flex-col items-center w-1/2">
                            <span className="uppercase mb-1 text-[10px] text-gray-900 font-extrabold">Current Date & Time:</span>
                            <span className="text-base font-medium">{formatDate(currentDate)}</span>
                        </div>
                        <div className="flex flex-col items-center w-1/2">
                            <span className="uppercase mb-1 text-[10px] text-gray-900 font-extrabold">Time Since Activation:</span>
                            <span className="text-base font-medium">{elapsedTime}</span>
                        </div>
                    </div>

                </main>

                {/* Footer */}
                <footer className="bg-[#5e008b] text-white p-6 text-center text-lg leading-snug">
                    Please show proof of your ticket to the Customer Protective Officers when asked
                </footer>

            </div>

            <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
        </div>
    );
}