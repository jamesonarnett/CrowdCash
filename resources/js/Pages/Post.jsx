import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import ErrorText from "@/Components/error/ErrorText";
import axios from "axios";
import toast from "react-hot-toast";

export default function Post({ auth }) {
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [formData, setFormData] = useState({
        user_id: auth.user.id,
        title: "",
        content: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();

        axios
            .post("/api/post", formData)
            .then((response) => {
                if (response.data.success) {
                    console.log("success", response.data);
                    toast("Post created successfully!", {
                        icon: "👍",
                    });
                }
            })
            .catch((error) => {
                setError(true);
                setErrMessage("An error occurred while posting your data.");
                console.error(error);
            });
    };

    return (
        <>
            {error ? (
                <ErrorText errMessage={errMessage} />
            ) : (
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
                                <h1 className="text-xl font-semibold mt-4">
                                    From your heart to theirs, share your
                                    experiences with the world.
                                </h1>
                                <p className="text-lg mt-0 pt-0">
                                    Find the assistance you need!{" "}
                                </p>

                                <div className="flex justify-center">
                                    <form className="w-[85%]" onSubmit={submit}>
                                        <div className="flex flex-col">
                                            <label htmlFor="title">Title</label>
                                            <input
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                autoFocus
                                                autoComplete="title"
                                            />

                                            <label htmlFor="content">
                                                content
                                            </label>
                                            <input
                                                id="content"
                                                type="text"
                                                name="content"
                                                value={formData.content}
                                                onChange={handleChange}
                                                required
                                                autoComplete="content"
                                            />

                                            <button
                                                type="submit"
                                                className="bg-primary text-black hover:bg-secondary py-2 px-4 rounded
                                                shadow-md m-2 transition-all duration-200 ease-in-out hover:shadow-lg"
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            )}
        </>
    );
}
