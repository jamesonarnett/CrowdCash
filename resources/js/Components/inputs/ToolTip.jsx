import React, { useState } from "react";

const ToolTip = ({ text, children, className = "" }) => {
    const [showToolTip, setShowToolTip] = useState(false);

    let timeoutId = null;

    const handleMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setShowToolTip(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        setShowToolTip(false);
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            <div
                className={`absolute z-10 px-2 py-1 text-white bg-gray-800 rounded-lg -mt-[55px] ml-4 
                    transition-opacity duration-300 whitespace-nowrap ${
                        showToolTip ? "opacity-100" : "opacity-0"
                    }
                    ${className}
                    `}
            >
                {text}
            </div>
        </div>
    );
};

export default ToolTip;
