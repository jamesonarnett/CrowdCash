import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import LoadingSpinner from "@/Components/LoadingSpinner";
import TextInput from "@/Components/inputs/TextInput";
import SubmitBtn from "@/Components/buttons/SubmitBtn";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatePost({ auth }) {
    const [formData, setFormData] = useState({
        user_id: auth.user.id,
        title: "",
        content: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios
            .post("/api/post", formData)
            .then((response) => {
                if (response.data.success) {
                    toast("Post created successfully!", {
                        icon: "👍",
                    });

                    // lol make em wait a bit - rEaCtiViTy
                    setTimeout(() => {
                        window.location.href = "/posts";
                    }, 2000);
                }
            })
            .catch((error) => {
                toast.error("An error occurred while posting your data.");
                setIsLoading(false);
                console.error(error);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post
                </h2>
            }
        >
            <Head title="Post" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col w-100 justify-center my-10">
                        <h1 className="text-xl font-semibold mt-4 text-center">
                            From your heart to theirs, share your experiences
                            with the world and find the assistance you need!
                        </h1>

                        <div className="flex justify-center">
                            {isLoading ? (
                                <LoadingSpinner text="Saving!" />
                            ) : (
                                <form className="w-[85%]" onSubmit={submit}>
                                    <div className="flex flex-col">
                                        <label className="mt-6" htmlFor="title">
                                            Title
                                        </label>
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            autofocus
                                        />

                                        <label
                                            className="mt-3"
                                            htmlFor="content"
                                        >
                                            Content
                                        </label>
                                        <TextInput
                                            id="content"
                                            type="text"
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                        />

                                        <div className="w-50 flex justify-center mt-3">
                                            <SubmitBtn
                                                text="Go Back"
                                                onSubmit={() => {
                                                    window.history.back();
                                                }}
                                                type="button"
                                            />
                                            <SubmitBtn text="Create Post" />
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
