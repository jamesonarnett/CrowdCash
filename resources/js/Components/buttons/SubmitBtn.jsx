import React from "react";

const SubmitBtn = ({ text, onSubmit, type = "submit", className }) => {
    return (
        <button
            className={`bg-primary text-black px-6 py-3 m-2 rounded-md
                inline-block shadow-md hover:bg-secondary transition duration-300 
                ease-in-out hover:shadow-lg focus:outline-none focus:bg-secondary
                font-semibold focus:shadow-lg text-lg
                ${className}`}
            onClick={onSubmit}
            type={type}
        >
            {text}
        </button>
    );
};

export default SubmitBtn;
