
import React, { useEffect, useState } from "react";



const UserProfile = () => {

    const [user, setUser] = useState({})


    const fetchUser = async () => {
        try {
            const res = await fetch("http://localhost:5000/me", { credentials: "include" });
            const data = await res.json()
            console.log(data);

            setUser(data.user)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-12">

            <div className="mx-auto max-w-2xl">

                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>
                    <p className="mt-2 text-gray-500">
                        View your personal account information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                    {/* Profile Header */}
                    <div className="bg-gray-900 px-6 py-10 text-center">

                        {/* Avatar */}
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold uppercase text-gray-900">
                            {user.name.charAt(0)}
                        </div>

                        <h2 className="mt-4 text-2xl font-bold capitalize text-white">
                            {user.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-300">
                            {user.email}
                        </p>

                        <span className="mt-4 inline-block rounded-full bg-green-500/20 px-4 py-1 text-sm font-medium capitalize text-green-400">
                            {user.role}
                        </span>

                    </div>

                    {/* User Details */}
                    <div className="p-6 sm:p-8">

                        <h3 className="mb-6 text-lg font-semibold text-gray-900">
                            Personal Information
                        </h3>

                        <div className="space-y-5">

                            {/* User ID */}
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    User ID
                                </p>
                                <p className="mt-1 break-all font-medium text-gray-900">
                                    {user._id}
                                </p>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Name */}
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Full Name
                                </p>
                                <p className="mt-1 font-medium capitalize text-gray-900">
                                    {user.name}
                                </p>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Email */}
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Email Address
                                </p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {user.email}
                                </p>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Phone */}
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Phone Number
                                </p>
                                <p className="mt-1 font-medium text-gray-900">
                                    {user.phone}
                                </p>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Role */}
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Account Role
                                </p>
                                <p className="mt-1 font-medium capitalize text-gray-900">
                                    {user.role}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;
