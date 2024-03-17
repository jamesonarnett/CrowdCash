import React from "react";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SinglePost from "@/Components/posts/SinglePost";
import GoToPostBtn from "@/Components/buttons/GoToPostBtn";
import axios from "axios";
import toast from "react-hot-toast";

const Posts = ({ auth }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            await axios
                .get(`/api/post/user/${auth.user.id}`)
                .then((response) => {
                    setPosts(response.data.posts);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = (postID) => {
        try {
            axios.delete(`/api/post/${postID}`).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    getPosts();
                } else {
                    toast.error(response.data.message);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-4 w-[80%] m-auto">
                <div>
                    <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                        Your posts
                    </h2>
                </div>

                <div className="mt-[75px]">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <SinglePost
                                key={post.id}
                                post={post}
                                user={auth.user}
                                deletePost={deletePost}
                            />
                        ))
                    ) : (
                        <div className="flex justify-center items-center">
                            <h3 className="text-xl font-semibold m-3">
                                You haven't created any posts yet.
                            </h3>
                            <GoToPostBtn text="Create one now!" />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Posts;
