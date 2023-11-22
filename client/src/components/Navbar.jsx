import React, { useState } from "react";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/auth";
import logo from "../assets/logo.png";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const [auth, setAuth] = useAuth();
  const Navigate = useNavigate();

  // handle logout
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    toast.success("Logout Successfully");
    localStorage.removeItem("auth");
    Navigate("/login");
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };
  return (
    <nav className="px-2 sm:px-9 md:px-16 lg:px-20 xl:px-24 py-3 sticky shadow-lg">
      <div className="flex justify-between items-center">
        <div className="w-32">
          <img src={logo} alt="logo" />
        </div>
        <div className="w-10 rounded-full relative cursor-pointer">
          <Avatar
            name={auth?.user?.name?.charAt(0)}
            size="34"
            round={true}
            className="bg-secondary"
            onClick={toggleDropdown}
            color="#5A6872 "
          />
          {console.warn(auth.user.name)}

          {open && (
            <div className="absolute w-40 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5 right-[-60px]">
              <ul className="space-y-3 dark:text-white">
                <li className="font-medium" onClick={handleLogout}>
                  <a
                    href="#"
                    className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                  >
                    <div className="mr-3 text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
