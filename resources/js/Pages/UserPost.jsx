import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import SinglePost from "@/Components/SinglePost";
import ErrorText from "@/Components/error/ErrorText";
import Toast from "@/Components/toast/Toast";
import LoadingSpinner from "@/Components/LoadingSpinner";

const UserPost = ({ auth, post }) => {
    const [isPostOwner, setIsPostOwner] = useState(false);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (post?.user_id === auth.user.id) {
            setIsPostOwner(true);
        }
    }, [post]);

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
                            {isLoading && (
                                <LoadingSpinner text="Loading post!" />
                            )}
                            {post ? (
                                <SinglePost
                                    key={post.id}
                                    post={post}
                                    user={auth.user}
                                    isPostOwner={isPostOwner}
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
            )}
        </>
    );
};

export default UserPost;
