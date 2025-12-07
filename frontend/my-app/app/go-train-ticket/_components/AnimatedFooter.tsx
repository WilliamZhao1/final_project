"use client"

import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import Marquee from "react-fast-marquee";
import TransitMarquee from './TransitMarquee';

// Reuse the same theme definition or import it if you move it to a shared file
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

interface AnimatedFooterProps { 
    remainingTime: string; 
    theme: ThemeVariant; // New Prop
}

const AnimatedFooter = ({ remainingTime, theme }: AnimatedFooterProps) => {
    
    // Select active theme from prop
    const activeTheme = THEMES[theme];
    
    const [duration] = useState(2.25);

    // LOGIC TO GENERATE CSS KEYFRAMES
    const generateKeyframes = () => {
        let safeColors = [...activeTheme.colors];

        if (safeColors[0] !== safeColors[safeColors.length - 1]) {
            safeColors.push(safeColors[0]);
        }

        const stepSize = 100 / (safeColors.length - 1);

        let keyframeSteps = '';
        safeColors.forEach((color, index) => {
            const percentage = Math.round(index * stepSize);
            keyframeSteps += `${percentage}% { background-color: ${color}; }\n`;
        });

        return `
      @keyframes footerColorLoop-${activeTheme.id} {
        ${keyframeSteps}
      }
    `;
    };

    const animationName = `footerColorLoop-${activeTheme.id}`;

    return (
        <div className="bg-gray-50 font-sans">
            <style>{generateKeyframes()}</style>

            <header
                className="w-screen h-60 text-white flex flex-col items-center relative transition-colors duration-500"
                style={{
                    animation: `${animationName} ${duration}s linear infinite`
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

export default AnimatedFooter;