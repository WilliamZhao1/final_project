"use client"

import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import Marquee from "react-fast-marquee";
import TransitMarquee from './TransitMarquee';

interface AnimatedHeaderProps {
    startStation: string;
    endStation: string;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ startStation, endStation }) => {
    // 1. CONFIGURATION
    // Define your color range here. The header will fade smoothly from one to the next.
    // For a perfect loop, the code automatically handles connecting the end back to the start.
    const [colors, setColors] = useState([
        '#58157d',
        '#8b21c9',
    ]);

    const [duration, setDuration] = useState(2.5); // Seconds for one full cycle

    // 2. LOGIC TO GENERATE CSS KEYFRAMES
    const generateKeyframes = () => {
        // Ensure the animation loops smoothly by making sure the last color matches the first
        // If the user didn't manually add the start color to the end, we conceptually add it for the math
        let safeColors = [...colors];
        if (safeColors[0] !== safeColors[safeColors.length - 1]) {
            safeColors.push(safeColors[0]);
        }

        const stepSize = 100 / (safeColors.length - 1);

        // Build the CSS string
        let keyframeSteps = '';
        safeColors.forEach((color, index) => {
            const percentage = Math.round(index * stepSize);
            keyframeSteps += `${percentage}% { background-color: ${color}; }\n`;
        });

        return `
      @keyframes headerColorLoop {
        ${keyframeSteps}
      }
    `;
    };

    return (
        <div className="bg-gray-50 font-sans">
            <style>{generateKeyframes()}</style>

            {/* 3. YOUR HEADER COMPONENT */}
            <header
                className="text-white flex flex-col items-center relative"
                style={{
                    // We apply the animation here. 
                    // 'linear' ensures constant speed, 'infinite' makes it loop forever.
                    animation: `headerColorLoop ${duration}s linear infinite`
                }}
            >
                <div className="mt-5 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="auto" viewBox="-23 -11 46 22">
                        <title>GO Transit logo</title>
                        <defs>
                            <clipPath id="c">
                                <path d="m-23-11h46v22h-46zM23 1v-2h-34v-10h-2v22h2V1z" />
                            </clipPath>
                        </defs>
                        <path clipPath="url(#c)" fill="#ffffff" d="m-1 0a11 11 0 1 0-11 11h11zm2 0a1 1 0 0 0 22 0A1 1 0 0 0 1 0z" />
                    </svg>

                </div>

                <TransitMarquee />

                <div className="pb-6">
                    <p className='text-[15px] font-medium' >{startStation} to {endStation}</p>
                </div>

                <div
                    // Tailwind classes for shape (circle), border (white outline), and size
                    className="absolute w-6 h-6 rounded-full border-[3px] border-white z-10"
                    style={{
                        // 1. Custom Position (Change these values to move it)
                        top: '146px',
                        // left: '50px',

                        // 2. The Shared Animation
                        // We reuse the exact same animation name defined in generateKeyframes
                        animation: `headerColorLoop ${duration}s linear infinite`
                    }}></div>

            </header>
        </div>
    );
};

export default AnimatedHeader;