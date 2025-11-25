import React from 'react';

const TransitMarquee = () => {
    // 10 items is usually safe, but on huge screens, you might need more.
    const items = [...Array(10)];

    return (
        <div className="w-full py-3 text-white overflow-hidden relative flex">

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee-smooth {
                    animation: marquee 25s linear infinite;
                    will-change: transform;
                    transform: translateZ(0); /* Hardware acceleration */
                }
            `}</style>

            {/* --- TRACK 1 --- 
                1. Removed w-1/2 (Let content define the width)
                2. Added min-w-full (Ensures it fills screen)
                3. Added shrink-0 (Prevents squishing)
                4. Removed mr-16 (Margins on the track break the math)
            */}
            <div className="flex min-w-full shrink-0 animate-marquee-smooth items-center">
                {items.map((_, i) => (
                    <MarqueeItem key={`a-${i}`} />
                ))}
            </div>

            {/* --- TRACK 2 (THE MISSING PIECE) --- 
                This is identical to Track 1. It sits directly to the right.
                When Track 1 moves -100% (completely off screen), 
                Track 2 is exactly where Track 1 started.
            */}
            <div className="flex min-w-full shrink-0 animate-marquee-smooth items-center">
                {items.map((_, i) => (
                    <MarqueeItem key={`b-${i}`} />
                ))}
            </div>

        </div>
    );
};

// 3. THE REUSABLE ITEM
const MarqueeItem = () => (
    // Added mr-16 here. 
    // This creates the gap between THIS item and the NEXT item.
    <div className="flex items-center shrink-0 mr-16">
        <span className="font-sans font-extrabold text-xl tracking-wider antialiased select-none">
            GO TRANSIT
        </span>

        {/* The Dot */}
        {/* Changed mx-16 to ml-16 so we have: Text -> Space -> Dot -> Space(from parent mr-16) */}
        <div className="h-1.5 w-1.5 bg-white rounded-full shrink-0 ml-16" />
    </div>
);

export default TransitMarquee;