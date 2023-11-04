import React from "react";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import ToolTip from "../inputs/ToolTip";
import axios from "axios";
import toast from "react-hot-toast";

const SingleComment = ({ comment, user, getComments }) => {
    const [canDelete, setCanDelete] = useState(false);

    const deleteComment = async (id) => {
        try {
            const response = await axios.delete(`/api/comment/${id}`);

            if (response.data.success) {
                toast.success(response.data.message);

                await getComments();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (comment.user_id === user.id) {
            setCanDelete(true);
        }
    }, []);

    return (
        <div
            key={comment.id}
            className="flex flex-col md:flex-row mt-2 items-center"
        >
            <div className="flex w-full items-start">
                <div className="pr-3">
                    <img
                        src={comment.user?.file_path}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <p className="font-bold text-[17px]">
                        {comment.user?.name}
                    </p>
                    <p className="text-sm">{comment.content}</p>
                </div>
                <div
                    className="flex justify-end cursor-pointer px-1 pt-3"
                    onClick={() => deleteComment(comment.id)}
                >
                    {canDelete && (
                        <ToolTip text="Delete">
                            <BsFillTrash3Fill className="hover:fill-quaternary" />
                        </ToolTip>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleComment;
