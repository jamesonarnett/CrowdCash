import { Link, Head } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import SkyDollars from "../../../public/images/skyDollars.png";
import SubmitBtn from "@/Components/buttons/SubmitBtn";
import SvgTrash from "@/Components/trash/SvgTrash";
import { VscWorkspaceUnknown } from "react-icons/vsc";

export default function Welcome({ auth }) {
    const [navBackground, setNavBackground] = useState(false);

    const navRef = useRef();
    navRef.current = navBackground;

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 50;
            if (navRef.current !== show) {
                setNavBackground(show);
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <>
            <Head title="Vote" />
            <div className="max-h-screen bg-primary">
                <div
                    ref={navRef}
                    className={`p-5 text-right flex items-center justify-between fixed w-[100%] z-50
                        ${
                            navBackground
                                ? "bg-tan shadow-xl"
                                : "bg-transparent"
                        }`}
                >
                    <div className="flex flex-col md:flex-row items-center w-full justify-between">
                        <div className="flex items-center">
                            <ApplicationLogo className="!max-w-12 !max-h-10" />
                        </div>
                        <div className="flex mt-5 md:m-0 text-2xl">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="font-semibold text-black focus:outline focus:outline-2 focus:rounded-sm focus:outline-black"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="font-semibold text-black focus:outline focus:outline-2 focus:rounded-sm focus:outline-black"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="ml-4 font-semibold text-black focus:outline focus:outline-2 focus:rounded-sm focus:outline-black"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-tan flex flex-col">
                    <div className="custom-shape-divider-top-1698887276">
                        <svg
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                                className="shape-fill"
                            ></path>
                        </svg>
                    </div>

                    <div className="w-full min-h-[200px] justify-center items-center bg-tan">
                        <div className="p-5 flex flex-col items-center justify-center text-center">
                            <div className="p-5 flex flex-col md:flex-row justify-center items-center">
                                <p className="text-5xl lg:text-6xl m-3 font-light mr-0 md:mr-12">
                                    <span className="block my-6">
                                        No matter
                                    </span>
                                    <span className="block my-6 -ml-6">
                                        the crisis.
                                    </span>

                                    <span className="block my-6 -ml-1">
                                        No matter
                                    </span>
                                    <span className="block my-6 -ml-8">
                                        the time.
                                    </span>
                                </p>
                                <div className="ml-0 md:ml-12 flex flex-col align-center">
                                    <p className="text-3xl m-3 md:text-4xl">
                                        CrowdCash is here to help
                                    </p>
                                    <SvgTrash />
                                    <SubmitBtn
                                        text="Make your first post now"
                                        onSubmit={() => {
                                            window.location.href =
                                                route("register");
                                        }}
                                        className="mt-4 min-w-1/3 text-xl font-semibold whitespace-nowrap hover:bg-orange"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="bg-primary px-8 min-h-1/2 text-black">
                        <h2 className="mt-6 text-3xl font-semibold mb-4 flex items-center">
                            How It Works
                            <VscWorkspaceUnknown
                                className="inline-block ml-2 text-3xl"
                                fill="#000000"
                            />
                        </h2>
                        <div className="text-[18px] mb-8 font-semibold flex flex-col md:flex-row">
                            <div className="p-4 m-2 bg-tan rounded-lg shadow-md shadow-black my-5">
                                <h3 className="text-2xl font-semibold mb-2">
                                    Step 1
                                </h3>
                                <p className="font-light">
                                    Vaporware portland tumblr tousled, taiyaki
                                    yuccie subway tile beard gentrify swag
                                    hoodie poutine chia. Fixie la croix
                                    readymade salvia fanny pack. Cray
                                    letterpress umami, narwhal selfies tumeric
                                    chartreuse viral helvetica same banjo
                                    chicharrones. Cold-pressed humblebrag
                                    kickstarter, street art unicorn forage
                                    affogato pok pok. Vaporware portland tumblr
                                    tousled, taiyaki yuccie subway tile beard
                                    gentrify swag hoodie poutine chia. Fixie la
                                    croix readymade salvia fanny pack. Cray
                                    letterpress umami, narwhal selfies tumeric
                                    chartreuse viral helvetica same banjo
                                    chicharrones. Cold-pressed humblebrag
                                    kickstarter, street art unicorn forage
                                    affogato pok pok.
                                </p>
                            </div>
                            <div className="p-4 m-2 bg-tan rounded-lg shadow-md shadow-black my-5">
                                <h3 className="text-2xl font-semibold mb-2">
                                    Step 2
                                </h3>
                                <p className="font-light">
                                    Vaporware portland tumblr tousled, taiyaki
                                    yuccie subway tile beard gentrify swag
                                    hoodie poutine chia. Fixie la croix
                                    readymade salvia fanny pack. Cray
                                    letterpress umami, narwhal selfies tumeric
                                    chartreuse viral helvetica same banjo
                                    chicharrones. Cold-pressed humblebrag
                                    kickstarter, street art unicorn forage
                                    affogato pok pok. Vaporware portland tumblr
                                    tousled, taiyaki yuccie subway tile beard
                                    gentrify swag hoodie poutine chia. Fixie la
                                    croix readymade salvia fanny pack. Cray
                                    letterpress umami, narwhal selfies tumeric
                                    chartreuse viral helvetica same banjo
                                    chicharrones. Cold-pressed humblebrag
                                    kickstarter, street art unicorn forage
                                    affogato pok pok.
                                </p>
                            </div>
                            <div className="p-4 m-2 bg-tan rounded-lg shadow-md shadow-black my-5">
                                <h3 className="text-2xl font-semibold mb-2">
                                    Step 3
                                </h3>
                                <p className="font-light">
                                    Vaporware portland tumblr tousled, taiyaki
                                    yuccie subway tile beard gentrify swag
                                    hoodie poutine chia. Fixie la croix
                                    readymade salvia fanny pack. Cray
                                    letterpress umami, narwhal selfies tumeric
                                    chartreuse viral helvetica same banjo
                                    chicharrones. Cold-pressed humblebrag
                                    kickstarter, street art unicorn forage
                                    affogato pok pok. Vaporware portland tumblr
                                    tousled, taiyaki yuccie subway tile beard
                                    gentrify swag hoodie poutine chia. Fixie la
                                    croix readymade salvia fanny pack. Cray
                                    letterpress umami, narwhal selfies tumeric
                                    chartreuse viral helvetica same banjo
                                    chicharrones. Cold-pressed humblebrag
                                    kickstarter, street art unicorn forage
                                    affogato pok pok.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 text-center text-black">
                        <div className="w-full flex justify-center">
                            <div className="font-bold p-5 border-[2px] border-black rounded-lg w-full md:w-1/2 shadow-lg">
                                <h1 className="text-4xl">
                                    Your Platform for Making a Difference
                                </h1>
                                <p className="mt-4 text-xl">
                                    Join our community and help those in need by
                                    casting your votes.
                                </p>

                                <SubmitBtn
                                    text="Get Started"
                                    onSubmit={() => {
                                        window.location.href =
                                            route("register");
                                    }}
                                    className="mt-4 min-w-1/3 text-xl font-semibold whitespace-nowrap"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
