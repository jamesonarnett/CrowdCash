import React from "react";
import NavLink from "./NavLink";

const PostButton = ({ text }) => {
    return (
        <button
            className="bg-primary text-black hover:bg-secondary py-2 px-4 rounded
         shadow-md m-2 transition-all duration-200 ease-in-out hover:shadow-lg"
            onClick={() => route("post")}
        >
            <NavLink
                href={route("post")}
                active={route().current("post")}
                isInNav={false}
            >
                {text}
            </NavLink>
        </button>
    );
};

export default PostButton;
