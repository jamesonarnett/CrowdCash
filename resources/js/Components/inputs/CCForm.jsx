import React, { useState, useRef } from "react";
import TextInput from "./TextInput";
import SubmitBtn from "../buttons/SubmitBtn";

const CreditCardForm = () => {
    const [isCardNumberValid, setIsCardNumberValid] = useState(true);
    const [isCardHolderValid, setIsCardHolderValid] = useState(true);
    const [isExpirationDateValid, setIsExpirationDateValid] = useState(true);
    const [isCvvValid, setIsCvvValid] = useState(true);

    const cardNumberRef = useRef(null);
    const cardHolderRef = useRef(null);
    const expirationDateRef = useRef(null);
    const cvvRef = useRef(null);

    const handleCardNumberChange = () => {
        const cardNumber = cardNumberRef.current.value;
        const cardNumberRegex = /^[0-9]{16}$/;
        setIsCardNumberValid(cardNumberRegex.test(cardNumber));
    };

    const handleCardHolderChange = () => {
        const cardHolder = cardHolderRef.current.value;
        setIsCardHolderValid(cardHolder.trim() !== "");
    };

    const handleExpirationDateChange = () => {
        const expirationDate = expirationDateRef.current.value;
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
        setIsExpirationDateValid(expirationDateRegex.test(expirationDate));
    };

    const handleCvvChange = () => {
        const cvv = cvvRef.current.value;
        const cvvRegex = /^[0-9]{3}$/;
        setIsCvvValid(cvvRegex.test(cvv));
    };

    const clearValidation = () => {
        setIsCardNumberValid(true);
        setIsCardHolderValid(true);
        setIsExpirationDateValid(true);
        setIsCvvValid(true);
    };

    const handleSubmit = () => {
        clearValidation();

        // Validation checks
        handleCardNumberChange();
        handleCardHolderChange();
        handleExpirationDateChange();
        handleCvvChange();

        // Check if all inputs are valid
        if (
            isCardNumberValid &&
            isCardHolderValid &&
            isExpirationDateValid &&
            isCvvValid
        ) {
            // All inputs are valid; you can proceed with form submission
            console.log("Form submitted");
        } else {
            // Some input(s) are invalid; you can display an error message or prevent submission
            console.log("Form validation failed");
        }
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
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 ${
                        !isCardNumberValid ? "border-red-500" : ""
                    }`}
                    ref={cardNumberRef}
                    onChange={handleCardNumberChange}
                />
                {!isCardNumberValid && (
                    <p className="text-red-500 text-sm mt-2">
                        Invalid card number
                    </p>
                )}
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
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 ${
                        !isCardHolderValid ? "border-red-500" : ""
                    }`}
                    ref={cardHolderRef}
                    onChange={handleCardHolderChange}
                />
                {!isCardHolderValid && (
                    <p className="text-red-500 text-sm mt-2">
                        Card holder's name is required
                    </p>
                )}
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
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 ${
                            !isExpirationDateValid ? "border-red-500" : ""
                        }`}
                        ref={expirationDateRef}
                        onChange={handleExpirationDateChange}
                    />
                    {!isExpirationDateValid && (
                        <p className="text-red-500 text-sm mt-2">
                            Invalid expiration date
                        </p>
                    )}
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
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 ${
                            !isCvvValid ? "border-red-500" : ""
                        }`}
                        ref={cvvRef}
                        onChange={handleCvvChange}
                    />
                    {!isCvvValid && (
                        <p className="text-red-500 text-sm mt-2">
                            Invalid CVV (3 digits required)
                        </p>
                    )}
                </div>
            </div>

            <div className="w-full text-center">
                <SubmitBtn
                    text="Submit"
                    className="w-2/3 mt-4"
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default CreditCardForm;
