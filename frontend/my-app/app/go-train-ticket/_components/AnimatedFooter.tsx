"use client"

import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import Marquee from "react-fast-marquee";
import TransitMarquee from './TransitMarquee';

const AnimatedHeader = ({remainingTime}) => {
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
                className="w-screen h-60 text-white flex flex-col items-center relative"
                style={{
                    // We apply the animation here. 
                    // 'linear' ensures constant speed, 'infinite' makes it loop forever.
                    animation: `headerColorLoop ${duration}s linear infinite`
                }}
            >

                <div className="text-center p-10 pt-18 pb-2">
                    <p className='text-lg font-normal' >Please show proof of your ticket to the Customer Protective Officers when asked</p>
                </div>

                <div className="text-center">
                    <p className="text-4xl font-extralight">
                        {remainingTime}
                    </p>
                </div>

            </header>
        </div>
    );
};

export default AnimatedHeader;