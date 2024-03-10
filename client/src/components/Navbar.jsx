"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Navbar() {
    const router = useRouter();

    const isUserLoggedIn = localStorage.getItem("isLoggedIn");

    const handleLogout = async () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        router.push("/login");
    };

    useEffect(() => {}, []);

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            {/* Left side */}
            <div className="flex items-center">
                <h1 className="text-white text-lg font-semibold">NotesApp</h1>
            </div>

            {isUserLoggedIn && (
                <div
                    className="flex items-center cursor-pointer"
                    onClick={handleLogout}
                >
                    <div className="hidden md:flex items-center">
                        <svg
                            className="w-6 h-6 text-white mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 9a3 3 0 00-3-3H6a3 3 0 00-3 3v10a3 3 0 003 3h6a3 3 0 003-3v-2.586M15 9V5a2 2 0 00-2-2h0a2 2 0 00-2 2v4"
                            />
                        </svg>
                        <span className="text-white">Logout</span>
                    </div>

                    <div className="md:hidden">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
