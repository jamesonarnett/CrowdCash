import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import SinglePost from "@/Components/SinglePost";

export default function Dashboard({ auth }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const getPosts = () => {
        try {
            axios.get("/api/post").then((response) => {
                setPosts(response.data.posts);
            });
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
                <div>
                    <p>Oh no, looks like you've found a bug...</p>
                    <p>{errMessage}</p>
                </div>
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

                    <div className="py-4">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    Hi {auth.user.name}, you're logged in!
                                </div>
                            </div>

                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <SinglePost key={post.id} post={post} />
                                ))
                            ) : (
                                <p>No posts available</p>
                            )}
                        </div>
                    </div>
                </AuthenticatedLayout>
            )}
        </>
    );
}
