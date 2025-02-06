import { configureStore } from '@reduxjs/toolkit'
import { sideBarSlice } from './slices/sideBarSlice'
import { facultySlice } from './slices/facultySlices/facultySlice'
import { loginSlice } from './slices/auth/loginSlice'
import { documentSlice } from './slices/documentSlices/documentSlice'
import { getSingleDocumentSlice } from './slices/documentSlices/getSingleDocumentSlice'
import { uploadDocumentSlice } from './slices/documentSlices/uploadDocumentSlice'
import { courseSlice } from './slices/courseSlices/courseSlice'
import { getSingleClassSlice } from './slices/classSlices/getSingleClassSlice'
import { deleteClassSlice } from './slices/classSlices/deleteClassSlice'
import { updateDocumentSlice } from './slices/documentSlices/updateDocumentSlice'
import { deleteDocumentSlice } from './slices/documentSlices/deleteDocumentSlice'
import { deleteUserSlice } from './slices/userSlices/deleteUserSlice'
import { updateClassSlice } from './slices/classSlices/updateClassSlice'
import { classSlice } from './slices/classSlices/classSlice'
import { CreateCLassSLice } from './slices/classSlices/createClassSlice'
import { updateCourseSlice } from './slices/courseSlices/updateCourseSlice'
import { getSingleCourseSlice } from './slices/courseSlices/getSingleCourse'
import { deleteCourseSlice } from './slices/courseSlices/deleteCourseSlice'
import { createCourseSlice } from './slices/courseSlices/createCourseSlice'
import { allUsersSlice } from './slices/userSlices/allUsersSlice'
import { updateFacultySlice } from './slices/facultySlices/updateFacultySlice'
import { deleteFacultySlice } from './slices/facultySlices/deleteFacultySlice'
import { createFacultySlice } from './slices/facultySlices/createFacultySlice'
import { getSingleUserSlice } from './slices/userSlices/getSingleUserSlice'
import { updateUserSlice } from './slices/userSlices/updateUserSlice'
import { createUserSlice } from './slices/userSlices/createUserSlice'
import { getAllActivities } from './slices/activitySlices/getActivityByUserSlice'
import { getActivityByUser } from './slices/activitySlices/getAllActivitiesSlice'

const store = configureStore({
    reducer: {
        sideBar: sideBarSlice.reducer,
        faculty: facultySlice.reducer,
        newFaculty: createFacultySlice.reducer,
        updateFaculty: updateFacultySlice.reducer,
        deleteFaculty: deleteFacultySlice.reducer,
        course: courseSlice.reducer,
        singleCourse: getSingleCourseSlice.reducer,
        newCourse: createCourseSlice.reducer,
        updateCourse: updateCourseSlice.reducer,
        deleteCourse: deleteCourseSlice.reducer,
        class: classSlice.reducer,
        singleClass: getSingleClassSlice.reducer,
        newClass: CreateCLassSLice.reducer,
        updateClass: updateClassSlice.reducer,
        deleteClass: deleteClassSlice.reducer,
        document: documentSlice.reducer,
        singleDocument: getSingleDocumentSlice.reducer,
        uploadDocument: uploadDocumentSlice.reducer,
        updateDocument: updateDocumentSlice.reducer,
        deleteDocument: deleteDocumentSlice.reducer,
        user: loginSlice.reducer,
        allUsers: allUsersSlice.reducer,
        singleUser: getSingleUserSlice.reducer,
        newUser: createUserSlice.reducer,
        updateUser: updateUserSlice.reducer,
        deleteUser: deleteUserSlice.reducer,
        activities: getAllActivities.reducer,
        singleActivity: getActivityByUser.reducer,
    },
})

export default store
