import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProfileImage = ({ className = "" }) => {
    const user = usePage().props.auth.user;
    const [asset, setAsset] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [wrongFileType, setWrongFileType] = useState(false);

    const uploadFile = async (e) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ["image/png", "image/jpg", "image/gif", "image/jpeg"];

        if (fileTypes.includes(selectedFile.type)) {
            setIsUploading(true);

            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("user_id", user.id);

            try {
                const response = await axios.post(
                    "/api/upload-profile-image",
                    formData,
                );
                if (response.data.success) {
                    setAsset(response.data.image);
                    setIsUploading(false);
                    setWrongFileType(false);
                    toast("Image uploaded successfully!", {
                        icon: "👍",
                    });
                } else {
                    toast.error(
                        response.data.error ||
                            "An error occurred while uploading.",
                    );
                    setIsUploading(false);
                    setWrongFileType(true);
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while uploading your file.");
                setIsUploading(false);
                setWrongFileType(true);
            }
        } else {
            toast.error("Please select an asset with the correct file type.");
            setIsUploading(false);
            setWrongFileType(true);
        }
    };

    useEffect(() => {
        if (asset) {
            console.log(asset);
        }
    }, [asset]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Image
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile picture.
                </p>
            </header>
            <div
                className={`border-dashed rounded-xl 
                    border-4 border-gray-200 flex flex-col justify-center 
                    items-center outline-none mt-10 w-[350px] h-[460px] 
                    p-10 cursor-pointer hover:border-primary hover:bg-gray-100
                    ${
                        isUploading
                            ? "bg-gray-100 border-primary custom-pulse"
                            : ""
                    }`}
            >
                {isUploading ? (
                    <p className="text-xl">Uploading...</p>
                ) : (
                    <div className="flex lg:w-[260px] justify-center m-auto ">
                        {asset ? (
                            <div>
                                <img
                                    src={asset}
                                    alt="asset"
                                    className="rounded-xl h-[450px]"
                                />
                            </div>
                        ) : (
                            <label className="cursor-pointer">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="font-bold text-xl">
                                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                                        </p>
                                        <p className="text-xl font-semibold">
                                            Upload Photo
                                        </p>
                                    </div>
                                    <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                                        PNG, JPG, GIF <br />
                                        720P or higher <br />
                                    </p>
                                    <p
                                        className="bg-gray-800 text-center mt-10 rounded text-white text-md
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
        </section>
    );
};

export default UpdateProfileImage;
