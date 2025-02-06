import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../redux/slices/sideBarSlice";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import PopoverDemo from "./popover";

const Header = () => {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)

  const changeSideBarState = () => {
    dispatch(toggleSideBar())
  }

  return (
    <div className="header shadow-md bg-blue-700 p-4 px-3 md:px-6 flex justify-between items-center sticky top-0 z-50 md:static">
      <div className="logo font-konit text-white text-2xl md:text-3xl">
        StudentDocs
      </div>
      <div className="right-part flex gap-4 items-center">
        {userState.data.isSuccess ? (
          <Link to={userState.data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/teacher'}><div className="upload border-2 border-white text-white py-1 px-5 transition hover:bg-white  rounded-md hover:text-blue-700 cursor-pointer">
            Dashboard
          </div></Link>
        ) : (null)}
        <div>
          {userState.data.isSuccess ? (
            <PopoverDemo />
          ) : (
            <Link to='/auth/login'>
              <div className="text-white text-xl bg-blue-800 hover:text-gray-300 px-3 py-3 rounded-full transition relative group">
                <FaUser />
              </div>
            </Link>
          )}
        </div>
        <div className="block md:hidden cursor-pointer" onClick={changeSideBarState}>
          <i className="fa-solid fa-bars text-white text-3xl transition"></i>

        </div>
      </div>
    </div>
  );
};

export default Header;
