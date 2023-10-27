import React from "react";

const SubmitBtn = ({ text, onSubmit, type = "submit" }) => {
    return (
        <button
            className="bg-primary text-black px-6 py-3 m-2 rounded-full 
                inline-block shadow-md hover:bg-myWhite hover:text-black transition duration-300 
                ease-in-out hover:shadow-lg"
            onClick={onSubmit}
            type={type}
        >
            {text}
        </button>
    );
};

export default SubmitBtn;
