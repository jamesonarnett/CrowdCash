import React from "react";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

const SingleComment = ({ comment }) => {
    return (
        <div
            key={comment.id}
            className="flex flex-col md:flex-row mt-2 items-center"
        >
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col">
                    <p className="font-bold">{comment.user_id}</p>
                    <p className="text-sm">{comment.content}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleComment;
