import React from "react";
import { useEffect, useState } from "react";

const SinglePost = ({ post, user }) => {
    console.log(user);

    return (
        <div
            className="border-black border-2 p-3 bg-white my-5 rounded-md 
         shadow-lg m-sm-1 mx-2 md:mx-0"
        >
            {post && (
                <div className="p-2 rounded-md">
                    {user?.name}
                    <br />
                    {post.title}
                    <br />
                    {post.content}
                </div>
            )}
        </div>
    );
};

export default SinglePost;
