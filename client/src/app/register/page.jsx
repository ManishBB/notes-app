"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Please enter your name!");
            return;
        }

        if (!email) {
            toast.error("Please enter your email address!");
            return;
        }

        if (!conf.emailRegex.test(email)) {
            toast.error("Please enter your email address correctly!");
            return;
        }

        if (!password) {
            toast.error("Please enter your password!");
            return;
        }

        try {
            const response = await axios.post(
                `${conf.baseUrl}/user/register-user`,
                {
                    name,
                    email,
                    password,
                }
            );
            const { data } = response.data;

            console.log(data);

            router.push("/login");

            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            const errorMessage =
                error.response?.data?.error || "An unexpected error occurred!";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-4">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Register
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-1 pl-2 pr-2 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-1 pl-2 pr-2 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-1 pl-2 pr-2 text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p
                    className="text-center cursor-pointer mt-5"
                    onClick={handleLogin}
                >
                    Do you have an account? Login
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;
