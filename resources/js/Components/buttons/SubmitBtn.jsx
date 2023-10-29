import React from "react";

const SubmitBtn = ({ text, onSubmit, type = "submit", className }) => {
    return (
        <button
            className={`bg-white text-black px-6 py-3 m-2 rounded-full border-2 border-black
                inline-block shadow-md hover:bg-primary transition duration-300 
                ease-in-out hover:shadow-lg focus:outline-none focus:bg-primary
                text-lgf font-semibold ${className}`}
            onClick={onSubmit}
            type={type}
        >
            {text}
        </button>
    );
};

export default SubmitBtn;
