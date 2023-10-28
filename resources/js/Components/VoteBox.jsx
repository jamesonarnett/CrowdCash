import React from "react";
import { useEffect, useState } from "react";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const VoteBox = ({ post }) => {
    const [upvotes, setUpvotes] = useState(0);

    return (
        <div className="flex items-center">
            <button className="hover:bg-primary text-white font-bold py-2 px-4 rounded">
                <BiSolidUpvote fill="#000000" />
            </button>

            <button className="hover:bg-quaternary text-white font-bold py-2 px-4 rounded">
                <BiSolidDownvote fill="#000000" />
            </button>

            <div className="">{upvotes}</div>
        </div>
    );
};

export default VoteBox;
