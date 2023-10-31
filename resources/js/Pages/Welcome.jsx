import { Link, Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import SkyDollars from "../../../public/images/skyDollars.png";
import SubmitBtn from "@/Components/buttons/SubmitBtn";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { GiArcheryTarget } from "react-icons/gi";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Vote" />
            <div className="min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="p-6 text-right bg-white flex items-center justify-between border-b-2 border-white fixed w-[100%]">
                    <div className="flex flex-col md:flex-row items-center w-full justify-between">
                        <div className="flex items-center">
                            <ApplicationLogo className="!max-w-12 !max-h-10" />
                        </div>
                        <div className="flex my-5 md:m-0 text-xl">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="font-semibold text-black hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="font-semibold text-black hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="ml-4 font-semibold text-black hover:text-primary focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white min-h-screen flex flex-col">
                    <section
                        className="mt-[150px] md:mt-[90px] p-8 text-center text-black"
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
                    <section className="p-8 min-h-1/2 text-black border-t-2 border-white">
                        <h2 className="text-3xl font-semibold mb-4 flex items-center">
                            How It Works
                            <VscWorkspaceUnknown
                                className="inline-block ml-2 text-3xl"
                                fill="#66C7F4"
                            />
                        </h2>
                        <div className="text-[18px] font-semibold">
                            <div className="p-4 border-[2px] bg-orange-300 border-orange-300 rounded-lg shadow-lg my-5">
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
                            <div className="p-4 border-[2px] bg-orange-300 border-orange-300 rounded-lg shadow-lg my-5">
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
                            <div className="p-4 border-[2px] bg-orange-300 border-orange-300 rounded-lg shadow-lg my-5">
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
                    <section className="p-8 min-h-[300px] text-white bg-primary border-t-2 border-white">
                        <h2 className="text-3xl font-bold mb-4 flex items-center">
                            Our Mission
                            <GiArcheryTarget className="ml-3" fill="#FFFFFF" />
                        </h2>
                        <p className="text-[18px] font-semibold">
                            We believe in the power of people helping people.
                            Our platform enables individuals to receive support
                            from a caring community.
                        </p>
                    </section>
                    <footer className="p-4 text-center bg-white text-black">
                        <a
                            href="https://ajameson.dev"
                            className="font-bold"
                            target="_blank"
                        >
                            <p>
                                Made with{" "}
                                <span role="img" aria-label="heart">
                                    ❤️
                                </span>{" "}
                                by the "Team"
                            </p>
                        </a>
                    </footer>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='https://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='https://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
