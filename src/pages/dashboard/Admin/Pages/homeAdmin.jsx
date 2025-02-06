import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getDocuments } from '../../../../../redux/slices/documentSlices/documentSlice';
import { getAllClassesFn } from '../../../../../redux/slices/classSlices/classSlice';
import { getAllUsers } from '../../../../../redux/slices/userSlices/allUsersSlice';
import { getAllCourses } from '../../../../../redux/slices/courseSlices/courseSlice';
import { getAllFaculties } from '../../../../../redux/slices/facultySlices/facultySlice';
import { getAllActivitiesFn } from '../../../../../redux/slices/activitySlices/getAllActivities';
import Loading from '../../../../components/loading';

const HomeAdmin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    const userState = useSelector((state) => state.allUsers)
    const documentState = useSelector((state) => state.document);
    const facultyState = useSelector((state) => state.faculty);
    const courseState = useSelector((state) => state.course);
    const classState = useSelector((state) => state.class);
    const activityState = useSelector((state) => state.activities)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getDocuments())
        dispatch(getAllFaculties())
        dispatch(getAllCourses())
        dispatch(getAllClassesFn())
        dispatch(getAllActivitiesFn())
    }, [dispatch]);

    return (
        <div className='mt-4 ml-4 md:ml-0 mr-4 flex flex-col gap-6'>
            <div className='greeting'>
                <h1 className='text-4xl font-semibold text-blue-700'>Welcome {userData.user.username.split(' ')[0]}👋</h1>
            </div>
            <div>
                <h1 className='title border-b border-gray-500 pb-1 mb-4 text-gray-900 font-semibold text-xl'>Overview</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                    <div>
                        <Link to={'user'}>
                            <div className='bg-white hover:bg-gray-300 hover:border hover:border-blue-700 transition shadow-md text-black text-center rounded-md p-5'>
                                <h1 className='text-4xl font-semibold text-blue-700'>{userState.isLoading ? '...' : userState.data?.users?.length > 0 ? userState.data?.users?.length : 0}</h1>
                                <p className='text-lg'>👤 Users</p>
                                <p className='text-sm text-gray-600'>Tap to see all</p>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'document'}>
                            <div className='bg-white hover:bg-gray-300 hover:border hover:border-blue-700 transition shadow-md text-black text-center rounded-md p-5'>
                                <h1 className='text-4xl font-semibold text-blue-700'>{documentState.isLoading ? '...' : documentState.data?.documents?.length > 0 ? documentState.data?.documents?.length : 0}</h1>
                                <p className='text-lg'>📁 Documents</p>
                                <p className='text-sm text-gray-600'>Tap to see all</p>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'faculty'}>
                            <div className='bg-white hover:bg-gray-300 hover:border hover:border-blue-700 transition shadow-md text-black text-center rounded-md p-5'>
                                <h1 className='text-4xl font-semibold text-blue-700'>{facultyState.isLoading ? '...' : facultyState.data?.faculties?.length > 0 ? facultyState.data?.faculties?.length : 0}</h1>
                                <p className='text-lg'>🏢 Faculties</p>
                                <p className='text-sm text-gray-600'>Tap to see all</p>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'course'}>
                            <div className='bg-white hover:bg-gray-300 hover:border hover:border-blue-700 transition shadow-md text-black text-center rounded-md p-5'>
                                <h1 className='text-4xl font-semibold text-blue-700'>{courseState.isLoading ? '...' : courseState.data?.courses?.length > 0 ? courseState.data?.courses?.length : 0}</h1>
                                <p className='text-lg'>📚 Courses</p>
                                <p className='text-sm text-gray-600'>Tap to see all</p>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'class'}>
                            <div className='bg-white hover:bg-gray-300 hover:border hover:border-blue-700 transition shadow-md text-black text-center rounded-md p-5'>
                                <h1 className='text-4xl font-semibold text-blue-700'>{classState.isLoading ? '...' : classState.data?.classes?.length > 0 ? classState.data?.classes?.length : 0}</h1>
                                <p className='text-lg'>🏫 Classes</p>
                                <p className='text-sm text-gray-600'>Tap to see all</p>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'activity'}>
                            <div className='bg-white hover:bg-gray-300 hover:border hover:border-blue-700 transition shadow-md text-black text-center rounded-md p-5'>
                                <h1 className='text-4xl font-semibold text-blue-700'>{activityState.isLoading ? '...' : activityState.data?.activities?.length > 0 ? activityState.data?.activities?.length : 0}</h1>
                                <p className='text-lg'>📊 Activity</p>
                                <p className='text-sm text-gray-600'>Tap to see all</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAdmin