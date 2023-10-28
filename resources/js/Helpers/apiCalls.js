import toast from "react-hot-toast";
import axios from "axios";

export const getPosts = async (setPosts) => {
    try {
        const response = await axios.get("/api/post");
        setPosts(response.data.posts);
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (postID) => {
    try {
        const response = await axios.delete(`/api/post/${postID}`);
        if (response.data.success) {
            toast.success(response.data.message);
            await getPosts();
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};
