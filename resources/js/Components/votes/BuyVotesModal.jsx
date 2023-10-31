import React, { useState, useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import Modal from "../Modal";
import ToolTip from "../inputs/ToolTip";
import CreditCardForm from "../inputs/CCForm";

const BuyVotesModal = ({ show, setShowBuyVotesModal, user }) => {
    const [selectedButton, setSelectedButton] = useState(null);
    const priceOptions = [1, 5, 10, 25];
    const modalRef = useRef();

    const closeModal = () => {
        setShowBuyVotesModal(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                show
            ) {
                setShowBuyVotesModal(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [show]);

    return (
        <Modal show={show} maxWidth="2xl" closeable={false}>
            <div
                ref={modalRef}
                className="flex flex-col w-full min-h-[200px] px-3 py-7 mb-5"
            >
                <div
                    className="cursor-pointer flex w-full justify-end"
                    onClick={closeModal}
                >
                    <ToolTip text="Close" className="!-ml-12">
                        <MdCancel className="text-3xl text-black hover:fill-quaternary" />
                    </ToolTip>
                </div>

                <div className="flex flex-col items-center justify-center w-full">
                    <h3 className="text-3xl font-semibold">
                        No votes? No problem!
                    </h3>
                    <p className="text-[18px]">Select an option below</p>
                </div>

                <small className="text-center text-red-500">
                    This app is still being tested and is not actually accepting
                    payments.
                    <br />
                    Please enter any "valid" credit card information to proceed.
                </small>
                <div className="flex justify-between mt-4">
                    {priceOptions.map((numVotes) => (
                        <BuyVoteBtn
                            key={numVotes}
                            numVotes={numVotes}
                            isSelected={selectedButton === numVotes}
                            setIsSelected={() => setSelectedButton(numVotes)}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <CreditCardForm
                        selectedButton={selectedButton}
                        user={user}
                    />
                </div>
            </div>
        </Modal>
    );
};

const BuyVoteBtn = ({ numVotes, isSelected, setIsSelected }) => {
    const vote = numVotes === 1 ? "vote" : "votes";

    return (
        <p
            className={`w-[150px] mx-2 bg-offWhite hover:bg-primary h-[100px] cursor-pointer rounded-lg p-3
            shadow-md flex items-center justify-center text-center text-lg hover:shadow-xl
            ${
                isSelected
                    ? "bg-secondary hover:bg-secondary text-black hover:bg-primary-light"
                    : "bg-offWhite hover:bg-primary"
            }
            `}
            onClick={setIsSelected}
        >
            Buy {numVotes} {vote} <br /> for ${numVotes}
        </p>
    );
};

export default BuyVotesModal;
