import React from "react";
import { TiBackspace } from "react-icons/ti";
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
    getComments,
    user,
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
                        <>
                            {comments.map((comment) => (
                                <SingleComment
                                    key={comment.id}
                                    comment={comment}
                                    user={user}
                                    getComments={getComments}
                                />
                            ))}
                        </>
                    ) : (
                        <p className="w-full text-center">
                            Be the first to comment here?
                        </p>
                    )}

                    <div className="flex flex-col md:flex-row mt-2 items-center">
                        <textarea
                            name="comment"
                            className="border-black border-2 rounded-md p-2 w-full mt-2 md:mt-0 
                                focus:outline-none focus:ring-2 focus:ring-primary"
                            rows="1"
                            placeholder="Post a comment..."
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
