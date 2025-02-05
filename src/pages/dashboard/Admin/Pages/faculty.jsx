import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../../../../components/errorAlert";
import Loading from "../../../../components/loading";
import { FaPlus, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllFaculties } from "../../../../../redux/slices/facultySlices/facultySlice";
import UpdateFaculty from "../../updateDialog/facultyUpdateDialog";
import DeleteFacultyAlert from "../../alertDialogs/deleteFacultyAlert";
import CreateFaculty from "../../createDialogs/createFacultyDialog";

const FacultiesAdmin = () => {
    const facultyState = useSelector((state) => state.faculty);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFaculties());
    }, [dispatch]);

    const refresh = () => {
        dispatch(getAllFaculties());
    }

    // if (facultyState.error) return <ErrorAlert message={facultyState.error} />;
    if (facultyState.isLoading) return <Loading />;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl text-blue-700">Faculties</h1>
                <div className="flex items-center gap-5">
                    <div className="text-xl text-gray-400 cursor-pointer hover:text-gray-700 transition" onClick={refresh}>
                        <FaRedo />
                    </div>
                    <div className="text-white bg-blue-700 w-fit hover:bg-blue-800 rounded-md transition items-center">
                        <CreateFaculty />
                    </div>
                </div>
            </div>
            {facultyState.data?.faculties?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-fixed w-[200%] md:w-full border-collapse border border-gray-300 bg-white shadow-md">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-3 py-2 border">ID</th>
                                <th className="px-3 py-2 border">Name</th>
                                <th className="px-3 py-2 border">Created</th>
                                <th className="px-3 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facultyState.data.faculties.map((faculty) => (
                                <tr key={faculty.id} className="border-b hover:bg-gray-50">
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {faculty.id.length > 10 ? faculty.id.slice(0, 10) + "..." : faculty.id}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {faculty.name}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {faculty.created_at}
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="bg-blue-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <UpdateFaculty key={faculty.id} faculty_id={faculty.id} />
                                            </div>
                                            <div className="bg-red-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <DeleteFacultyAlert key={faculty.id} faculty_id={faculty.id} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <table className="table-fixed w-full border-collapse border border-gray-300">
                    <tbody>
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-gray-600 border">
                                No faculties found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FacultiesAdmin;