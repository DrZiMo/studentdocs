import React, { useEffect } from 'react';
import Back from '../components/back';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDocument } from '../../redux/slices/documentSlices/getSingleDocumentSlice';
import Loading from '../components/loading';
import { MdContentCopy } from "react-icons/md";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { FormattedSize } from '../components/formatSize';

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
                    <div className='py-6 px-6 md:px-10 border border-gray-400 bg-white mt-4 rounded-md flex items-center gap-8'>
                        <div className='w-[150px]'>
                            <img
                                src={`/assets/${selectedDocument.file_type.toLowerCase()}.png`}
                                alt={selectedDocument.file_type.toLowerCase()}
                            />
                        </div>
                        <div className='flex-grow'>
                            <div className='flex flex-col gap-2 max-w-[200px]'>
                                <div className='flex gap-5'>
                                    <div className='text-gray-800'>Name:</div>
                                    <div>{selectedDocument.name}</div>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='text-gray-800'>Teacher:</div>
                                    <div>{selectedDocument.user.username}</div>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='text-gray-800'>Course:</div>
                                    <div>{selectedDocument.course.name}</div>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='text-gray-800'>Classes:</div>
                                    <div>
                                        {
                                            selectedDocument.classes.map(cls => cls.class.name).join(', ') || "No Classes"
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='text-gray-800'>File type:</div>
                                    <div>
                                        <div>
                                            {selectedDocument.file_type}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='text-gray-800'>Size:</div>
                                    <div><FormattedSize size={selectedDocument.size} /></div>
                                </div>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <div>
                                    {selectedDocument?.link && (
                                        <div className='flex gap-2'>
                                            <a href={downloadUrl} download={selectedDocument?.name}>
                                                <button className='text-white bg-blue-700 w-fit px-5 py-2 hover:bg-blue-800 rounded-md transition my-4'>
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
