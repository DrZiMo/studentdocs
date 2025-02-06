import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../../../../components/errorAlert";
import Loading from "../../../../components/loading";
import { FaPlus, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../../../redux/slices/userSlices/allUsersSlice";
import { maskEmail } from "../../../../components/maskEmail";
import UpdateUser from "../../updateDialog/userUpdateDialog";
import DeleteUserAlert from "../../alertDialogs/deleteUserAlert";
import CreateUser from "../../createDialogs/createUserDialog";

const UsersAdmin = () => {
    const userState = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const refresh = () => {
        dispatch(getAllUsers());
    }

    // if (userState.error) return <ErrorAlert message={userState.error} />;
    if (userState.isLoading) return <Loading />;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl text-blue-700">Users</h1>
                <div className="flex items-center gap-5">
                    <div className="text-xl text-gray-400 cursor-pointer hover:text-gray-700 transition" onClick={refresh}>
                        <FaRedo />
                    </div>
                    <div className="text-white bg-blue-700 w-fit hover:bg-blue-800 rounded-md transition items-center">
                        <CreateUser />
                    </div>
                </div>
            </div>
            {userState.data.users?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-fixed w-[200%] md:w-full border-collapse border border-gray-300 bg-white shadow-md">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-3 py-2 border">ID</th>
                                <th className="px-3 py-2 border">Name</th>
                                <th className="px-3 py-2 border">Email</th>
                                <th className="px-3 py-2 border">Phone number</th>
                                <th className="px-3 py-2 border">Role</th>
                                <th className="px-3 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userState.data.users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {user.id.length > 10 ? user.id.slice(0, 10) + "..." : user.id}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {user.username}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {maskEmail(user.email) || "No email"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {user.phone_number || "Un Known"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {user.role || "N/A"}
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="bg-blue-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <UpdateUser key={user.id} user_id={user.id} />
                                            </div>
                                            <div className="bg-red-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <DeleteUserAlert key={user.id} user_id={user.id} />
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
                                No users found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UsersAdmin;