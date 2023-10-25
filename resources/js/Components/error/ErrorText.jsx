import React from "react";

const ErrorText = ({ errMessage }) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center bg-gradient-primary">
            <p className="text-2xl text-center flex flex-col mt-20">
                Oh no, looks like you've found a bug... {errMessage}
                <a href="/dashboard" className="text-primary hover:text-black">
                    Go home?
                </a>
            </p>
        </div>
    );
};

export default ErrorText;
