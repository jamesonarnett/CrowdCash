import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SinglePost from "@/Components/SinglePost";
import PostButton from "@/Components/PostButton";
import ErrorText from "@/Components/error/ErrorText";
import Toast from "@/Components/toast/Toast";
import toast from "react-hot-toast";
import LoadingSpinner from "@/Components/LoadingSpinner";

export default function Dashboard({ auth }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getPosts = () => {
        setIsLoading(true);

        try {
            axios.get("/api/post").then((response) => {
                setPosts(response.data.posts);
            });

            setIsLoading(false);
        } catch (error) {
            setError(true);
            setErrMessage(error.message);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {error ? (
                <ErrorText errMessage={errMessage} />
            ) : (
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
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    Hi {auth.user.name}, you're logged in! (Top
                                    posts since you left?)
                                </div>
                            </div>

                            {isLoading && (
                                <LoadingSpinner text="Loading posts!" />
                            )}
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <SinglePost
                                        key={post.id}
                                        post={post}
                                        user={auth.user}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col md:flex-row w-100 justify-center my-10">
                                    <p className="font-semibold my-4 mx-2 md:mx-0">
                                        No posts available create your first
                                        post now!
                                    </p>
                                    <PostButton text="Create Post" />
                                </div>
                            )}
                        </div>
                    </div>
                </AuthenticatedLayout>
            )}
        </>
    );
}
