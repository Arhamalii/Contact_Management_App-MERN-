import React, { useState } from "react";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/auth";
import logo from "../assets/logo.png";
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [auth, setAuth] = useAuth();
  const Navigate = useNavigate();
  // dropdown Handler
  const dropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  // handle logout
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    toast.success("Logout Successfully");
    localStorage.removeItem("auth");
    Navigate("/login");
  };

  return (
    <nav className="px-2 sm:px-9 md:px-16 lg:px-20 xl:px-24 py-3 sticky shadow-lg">
      <div className="flex justify-between items-center">
        <div className="w-32">
          <img src={logo} alt="logo" />
        </div>
        <div
          className="w-10 rounded-full relative"
          onMouseEnter={dropdownHandler}
          onMouseLeave={dropdownHandler}
        >
          <Avatar
            name={auth?.user?.name?.charAt(0)}
            size="34"
            round={true}
            className="bg-secondary"
            onClick={dropdownHandler}
            color="#5A6872 "
          />
          {console.warn(auth.user.name)}
          <div
            className={`flex-col items-start bg-slate-400 w-24 rounded-md text-white  px-2 fixed cursor-pointer overflow-hidden transition-max-height duration-700 ${
              showDropdown ? "max-h-20" : "max-h-0"
            } `}
          >
            <option value="profile" className="pt-2 pb-[0.40rem]">
              My Profile
            </option>
            <option
              value="logout"
              className="pt-[0.40rem] pb-2"
              onClick={handleLogout}
            >
              Logout
            </option>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
