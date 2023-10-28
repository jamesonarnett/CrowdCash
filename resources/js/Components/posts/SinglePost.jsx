import React from "react";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import VoteBox from "../VoteBox";
import ToolTip from "../inputs/ToolTip";
import CommentSection from "../comments/CommentSection";
import axios from "axios";
import toast from "react-hot-toast";

const SinglePost = ({ post, user, deletePost, isPostOwner = false }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [toggleComments, setToggleComments] = useState(false);
    const [newComment, setNewComment] = useState({
        comment: "",
        post_id: post?.id,
        user_id: user?.id,
    });
    const [comments, setComments] = useState([]);

    const addComment = async () => {
        try {
            const response = await axios.post(`/api/comment`, newComment);

            if (response.data.success) {
                toast.success(response.data.message);

                // setToggleComments(false);
                setNewComment({
                    ...newComment,
                    comment: "",
                });

                await getComments();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getComments = async () => {
        try {
            const response = await axios.get(`/api/comment`, {
                params: {
                    post_id: post?.id,
                },
            });

            if (response.data.success) {
                setComments(response.data?.comments);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (
            (window.location.pathname === "/posts" &&
                user.id === post.user_id) ||
            isPostOwner
        ) {
            setIsEditable(true);
        }
    }, [user.id, post.user_id, isPostOwner]);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    return (
        <div
            className="border-black border-2 p-3 bg-white my-5 rounded-md 
            shadow-lg m-sm-1 mx-2 md:mx-0"
        >
            <Link href={route("post.slug", { slug: post.slug })}>
                {post && (
                    <div className="p-2 rounded-md bg-teal-300">
                        {user?.name}
                        <br />
                        {post.title}
                        <br />
                        {post.content}
                    </div>
                )}
            </Link>

            <div className="flex w-full mt-1">
                <div className="w-full">
                    <VoteBox post={post} />
                </div>

                <div className="flex justify-end">
                    {!toggleComments && (
                        <ToolTip text="Add Comment">
                            <button
                                className="text-white font-bold py-2 px-2 rounded text-xl"
                                onClick={async () => {
                                    await getComments();
                                    setToggleComments(!toggleComments);
                                }}
                            >
                                <FaCommentDots
                                    fill="#000000"
                                    className="hover:fill-primary"
                                />
                            </button>
                        </ToolTip>
                    )}

                    {isEditable && (
                        <>
                            <ToolTip text="Edit Post">
                                <Link
                                    href={route("post.edit", { id: post.id })}
                                >
                                    <button className="text-white font-bold py-2 px-2 rounded text-xl">
                                        <AiFillEdit
                                            fill="#000000"
                                            className="hover:fill-primary"
                                        />
                                    </button>
                                </Link>
                            </ToolTip>

                            <ToolTip text="Delete Post">
                                <button
                                    className="text-white font-bold py-2 px-2 rounded text-xl"
                                    onClick={() => deletePost(post.id)}
                                >
                                    <BsFillTrash3Fill
                                        fill="#000000"
                                        className="hover:fill-primary"
                                    />
                                </button>
                            </ToolTip>
                        </>
                    )}
                </div>
            </div>

            {toggleComments && (
                <CommentSection
                    toggleComments={toggleComments}
                    setToggleComments={setToggleComments}
                    comments={comments}
                    setComments={setComments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    addComment={addComment}
                />
            )}
        </div>
    );
};

export default SinglePost;
