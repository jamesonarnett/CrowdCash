import React from "react";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const SinglePost = ({ post, user, deletePost, isPostOwner = false }) => {
    const [isEditable, setIsEditable] = useState(false);

    const editPost = (postID) => {
        //
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

    return (
        <Link href={route("post.slug", { slug: post.slug })}>
            <div
                className="border-black border-2 p-3 bg-white my-5 rounded-md 
            shadow-lg m-sm-1 mx-2 md:mx-0"
            >
                {post && (
                    <div className="p-2 rounded-md bg-teal-300">
                        {user?.name}
                        <br />
                        {post.title}
                        <br />
                        {post.content}
                    </div>
                )}

                {isEditable && (
                    <div className="flex justify-end mt-1">
                        <button
                            className="hover:bg-primary text-white font-bold py-2 px-4 rounded"
                            onClick={() => editPost(post.id)}
                        >
                            <AiFillEdit fill="#000000" />
                        </button>

                        <button
                            className="hover:bg-quaternary text-white font-bold py-2 px-4 rounded"
                            onClick={() => deletePost(post.id)}
                        >
                            <BsFillTrash3Fill fill="#000000" />
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default SinglePost;
