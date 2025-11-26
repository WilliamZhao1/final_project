"use client"

import React, { useState, useEffect } from 'react';
import { BsArrowRight } from "react-icons/bs";
import AnimatedHeader from './_components/AnimatedHeader';
import AnimatedFooter from './_components/AnimatedFooter';
import { LiaBarcodeSolid } from "react-icons/lia";

export default function App() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activationTime] = useState(() => {
        const d = new Date();
        d.setMinutes(d.getMinutes());
        d.setSeconds(d.getSeconds());
        return d;
    });
    const [elapsedTime, setElapsedTime] = useState("00:00:00");
    const [remainingTime, setRemainingTime] = useState("04:00:00");

    const activeColor = '#8b21c9';

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentDate(now);

            // Calculate elapsed time in milliseconds
            let diff = now - activationTime;

            // 1. CHECK FOR 2-HOUR RESET
            const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
            const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

            if (diff >= TWO_HOURS_MS) {
                // Reset activation time to right now
                setActivationTime(new Date());
                diff = 0;
            }

            // 2. CALCULATE ELAPSED (Counting Up)
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const formattedElapsed = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            setElapsedTime(formattedElapsed);

            // 3. CALCULATE REMAINING (Counting Down from 4 hours)
            const remainingDiff = FOUR_HOURS_MS - diff;
            const rDiff = remainingDiff > 0 ? remainingDiff : 0;

            const rHours = Math.floor(rDiff / (1000 * 60 * 60));
            const rMinutes = Math.floor((rDiff % (1000 * 60 * 60)) / (1000 * 60));
            const rSeconds = Math.floor((rDiff % (1000 * 60)) / 1000);

            const formattedRemaining = `${rHours.toString().padStart(2, '0')}:${rMinutes
                .toString()
                .padStart(2, '0')}:${rSeconds.toString().padStart(2, '0')}`;

            setRemainingTime(formattedRemaining);
        }, 1000);

        return () => clearInterval(timer);
    }, [activationTime]);

    const formatDate = (date) => {
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
            <div className="w-full max-w-md h-full flex flex-col bg-white relative">

                <AnimatedHeader />

                {/* Ticket Body */}
                <main className="flex-1 flex flex-col items-center px-4 relative pt-3">

                    {/* Info Section */}
                    <div className="flex w-full justify-between items-start mb-5 px-6">

                        {/* Passengers */}
                        <div className="flex flex-col items-center w-1/3">
                            <span className="text-[46px] font-normal text-gray-700 -mb-3">x1</span>
                            <span className="text-[19px] font-bold text-gray-700 ">Passenger(s)</span>
                            <span className="text-s text-gray-600 mt-1">1x Adult</span>
                        </div>

                        {/* Middle Divider & Icon */}
                        <div className='pt-2'>
                            <div className="relative h-25 w-px bg-gray-300 mx-2 flex items-center justify-center">
                                <div className="absolute">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className={"w-9 h-9 text-[#a7acb5] fill-current"}
                                    >
                                        <path d="M12 2c-4.42 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm5.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6h-5V6h5v5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Direction */}
                        <div className="flex flex-col items-center w-1/3 mt-5">
                            <div>
                                <BsArrowRight size={44} className="text-gray-700" />
                            </div>
                            <span className="text-[19px] font-bold text-gray-700 mt-1">One-Way</span>
                        </div>
                    </div>

                    <div
                        className="w-screen h-[2px] "
                        style={{
                            // This creates the square pattern
                            backgroundImage: "linear-gradient(to right, #b8c1cfff 2px, transparent 2px)",
                            // The first number (8px) controls the spacing. 
                            // Since the height is 4px (h-1), using 8px width (50% color) makes it a 4x4 square.
                            backgroundSize: "6px 100%",
                            backgroundRepeat: "repeat-x"
                        }}
                    ></div>

                    {/* Ticket Number */}
                    <div className="text-center my-2">
                        <p className="text-lg text-gray-800 font-medium">Ticket Number: <span className="text-gray-700 font-bold">MZ65511098</span></p>
                    </div>

                    {/* Barcode Section */}
                    <div className="w-full relative h-12 flex items-center justify-center mb-5 -mt-1 overflow-hidden">

                        <style>{`
                            @keyframes flashActive {
                                0%, 100% { color: #ffffff; } /* Start/End at White (Invisible) */
                                50% { color: ${activeColor}; } /* Middle at your defined Color */
                            }
                        `}</style>

                        {/* Animated Barcode Background Simulation */}
                        <div className="flex items-center text-gray-700">
                            {/* This creates an array of 5 items and maps over them */}
                            {[...Array(6)].map((_, index) => (
                                <LiaBarcodeSolid
                                    key={index}
                                    className="h-30 w-14 -ml-[5px] first:ml-0 text-[#b2b6ba]"
                                    preserveAspectRatio="none"
                                />
                            ))}
                        </div>
                        <div className="absolute z-10 bg-white px-[11px] py-[2px]">
                            <span className="text-green-600 font-normal text-[22px]"
                                style={{
                                    // 3. APPLY ANIMATION
                                    // '2s' is the speed. Change to '1s' for faster flashing.
                                    animation: 'flashActive 2s ease-in-out infinite'
                                }}>
                                ACTIVE
                            </span>
                        </div>
                    </div>

                    {/* Timers */}
                    <div className="flex w-full justify-between text-center text-xs font-bold tracking-tight text-gray-600 -mt-1 pb-2">
                        <div className="flex flex-col items-center w-3/5">
                            <span className="uppercase text-[11px] text-gray-900 font-black">Current Date & Time:</span>
                            <span className="text-base font-bold -ml-6">{formatDate(currentDate)}</span>
                        </div>
                        <div className="flex flex-col items-center w-2/5 ml-3">
                            <span className="uppercase text-[11px] text-gray-900 font-black">Time Since Activation:</span>
                            <span className="text-base font-bold">{elapsedTime}</span>
                        </div>
                    </div>

                    <AnimatedFooter remainingTime={remainingTime}/>
                </main>


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