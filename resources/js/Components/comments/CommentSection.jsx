import React from "react";
import { TiBackspace } from "react-icons/ti";
import TextInput from "../inputs/TextInput";
import SubmitBtn from "../buttons/SubmitBtn";
import SingleComment from "./SingleComment";
import ToolTip from "../inputs/ToolTip";

const CommentSection = ({
    toggleComments,
    setToggleComments,
    comments,
    setComments,
    newComment,
    setNewComment,
    addComment,
}) => {
    return (
        <div
            className={`bg-offWhite rounded-lg shadow-lg p-4 transition-opacity duration-300
                ${toggleComments ? "opacity-100" : "opacity-20"}`}
        >
            {toggleComments && (
                <>
                    <ToolTip text="Close">
                        <div
                            className="flex w-full justify-end text-2xl cursor-pointer"
                            onClick={async () => {
                                setToggleComments(!toggleComments);
                                setComments([]);
                            }}
                        >
                            <TiBackspace className="hover:fill-quaternary" />
                        </div>
                    </ToolTip>

                    {comments.length > 0 ? (
                        <div>
                            {comments.map((comment) => (
                                <SingleComment
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No Comments yet.</p>
                    )}

                    <div className="flex flex-col md:flex-row mt-2 items-center">
                        <TextInput
                            label="Comment"
                            name="comment"
                            type="text"
                            placeholder="Enter your comment"
                            className="border-black border-2 rounded-md p-2 w-full"
                            value={newComment.comment}
                            onChange={(e) => {
                                setNewComment({
                                    ...newComment,
                                    [e.target.name]: e.target.value,
                                });
                            }}
                        />
                        <SubmitBtn
                            className="hover:bg-offWhite w-[150px]"
                            text="Add+"
                            onSubmit={addComment}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentSection;
