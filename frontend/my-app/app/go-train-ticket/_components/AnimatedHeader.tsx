"use client"

import React, { useState } from 'react';
import TransitMarquee from './TransitMarquee';

// Define the shape of our themes so we can select them easily
const THEMES = {
    purple: {
        id: 'purple',
        colors: ['#58157d', '#8b21c9']
    },
    green: {
        id: 'green',
        colors: ['#133708', '#2a7f13']
    }
};

export type ThemeVariant = 'purple' | 'green';

interface AnimatedHeaderProps {
    startStation: string;
    endStation: string;
    theme: ThemeVariant; // New Prop to control color
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ startStation, endStation, theme }) => {
    
    // Select the active theme based on the prop
    const activeTheme = THEMES[theme];
    
    const [duration] = useState(2.25); 

    // LOGIC TO GENERATE CSS KEYFRAMES
    const generateKeyframes = () => {
        let safeColors = [...activeTheme.colors];

        // Ensure seamless loop
        if (safeColors[0] !== safeColors[safeColors.length - 1]) {
            safeColors.push(safeColors[0]);
        }

        const stepSize = 100 / (safeColors.length - 1);

        let keyframeSteps = '';
        safeColors.forEach((color, index) => {
            const percentage = Math.round(index * stepSize);
            keyframeSteps += `${percentage}% { background-color: ${color}; }\n`;
        });

        // Unique name including ID
        return `
      @keyframes headerColorLoop-${activeTheme.id} {
        ${keyframeSteps}
      }
    `;
    };

    const animationName = `headerColorLoop-${activeTheme.id}`;

    return (
        <div className="bg-gray-50 font-sans">
            <style>{generateKeyframes()}</style>

            <header
                className="text-white flex flex-col items-center relative transition-colors duration-500"
                style={{
                    animation: `${animationName} ${duration}s linear infinite`
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
                    className="absolute w-6 h-6 rounded-full border-[3px] border-white z-10"
                    style={{
                        top: '146px',
                        animation: `${animationName} ${duration}s linear infinite`
                    }}></div>

            </header>
        </div>
    );
};

export default AnimatedHeader;