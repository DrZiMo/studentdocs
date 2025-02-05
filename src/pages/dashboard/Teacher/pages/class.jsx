import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../../../../components/errorAlert";
import Loading from "../../../../components/loading";
import { FaRedo } from "react-icons/fa";
import UpdateClass from "../../updateDialog/classUpdate";
import { getAllClassesFn } from "../../../../../redux/slices/classSlices/classSlice";
import DeleteClassAlert from "../../alertDialogs/deleteClassAlert";
import CreateClass from "../../createDialogs/createClassDialogs";

const ClassTeacher = () => {
    const classState = useSelector((state) => state.class);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllClassesFn())
    }, [dispatch]);

    const refresh = () => {
        dispatch(getAllClassesFn())
    }

    // if (classState.error) return <ErrorAlert message={classState.error} />;
    if (classState.isLoading) return <Loading />;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl text-blue-700">Classes</h1>
                <div className="flex items-center gap-5">
                    <div className="text-xl text-gray-400 cursor-pointer hover:text-gray-700 transition" onClick={refresh}>
                        <FaRedo />
                    </div>
                    <div className="text-white bg-blue-700 w-fit hover:bg-blue-800 rounded-md transition items-center">
                        <CreateClass />
                    </div>
                </div>
            </div>
            {classState.data?.classes?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-fixed w-[200%] md:w-full border-collapse border border-gray-300 bg-white shadow-md">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-3 py-2 border">ID</th>
                                <th className="px-3 py-2 border">Name</th>
                                <th className="px-3 py-2 border">Year</th>
                                <th className="px-3 py-2 border">Faculty</th>
                                <th className="px-3 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classState.data.classes.map((cls) => (
                                <tr key={cls.id} className="border-b hover:bg-gray-50">
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {cls.id.length > 10 ? cls.id.slice(0, 10) + "..." : cls.id}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {cls.name}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {cls.year || "No description"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {cls.faculty.name || "N/A"}
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="bg-blue-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <UpdateClass key={cls.id} class_id={cls.id} />
                                            </div>
                                            <div className="bg-red-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <DeleteClassAlert key={cls.id} class_id={cls.id} />
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
                                No faculty members found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClassTeacher;
