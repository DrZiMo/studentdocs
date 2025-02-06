import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/loading";
import { formatTime } from "../../../../components/formatTime";
import { getAllActivitiesFn } from "../../../../../redux/slices/activitySlices/getAllActivities";

const ActivityAdmin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const activityState = useSelector((state) => state.activities);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllActivitiesFn());
    }, [dispatch]);

    // if (activityState.error) return <ErrorAlert message={activityState.error} />;
    if (activityState.isLoading) return <Loading />;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl text-blue-700">Activity</h1>
            </div>
            {activityState.data.activities?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-fixed w-[200%] md:w-full border-collapse border border-gray-300 bg-white shadow-md">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-3 py-2 border">ID</th>
                                <th className="px-3 py-2 border">Action</th>
                                <th className="px-3 py-2 border">Method</th>
                                <th className="px-3 py-2 border">User</th>
                                <th className="px-3 py-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityState.data.activities.map((activity) => (
                                <tr key={activity.id} className="border-b hover:bg-gray-50">
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {activity.id.length > 10 ? activity.id.slice(0, 10) + "..." : activity.id}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {activity.name}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {activity.method || "No Method"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {activity.user.username}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {formatTime(activity.created_at)}
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
                                No Activities found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ActivityAdmin;