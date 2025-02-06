import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllFaculties, getSingleFaculty, resetSelectedFaculty } from "../../redux/slices/facultySlices/facultySlice";
import Loading from "./loading";
import { RiCustomerService2Fill } from "react-icons/ri";

const SideBar = () => {
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState(0);
  const isClosed = useSelector(state => state.sideBar.isClosed)
  const sidebarRef = useRef(null)

  const facultyState = useSelector(state => state.faculty)
  const sideBarClickHandler = (index, id) => {
    setActiveIndex(index);
    dispatch(getSingleFaculty(id));
  };

  const sideBarAll = () => {
    setActiveIndex(0)
    dispatch(resetSelectedFaculty())
  }

  useEffect(() => {
    dispatch(getAllFaculties())
  }, [])

  return (

    <div
      className={`side-bar flex-col h-full md:h-[100vh] bg-white w-1/2 md:w-1/3 xl:w-[300px] px-6 py-4 top-[4.2rem] fixed right-0 md:sticky md:left-0 md:top-0 flex shadow-md border-l-2 md:border-r-2 border-gray-400 md:transition-none transition duration-300 md:translate-x-0 ${!isClosed ? "translate-x-0" : "translate-x-96"}`}
    >
      <div className="side-bar-upper-part">
        <div className="side-bar-title text-blue-700 text-xl font-semibold">Faculty</div>
        {facultyState.isLoading ? (
          <div className="mt-6">
            <Loading />
          </div>
        ) : (
          <ul className="text-gray-800 flex flex-col gap-1 mt-2">
            <li onClick={sideBarAll} className={`cursor-pointer transition py-1 px-4 rounded-md hover:text-blue-700 hover:bg-gray-200 ${activeIndex === 0 ? "text-blue-700 bg-gray-200" : ""}`}>All</li>
            {facultyState.data?.faculties?.map((faculty, index) => (
              <li
                key={index}
                className={`cursor-pointer transition py-1 px-4 rounded-md ${activeIndex != index + 1
                  ? " hover:text-blue-700 hover:bg-gray-200"
                  : "text-blue-700 bg-gray-200"
                  }`}
                onClick={() => sideBarClickHandler(index + 1, faculty.id)}
              >
                {faculty.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="side-bar-lower-part mt-10">
        <div className="flex gap-6 items-center">
          <div className="text-white bg-blue-700 w-fit px-5 py-2 hover:bg-blue-800 rounded-md transition">
            <Link to='/project-overview'>Overview</Link>
          </div>
          <Link to='/customer-support'>
            <div className="text-2xl text-gray-400 cursor-pointer hover:text-gray-700 transition">
              <RiCustomerService2Fill />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition w-fit">
                Help
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default SideBar;
