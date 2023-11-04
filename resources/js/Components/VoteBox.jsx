import React from "react";
import { useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import BuyVotesModal from "./votes/BuyVotesModal";
import ToolTip from "./inputs/ToolTip";
import ProgressBar from "./votes/ProgressBar";
import axios from "axios";
import toast from "react-hot-toast";

const VoteBox = ({ post, user }) => {
    const [votes, setVotes] = useState(post?.votes?.length);
    const [votesNeeded] = useState(10);
    const [showBuyVotesModal, setShowBuyVotesModal] = useState(false);

    const handleVote = async () => {
        try {
            const response = await axios.post("/api/vote", {
                post_id: post.id,
                user_id: user.id,
            });

            if (response.data.success) {
                setVotes(response.data.votes);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
                setShowBuyVotesModal(true);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div className="flex items-center">
            <button
                className="text-white font-bold flex p-2 rounded"
                onClick={handleVote}
            >
                <ToolTip text="Vote!">
                    <BiSolidUpvote
                        fill="#000000"
                        className="hover:fill-primary text-xl"
                    />
                </ToolTip>
            </button>

            <ProgressBar progress={(votes / votesNeeded) * 100} />

            <BuyVotesModal
                show={showBuyVotesModal}
                setShowBuyVotesModal={setShowBuyVotesModal}
                user={user}
            />
        </div>
    );
};

export default VoteBox;
