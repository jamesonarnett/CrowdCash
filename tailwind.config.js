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
                tertiary: "#6C8AE3",
                quaternary: "#FF1053",
                myWhite: "#FFFFFF", // meh, maybe not
                offWhite: "#F0F0F0",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: (theme) => ({
                "gradient-primary":
                    "linear-gradient(180deg, #FFFFFF 30%, #66C7F4 100%)",
                "gradient-primary-flip":
                    "linear-gradient(0deg, #FFFFFF 0%, #66C7F4 100%)",
                "gradient-landing":
                    "linear-gradient(180deg, #FFFFFF 0%, #6C6EA0 100%)",
            }),
        },
    },

    plugins: [forms],
};
