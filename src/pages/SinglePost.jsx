import React, { useEffect } from 'react';
import Back from '../components/back';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDocument } from '../../redux/slices/documentSlices/getSingleDocumentSlice';
import Loading from '../components/loading';
import { MdContentCopy } from "react-icons/md";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { FormattedSize } from '../components/formatSize';
import { FaBook, FaBox, FaDownload, FaPaperclip, FaRegClock, FaUniversity, FaUser } from 'react-icons/fa';
import { formatTime } from '../components/formatTime';
import axios from 'axios';
import { baseUrl } from '../constants/baseUrl';
import ErrorAlert from '../components/errorAlert';

const SinglePost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const singleDocumentState = useSelector(state => state.singleDocument);
    const selectedDocument = singleDocumentState.singleData?.selectedDocument;

    const successToastId = 'success-toast';

    const downloadUrl = `${selectedDocument?.link.replace('/upload/', '/upload/fl_attachment/')}`;

    useEffect(() => {
        if (id) {
            dispatch(getSingleDocument(id));
        }
    }, [dispatch, id]);

    const addDownload = async (id) => {
        try {
            const res = await axios.post(`${baseUrl}documents/add-download-number`, { id })

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!", {
                toastId: successToastId,
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            toast.error("Fieled to copy!", {
                toastId: successToastId,
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <div className='w-full bg-transparent'>
            <Back />

            {singleDocumentState.singleError ? (
                <ErrorAlert message={singleDocumentState.singleError} />
            ) : (
                singleDocumentState.singleIsLoading ? (
                    <Loading />
                ) : selectedDocument ? (
                    <div className='py-6 px-6 md:px-10 border border-gray-400 bg-white mt-4 rounded-md flex flex-col md:flex-row items-center gap-8 w-[80%] md:w-auto mx-auto md:mx-0'>
                        <div className='w-[150px]'>
                            <img
                                src={`/assets/${selectedDocument.file_type.toLowerCase()}.png`}
                                alt={selectedDocument.file_type.toLowerCase()}
                            />
                        </div>
                        <div className='flex-grow w-full md:w-auto'>
                            <div className='flex flex-col gap-1 md:max-w-[200px]'>
                                <div className=''>
                                    <div className='font-bold text-3xl'>{selectedDocument.name}</div>
                                    <div className='text-sm text-gray-500'>{selectedDocument.faculty.name}</div>
                                </div>
                                <div className='flex gap-5 items-center mt-5'>
                                    <div className='text-gray-500'><FaUser /></div>
                                    <div>{selectedDocument.user.username}</div>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <div className='text-gray-500'><FaBook /></div>
                                    <div>{selectedDocument.course.name}</div>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <div className='text-gray-500'><FaUniversity /></div>
                                    <div>
                                        {
                                            selectedDocument.classes.map(cls => cls.class.name).join(', ') || "No Classes"
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <div className='text-gray-500'><FaPaperclip /></div>
                                    <div>
                                        <div>
                                            {selectedDocument.file_type.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <div className='text-gray-500'><FaBox /></div>
                                    <div><FormattedSize size={selectedDocument.size} /></div>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <div className='text-gray-500'><FaDownload /></div>
                                    <div>{selectedDocument.download_number}</div>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <div className='text-gray-500'><FaRegClock /></div>
                                    <div>{formatTime(selectedDocument.created_at)}</div>
                                </div>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <div>
                                    {selectedDocument?.link && (
                                        <div className='flex gap-2'>
                                            <a href={downloadUrl} download={selectedDocument?.name}>
                                                <button className='text-white bg-blue-700 w-fit px-5 py-2 hover:bg-blue-800 rounded-md transition my-4' onClick={() => addDownload(selectedDocument.id)}>
                                                    Download
                                                </button>
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className='text-2xl text-gray-400 hover:text-gray-700 transition cursor-pointer active:text-blue-700' onClick={handleCopyLink}>
                                    <MdContentCopy />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-4">Document not found.</p>
                )
            )}
            <ToastContainer />
        </div >
    );
};

export default SinglePost;
