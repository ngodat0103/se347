
"use client"; 

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa"; 
import { getCurrentUser, updateCurrentUser } from "@/services/userService"; 
import { useRouter } from "next/navigation"; 

const defaultImageUrl = "https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg";

export const UpdateProfileForm = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    imageUrl: defaultImageUrl, // Default image
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null); 
  const [isError, setIsError] = useState(false); // Error state
  const router = useRouter(); 

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await getCurrentUser();
        setUserData({
          id: users.userId,
          name: users.nickName,
          email: users.email,
          imageUrl: users.imageUrl || userData.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

 
  const handleEditClick = async () => {
    if (!userData.id || !userData.name) {
      
      setIsError(true);
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      await updateCurrentUser({ nickName: userData.name }, imageFile); 
      setIsError(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      
      setIsError(true);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    
    setUserData({ ...userData, imageUrl: URL.createObjectURL(file) });
    setImageFile(file);
    

  };

  

  return (
    <div className="h-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Update Profile
          </h2>

          {/* Notification */}
          {message && (
            <div
              className={`mb-6 p-4 text-sm rounded ${
                isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <form className="space-y-6">
            {/* Profile image */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={userData.imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                />
                <input
                  type="file"
                  id="imgupload"
                  className="invisible"
                  hidden
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors text-sm"
                  onClick={() => document.getElementById("imgupload")?.click()}
                >
                  <FaEdit />
                </button>
              </div>
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
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Update button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleEditClick}
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

