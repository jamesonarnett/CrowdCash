import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import SinglePost from "@/Components/posts/SinglePost";
import Toast from "@/Components/toast/Toast";
import axios from "axios";
import toast from "react-hot-toast";

const UserPost = ({ auth, post }) => {
    const [isPostOwner, setIsPostOwner] = useState(false);

    const deletePost = (postID) => {
        try {
            axios.delete(`/api/post/${postID}`).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.href = "/posts";
                    }, 500);
                } else {
                    toast.error(response.data.message);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (post?.user_id === auth.user.id) {
            setIsPostOwner(true);
        }
    }, [post]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Toast />

            <div className="py-4">
                <div className="mt-[75px] max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {post ? (
                        <SinglePost
                            key={post.id}
                            post={post}
                            user={auth.user}
                            isPostOwner={isPostOwner}
                            deletePost={deletePost}
                        />
                    ) : (
                        <div className="flex flex-col items-center md:flex-row w-100 justify-center my-10">
                            <p className="font-semibold text-lg my-4 mx-2 md:mx-0">
                                This post was not found!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserPost;
