import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../../../../components/errorAlert";
import Loading from "../../../../components/loading";
import { getDocuments } from "../../../../../redux/slices/documentSlices/documentSlice";
import { FaPlus, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";
import UpdateDocument from "../../updateDialog/documentUpdate";
import AlertDialog from "../../alertDialogs/deleteDocumentAlert";

const DocumentsAdmin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const documentState = useSelector((state) => state.document);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDocuments());
    }, [dispatch]);

    const refresh = () => {
        dispatch(getDocuments());
    }

    // if (documentState.error) return <ErrorAlert message={documentState.error} />;
    if (documentState.isLoading) return <Loading />;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-xl text-blue-700">Documents</h1>
                <div className="flex items-center gap-5">
                    <div className="text-xl text-gray-400 cursor-pointer hover:text-gray-700 transition" onClick={refresh}>
                        <FaRedo />
                    </div>
                    <Link to='/document/upload'><button className="text-white bg-blue-700 w-fit px-5 py-2 hover:bg-blue-800 rounded-md transition flex gap-2 items-center"><FaPlus /> Upload Document</button></Link>
                </div>
            </div>
            {documentState.data.documents?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-fixed w-[200%] md:w-full border-collapse border border-gray-300 bg-white shadow-md">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="px-3 py-2 border">ID</th>
                                <th className="px-3 py-2 border">Name</th>
                                <th className="px-3 py-2 border">Description</th>
                                <th className="px-3 py-2 border">Type</th>
                                <th className="px-3 py-2 border">Faculty</th>
                                <th className="px-3 py-2 border">Teacher</th>
                                <th className="px-3 py-2 border">Course</th>
                                <th className="px-3 py-2 border">Classes</th>
                                <th className="px-3 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documentState.data.documents.map((document) => (
                                <tr key={document.id} className="border-b hover:bg-gray-50">
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.id.length > 10 ? document.id.slice(0, 10) + "..." : document.id}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.name}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.description || "No description"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.file_type || "Un Known"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.faculty?.name || "N/A"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.user.username || "N/A"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.course?.name || "No Course"}
                                    </td>
                                    <td className="px-3 py-1 text-sm text-gray-900 border">
                                        {document.classes?.map((cls) => cls.class.name).join(", ") || "No Classes"}
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="bg-blue-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <UpdateDocument key={document.id} document_id={document.id} />
                                            </div>
                                            <div className="bg-red-700 text-white text-sm rounded-md hover:bg-blue-700">
                                                <AlertDialog key={document.id} document_id={document.id} />
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
                                No documents found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DocumentsAdmin;