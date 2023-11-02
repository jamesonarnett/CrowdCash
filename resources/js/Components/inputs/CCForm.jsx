import React, { useState, useRef } from "react";
import TextInput from "./TextInput";
import SubmitBtn from "../buttons/SubmitBtn";
import LoadingSpinner from "../LoadingSpinner";
import toast from "react-hot-toast";
import axios from "axios";

const CreditCardForm = ({ selectedButton, user, closeModal }) => {
    const [isCardNumberValid, setIsCardNumberValid] = useState(true);
    const [isCardHolderValid, setIsCardHolderValid] = useState(true);
    const [isExpirationDateValid, setIsExpirationDateValid] = useState(true);
    const [isCvvValid, setIsCvvValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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
        const cvvRegex = /^[0-9]{3,4}$/;
        setIsCvvValid(cvvRegex.test(cvv));
    };

    const clearValidation = () => {
        setIsCardNumberValid(true);
        setIsCardHolderValid(true);
        setIsExpirationDateValid(true);
        setIsCvvValid(true);
    };

    const handleSubmit = async () => {
        clearValidation();
        setIsLoading(true);

        // Validation checks
        handleCardNumberChange();
        handleCardHolderChange();
        handleExpirationDateChange();
        handleCvvChange();

        if (!selectedButton) {
            toast.error("Please select a number of votes");
            return;
        }

        if (
            isCardNumberValid &&
            isCardHolderValid &&
            isExpirationDateValid &&
            isCvvValid
        ) {
            const res = await axios.post("/api/buy-votes", {
                card_number: cardNumberRef.current.value,
                card_holder: cardHolderRef.current.value,
                expiration_date: expirationDateRef.current.value,
                cvv: cvvRef.current.value,
                num_votes: selectedButton,
                user_id: user.id,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    setIsLoading(false);
                    closeModal();
                }, 1000);
            } else {
                setIsLoading(false);
                toast.error(res.data.message);
            }
        }
    };

    return (
        <div
            className={`${
                isLoading
                    ? ""
                    : "max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
            }`}
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
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
                                    !isExpirationDateValid
                                        ? "border-red-500"
                                        : ""
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
                                    Invalid CVV (3 or 4 digits required)
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
                </>
            )}
        </div>
    );
};

export default CreditCardForm;
