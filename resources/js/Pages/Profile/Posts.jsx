import React from "react";
import { Head } from "@inertiajs/react";
import SinglePost from "@/Components/SinglePost";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Posts = ({ auth, posts }) => {
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
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Your posts
                    </h2>
                </div>

                <div>
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
    );
};

export default Posts;
