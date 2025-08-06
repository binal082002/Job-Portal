import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const Nav = () => {

  const { user, isLoggedIn, isAdmin, logoutUser } = useAuth();

  return (
    <div className="">
      {!isLoggedIn ? (
        <div className="flex justify-between items-center px-6 py-4 bg-amber-100 shadow-md">
          <div className="flex space-x-6">
            <a
              href="/register"
              className="text-lg text-gray-700 hover:text-blue-600"
            >
              Register
            </a>
            <a
              href="/login"
              className="text-lg text-gray-700 hover:text-blue-600"
            >
              Login
            </a>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center px-6 py-4 bg-amber-100 shadow-md">
          <div className="flex space-x-6">
            <a
              href="/jobs"
              className="text-lg text-gray-700 hover:text-blue-600"
            >
              Job List
            </a>
            <a
              href="/upload"
              className="text-lg text-gray-700 hover:text-blue-600"
            >
              Resume Upload
            </a>
            {isAdmin && (
              <>
                <a
                  href="/applications"
                  className="text-lg text-gray-700 hover:text-blue-600"
                >
                  Applications
                </a>
                <a
                  href="/add-job"
                  className="text-lg text-gray-700 hover:text-blue-600"
                >
                  Add Job
                </a>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-700">
              {user.username}
            </span>
            <button
              onClick={() => logoutUser()}
              className="w-34 h-12 border border-[#3f47b3] rounded-full text-[#000000] text-lg font-medium bg-white hover:bg-gray-100 focus:outline-none md:w-28 md:h-10 md:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
