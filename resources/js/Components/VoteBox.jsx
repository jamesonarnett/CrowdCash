import React from "react";
import { useEffect, useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import ToolTip from "./inputs/ToolTip";

const VoteBox = ({ post }) => {
    const [upvotes, setUpvotes] = useState(0);

    console.log(post);
    return (
        <div className="flex items-center">
            <button className="text-white font-bold flex p-2 rounded">
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
