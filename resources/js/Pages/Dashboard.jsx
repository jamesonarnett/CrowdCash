import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SinglePost from "@/Components/posts/SinglePost";
import GoToPostBtn from "@/Components/buttons/GoToPostBtn";
import ErrorText from "@/Components/error/ErrorText";
import Toast from "@/Components/toast/Toast";
import LoadingSpinner from "@/Components/LoadingSpinner";

export default function Dashboard({ auth }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getPosts = async () => {
        setIsLoading(true);

        try {
            await axios.get("/api/post").then((response) => {
                setPosts(response.data.posts);
            });

            setIsLoading(false);
        } catch (error) {
            setError(true);
            setErrMessage(error.message);
        }
    };

    useEffect(() => {
        (async () => {
            await getPosts();
        })();
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
                        <div className="mt-[75px] max-w-7xl mx-auto sm:px-6 lg:px-8">
                            {isLoading && (
                                <LoadingSpinner text="Loading posts!" />
                            )}
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <SinglePost
                                        key={post.id}
                                        post={post}
                                        user={auth.user}
                                        getPosts={getPosts}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center md:flex-row w-100 justify-center my-10">
                                    <p className="font-semibold text-lg my-4 mx-2 md:mx-0">
                                        No posts available. Create your first
                                        post now?
                                    </p>
                                    <div className="px-3">
                                        <GoToPostBtn text="Create Post" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </AuthenticatedLayout>
            )}
        </>
    );
}
