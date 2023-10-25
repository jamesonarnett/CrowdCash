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
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: (theme) => ({
                "gradient-primary":
                    "linear-gradient(180deg, #eeeeee 0%, #b39ddb 100%)",
                "gradient-primary-flip":
                    "linear-gradient(0deg, #eeeeee 0%, #b39ddb 100%)",
            }),
        },
    },

    plugins: [forms],
};
