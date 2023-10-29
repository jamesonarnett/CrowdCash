import React, { useState, useRef } from "react";
import TextInput from "./TextInput";
import SubmitBtn from "../buttons/SubmitBtn";

const CreditCardForm = () => {
    const cardNumberRef = useRef(null);
    const cardHolderRef = useRef(null);
    const expirationDateRef = useRef(null);
    const cvvRef = useRef(null);

    const handleSubmit = () => {
        // Handle form submission here
        // You can access input values using cardNumberRef.current.value
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Enter Credit Card Details
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="cardNumber"
                    className="block text-gray-600 font-medium mb-2"
                >
                    Card Number
                </label>
                <TextInput
                    type="text"
                    id="cardNumber"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    ref={cardNumberRef}
                    autofocus
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="cardHolder"
                    className="block text-gray-600 font-medium mb-2"
                >
                    Card Holder
                </label>
                <TextInput
                    type="text"
                    id="cardHolder"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    ref={cardHolderRef}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label
                        htmlFor="expirationDate"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        Expiration Date
                    </label>
                    <TextInput
                        type="text"
                        id="expirationDate"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        ref={expirationDateRef}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="cvv"
                        className="block text-gray-600 font-medium mb-2"
                    >
                        CVV
                    </label>
                    <TextInput
                        type="text"
                        id="cvv"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        ref={cvvRef}
                    />
                </div>
            </div>

            <div className="w-full text-center">
                <SubmitBtn
                    text="Submit"
                    className="w-2/3 mt-4"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default CreditCardForm;
