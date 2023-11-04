import React from "react";

const ProgressBar = ({ progress }) => {
    return (
        <div className="relative mb-3">
            <div className="flex mb-2 items-center justify-between">
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary">
                        {Math.round(progress).toFixed(0)}% to goal
                    </span>
                </div>
            </div>
            <div className="flex rounded-full h-2 bg-gray-300 min-w-[200px]">
                <div
                    style={{ width: `${progress}%` }}
                    className="rounded-full bg-primary"
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
