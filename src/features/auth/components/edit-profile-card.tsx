"use client"; // Ensure this is a client component in Next.js

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa"; // Importing pencil icon
import { getUsers } from "@/services/userService"; // Importing getUsers function

export const UpdateProfileForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    imageUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80", // Default image
  });

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await getUsers(); // Call getUsers function from userService
        console.log("Fetched user data from API:", users); // Log the entire API response

        // Check if the response is an object with expected properties
        if (users && users.nickName && users.email) {
          // Set default image if imageUrl is null or undefined
          const imageUrl = users.imageUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80";

          setUserData({
            name: users.nickName,
            email: users.email,
            imageUrl: imageUrl,
          });
        } else {
          console.error("Invalid user data structure:", users);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Update Profile
          </h2>
          <form className="space-y-6">
            {/* Profile image */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={userData.imageUrl} // Display image from the database or default
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors text-sm"
                >
                  <FaEdit /> {/* Using the pencil icon */}
                </button>
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </div>

            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name} // Assign state value to input field
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email} // Assign state value to input field
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Update button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
