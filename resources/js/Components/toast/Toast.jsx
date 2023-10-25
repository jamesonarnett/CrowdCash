import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = ({ className }) => {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName={className}
                containerStyle={{
                    top: 80,
                    left: 20,
                    bottom: 20,
                    right: 20,
                }}
                toastOptions={{
                    // Define default options
                    className: "",
                    duration: 3000,
                    style: {
                        background: "#fff",
                        color: "#000",
                    },
                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: "green",
                            secondary: "black",
                        },
                    },
                }}
            />
        </>
    );
};

export default Toast;
