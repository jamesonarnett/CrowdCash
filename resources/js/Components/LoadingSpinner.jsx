import React from "react";
import Heart from "../../../public/images/heart.png";

const LoadingSpinner = ({ width, height, color, text = "Loading..." }) => {
    const heartStyle = {
        width: width || "96px",
        height: height || "96px",
        fill: color || "red",
    };

    return (
        <div className="flex flex-col justify-center items-center m-10">
            <div className="custom-pulse">
                <img
                    src={Heart}
                    alt="Heart"
                    style={heartStyle}
                    className="transform origin-center"
                />
                <p className="text-center mt-4">{text}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
