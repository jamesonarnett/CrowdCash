import React from "react";
import { useEffect, useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import ToolTip from "./inputs/ToolTip";
import axios from "axios";
import toast from "react-hot-toast";

const VoteBox = ({ post }) => {
    const [upvotes, setUpvotes] = useState(post?.votes?.length);

    const handleVote = async () => {
        try {
            const response = await axios.post("/api/vote", {
                post_id: post.id,
                user_id: post.user_id,
            });

            if (response.data.success) {
                setUpvotes(response.data.votes);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    useEffect(() => {
        setUpvotes(post?.votes?.length);
    }, [post]);

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

            <div className="">{upvotes}</div>
        </div>
    );
};

export default VoteBox;
