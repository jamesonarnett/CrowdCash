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
        console.log("post", post);
        if (
            (window.location.pathname === "/posts" &&
                user.id === post.user_id) ||
            isPostOwner
        ) {
            setIsEditable(true);
        }
    }, [user.id, post.user_id, isPostOwner]);

    return (
        <div
            className="p-3 bg-white my-5 rounded-md 
            shadow-lg m-sm-1 mx-2 md:mx-0"
        >
            {post && (
                <div className="p-2 bg-offWhite rounded-md">
                    <div className="pr-3 flex">
                        <img
                            src={post.user.file_path ?? "/images/default.png"}
                            alt="user"
                            className="w-16 h-16 rounded-full"
                        />

                        <p className="mx-3 -mt-[1px] font-semibold text-lg">
                            {post.user?.name}
                        </p>
                    </div>
                    <br />

                    <Link href={route("post.slug", { slug: post.slug })}>
                        <p className="text-xl font-semibold mb-3">
                            {post.title}
                        </p>
                        <div className="mx-auto max-w-[500px] max-h-[500px] overflow-hidden">
                            {post.file_type === "image" && (
                                <img
                                    src={post.file_path}
                                    alt="post"
                                    className="w-full h-full object-contain"
                                />
                            )}

                            {post.fileType === "video" && (
                                <video
                                    src={post.file_path}
                                    alt="post"
                                    className="w-full h-full object-contain"
                                    controls
                                />
                            )}
                        </div>

                        <p className="mt-3 border-t-2 border-gray-200 text-lg">
                            {post.content}
                        </p>
                    </Link>
                </div>
            )}

            <div className="flex w-full mt-1">
                <div className="w-full">
                    <VoteBox post={post} user={user} />
                </div>

                <div className="flex justify-end items-center">
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
                                        className="hover:fill-quaternary"
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
                    user={user}
                    getComments={getComments}
                />
            )}
        </div>
    );
};

export default SinglePost;
