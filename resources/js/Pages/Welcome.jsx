import { Link, Head } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import SkyDollars from "../../../public/images/skyDollars.png";
import SubmitBtn from "@/Components/buttons/SubmitBtn";
import SvgTrash from "@/Components/Trash/SvgTrash";
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
                    className={`p-3 text-right flex items-center justify-between fixed w-[100%] z-50
                        ${
                            navBackground
                                ? "bg-white shadow-md border-b-2 border-black"
                                : "bg-transparent"
                        }`}
                >
                    <div className="flex flex-col md:flex-row items-center w-full justify-between">
                        <div className="flex items-center">
                            <ApplicationLogo className="!max-w-12 !max-h-10" />
                        </div>
                        <div className="flex my-5 md:m-0 text-2xl">
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

                <div className="bg-orange flex flex-col">
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

                    <div className="w-full min-h-[200px] justify-center items-center bg-white">
                        <div className="p-5 flex flex-col md:flex-row items-center justify-center text-center">
                            <div className="p-5 flex flex-col justify-center items-center">
                                <p className="text-center text-3xl font-semibold">
                                    No matter the crisis
                                    <br />
                                    No matter the time
                                    <br />
                                    CrowdCash is here to help!
                                </p>
                                <SvgTrash />
                            </div>
                            <p className="mt-10 md:mt-0 flex flex-col text-3xl font-semibold">
                                Help others in their time of need with just a
                                click!
                                <SubmitBtn
                                    text="Get Started"
                                    onSubmit={() => {
                                        window.location.href =
                                            route("register");
                                    }}
                                    className="mt-4 min-w-1/3 text-xl font-semibold whitespace-nowrap"
                                />
                            </p>
                        </div>
                    </div>

                    <section className="bg-primary px-8 min-h-1/2 text-black border-t-2 border-white">
                        <h2 className="mt-6 text-3xl font-semibold mb-4 flex items-center">
                            How It Works
                            <VscWorkspaceUnknown
                                className="inline-block ml-2 text-3xl"
                                fill="#66C7F4"
                            />
                        </h2>
                        <div className="text-[18px] font-semibold">
                            <div className="p-4 border-[2px] bg-white border-orange rounded-lg shadow-md shadow-orange mt-5">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut faucibus pulvinar elementum integer.
                                    Tristique nulla aliquet enim tortor at
                                    auctor urna nunc. Morbi non arcu risus quis
                                    varius quam quisque id. Diam in arcu cursus
                                    euismod quis. Sit amet aliquam id diam
                                    maecenas ultricies mi. Id volutpat lacus
                                    laoreet non curabitur. Ut diam quam nulla
                                    porttitor massa id. Semper viverra nam
                                    libero justo laoreet sit. Nam aliquam sem et
                                    tortor consequat. Eleifend quam adipiscing
                                    vitae proin sagittis nisl. Aliquet sagittis
                                    id consectetur purus ut. Purus viverra
                                    accumsan in nisl nisi. Urna neque viverra
                                    justo nec ultrices dui. Nunc eget lorem
                                    dolor sed viverra ipsum nunc aliquet
                                    bibendum. Amet facilisis magna etiam tempor
                                    orci eu lobortis elementum.
                                </p>
                            </div>
                            <div className="p-4 border-[2px] bg-white border-orange rounded-lg shadow-md shadow-orange my-5">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut faucibus pulvinar elementum integer.
                                    Tristique nulla aliquet enim tortor at
                                    auctor urna nunc. Morbi non arcu risus quis
                                    varius quam quisque id. Diam in arcu cursus
                                    euismod quis. Sit amet aliquam id diam
                                    maecenas ultricies mi. Id volutpat lacus
                                    laoreet non curabitur. Ut diam quam nulla
                                    porttitor massa id. Semper viverra nam
                                    libero justo laoreet sit. Nam aliquam sem et
                                    tortor consequat. Eleifend quam adipiscing
                                    vitae proin sagittis nisl. Aliquet sagittis
                                    id consectetur purus ut. Purus viverra
                                    accumsan in nisl nisi. Urna neque viverra
                                    justo nec ultrices dui. Nunc eget lorem
                                    dolor sed viverra ipsum nunc aliquet
                                    bibendum. Amet facilisis magna etiam tempor
                                    orci eu lobortis elementum.
                                </p>
                            </div>
                            <div className="p-4 border-[2px] bg-white border-orange rounded-lg shadow-md shadow-orange my-5">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut faucibus pulvinar elementum integer.
                                    Tristique nulla aliquet enim tortor at
                                    auctor urna nunc. Morbi non arcu risus quis
                                    varius quam quisque id. Diam in arcu cursus
                                    euismod quis. Sit amet aliquam id diam
                                    maecenas ultricies mi. Id volutpat lacus
                                    laoreet non curabitur. Ut diam quam nulla
                                    porttitor massa id. Semper viverra nam
                                    libero justo laoreet sit. Nam aliquam sem et
                                    tortor consequat. Eleifend quam adipiscing
                                    vitae proin sagittis nisl. Aliquet sagittis
                                    id consectetur purus ut. Purus viverra
                                    accumsan in nisl nisi. Urna neque viverra
                                    justo nec ultrices dui. Nunc eget lorem
                                    dolor sed viverra ipsum nunc aliquet
                                    bibendum. Amet facilisis magna etiam tempor
                                    orci eu lobortis elementum.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section
                        className="p-8 text-center text-black"
                        style={{
                            background: `url(${SkyDollars})`,
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="w-full flex justify-center">
                            <div
                                className="font-bold p-5 rounded-lg w-full md:w-1/2 shadow-lg"
                                style={{
                                    backgroundColor: "rgba(255,183,77, .85)",
                                }}
                            >
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
