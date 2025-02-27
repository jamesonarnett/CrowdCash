import React from "react";
import NavLink from "../nav/NavLink";

const GoToPostBtn = ({ text }) => {
    return (
        <NavLink
            href={route("post")}
            active={route().current("post")}
            isInNav={false}
        >
            <button
                className="bg-primary text-black px-6 py-3 rounded-full 
                inline-block shadow-md hover:bg-orange hover:text-black transition duration-300 
                ease-in-out hover:shadow-lg text-[17px] font-semibold"
            >
                {text}
            </button>
        </NavLink>
    );
};

export default GoToPostBtn;
