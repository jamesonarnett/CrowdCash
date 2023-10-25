import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#66C7F4",
                secondary: "#C1CAD6",
                tertiary: "#6C6EA0",
                quaternary: "#FF1053",
                myWhite: "#FFFFFF", // meh, maybe not
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: (theme) => ({
                "gradient-primary":
                    "linear-gradient(180deg, #FFFFFF 30%, #66C7F4 100%)",
                "gradient-primary-flip":
                    "linear-gradient(0deg, #FFFFFF 0%, #66C7F4 100%)",
            }),
        },
    },

    plugins: [forms],
};
