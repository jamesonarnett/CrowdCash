import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ProgressBar = ({ progress, confettiDiv }) => {
    const isDashboard = window.location.pathname === "/dashboard";
    const [hasMetGoal, setHasMetGoal] = useState(false);
    const [confettiArea, setConfettiArea] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        progress > 99 && isDashboard && setHasMetGoal(true);
    }, [progress]);

    useEffect(() => {
        setTimeout(() => {
            setHasMetGoal(false);
        }, 8000);
    }, [hasMetGoal]);

    const progressBarWidth = `${progress}%`;

    useEffect(() => {
        setConfettiArea({
            width: confettiDiv?.current?.offsetWidth,
            height: confettiDiv?.current?.offsetHeight,
        });
    }, [confettiDiv]);

    return (
        <div className="relative mb-3">
            <div className="flex mb-2 items-center justify-between">
                <div
                    className={`text-right ${
                        progress > 99 ? "text-green-500 -mt-4" : "text-primary"
                    }`}
                >
                    <span className="text-xs font-semibold inline-block">
                        {progress > 99
                            ? ""
                            : `${Math.round(progress).toFixed(0)}% to goal`}
                    </span>
                </div>
            </div>
            <div className="flex rounded-full h-2 bg-gray-300 min-w-[200px]">
                <div
                    style={{ width: progressBarWidth }}
                    className={`rounded-full ${
                        progress > 99 ? "bg-green-500" : "bg-primary"
                    }`}
                ></div>
            </div>
            {hasMetGoal && (
                <div
                    style={{
                        position: "absolute",
                        top: -confettiArea.height,
                        left: -100,
                    }}
                >
                    <Confetti
                        width={confettiArea.width}
                        height={confettiArea.height}
                    />
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
