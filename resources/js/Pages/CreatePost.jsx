import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import LoadingSpinner from "@/Components/LoadingSpinner";
import TextInput from "@/Components/inputs/TextInput";
import SubmitBtn from "@/Components/buttons/SubmitBtn";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreatePost({ auth }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [asset, setAsset] = useState(null);
    const [wrongFileType, setWrongFileType] = useState(false);
    const [formData, setFormData] = useState({
        userId: auth.user.id,
        title: "",
        content: "",
        filePath: null,
        mimeType: null,
    });

    const uploadFile = async (e) => {
        const selectedFile = e.target.files[0];
        const fileTypes = [
            "video/mp4",
            "video/webm",
            "image/png",
            "image/jpg",
            "image/gif",
            "image/jpeg",
        ];

        if (fileTypes.includes(selectedFile.type)) {
            setIsUploading(true);

            const formData = new FormData();
            formData.append("file", selectedFile);

            await axios
                .post("/api/upload", formData)
                .then((response) => {
                    if (response.data.success) {
                        setAsset(response.data);
                        setIsUploading(false);
                        setWrongFileType(false);
                        toast("File uploaded successfully!", {
                            icon: "👍",
                        });
                    } else {
                        toast.error("An error occurred while uploading.");
                        setIsUploading(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("An error occurred while uploading your file.");
                    setIsUploading(false);
                    setWrongFileType(true);
                });
        } else {
            toast.error("Please select an asset with the correct file type.");
            setIsUploading(false);
            setWrongFileType(true);
        }
    };

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

                    setTimeout(() => {
                        window.location.href = "/posts";
                    }, 800);
                }
            })
            .catch((error) => {
                toast.error("An error occurred while posting your data.");
                setIsLoading(false);
                console.error(error);
            });
    };

    useEffect(() => {
        if (asset) {
            setFormData({
                ...formData,
                filePath: asset?.filePath,
                mimeType: asset?.mimeType,
            });
        }
    }, [asset]);

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

            <div className="py-4 flex justify-center align-center">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row w-100 justify-center my-10">
                        <div>
                            <div>
                                <p className="text-2xl font-bold">
                                    Upload Content
                                </p>
                                <p className="text-md mt-1">
                                    Post to find the assistance you need!
                                </p>
                            </div>
                            <div
                                className={`border-dashed rounded-xl 
                                    border-4 border-gray-200 flex flex-col justify-center 
                                    items-center outline-none mt-10 w-[350px] h-[460px] 
                                    p-10 cursor-pointer hover:border-secondary hover:bg-gray-100
                                    ${
                                        isUploading
                                            ? "bg-gray-100 border-secondary custom-pulse"
                                            : ""
                                    }`}
                            >
                                {isUploading ? (
                                    <p className="text-xl">Uploading...</p>
                                ) : (
                                    <div className="flex lg:w-[260px] justify-center m-auto ">
                                        {asset ? (
                                            <div>
                                                {asset.type?.includes(
                                                    "video",
                                                ) ? (
                                                    <video
                                                        src={asset.filePath}
                                                        loop
                                                        controls
                                                        className="rounded-xl h-[450px] bg-black"
                                                    ></video>
                                                ) : (
                                                    <img
                                                        src={asset.filePath}
                                                        alt="asset"
                                                        className="rounded-xl h-[450px]"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer">
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <p className="font-bold text-xl">
                                                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                                                        </p>
                                                        <p className="text-xl font-semibold">
                                                            Upload Video or
                                                            Photo
                                                        </p>
                                                    </div>
                                                    <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                                                        MP4, WebM, PNG, JPG{" "}
                                                        <br />
                                                        720P or higher <br />
                                                        Up to 10 minutes <br />
                                                        Less than 2GB
                                                    </p>
                                                    <p
                                                        className="bg-[#66C7F4] text-center mt-10 rounded text-black text-md
                                                        font-medium p-2  w-52 outline-none"
                                                    >
                                                        Select File
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    name="upload-video"
                                                    className="w-0 h-0"
                                                    onChange={uploadFile}
                                                />
                                            </label>
                                        )}
                                    </div>
                                )}
                                {wrongFileType && (
                                    <p
                                        className="text-center text-xl text-red-500
                                        font-semibold mt-4 w-[250px]"
                                    >
                                        Please Select a video file
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center items-center md:w-[500px]">
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
