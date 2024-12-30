import React from "react";

// edit-profile-card.tsx
export const UpdateProfileForm = () => {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Update Profile
            </h2>
            <form className="space-y-6">
              {/* Ảnh đại diện */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors text-sm"
                  >
                    Edit
                  </button>
                </div>
                <input type="file" accept="image/*" className="hidden" />
              </div>
  
              {/* Trường tên */}
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
  
              {/* Trường email */}
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
  
              {/* Nút update */}
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
  