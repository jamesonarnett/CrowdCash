import React from "react";
import { useEffect, useState } from "react";

const SinglePost = ({ post }) => {
    const [user, setUser] = useState("");

    const getUser = async () => {
        try {
            axios.get("/api/user/" + post.user_id).then((response) => {
                setUser(response.data.user);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div
            className="border-black border-2 p-3 bg-white my-5 rounded-md 
         shadow-lg m-sm-1 mx-2 md:mx-0"
        >
            {post && (
                <div className="p-2 rounded-md">
                    {post.title}
                    <br />
                    {post.content}
                    <br />
                    {user?.name}
                </div>
            )}
        </div>
    );
};

export default SinglePost;
