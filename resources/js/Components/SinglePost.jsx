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
        <div className="p-3 bg-slate-200 my-5 rounded-md">
            {post && (
                <div className="bg-slate-300 p-2 rounded-md">
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
