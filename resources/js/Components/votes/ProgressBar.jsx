import React from "react";

const ProgressBar = ({ progress }) => {
    return (
        <div className="relative mb-3">
            <div className="flex mb-2 items-center justify-between">
                <div
                    className={` text-right
                    ${progress >= 100 ? "text-green-500 -mt-4" : "text-primary"}
                `}
                >
                    <span className="text-xs font-semibold inline-block">
                        {Math.round(progress).toFixed(0) > 100
                            ? ""
                            : `${Math.round(progress).toFixed(0)}% to goal`}
                    </span>
                </div>
            </div>
            <div className="flex rounded-full h-2 bg-gray-300 min-w-[200px]">
                <div
                    style={{ width: `${progress}%` }}
                    className={`rounded-full ${
                        progress >= 100 ? "bg-green-500" : "bg-primary"
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
