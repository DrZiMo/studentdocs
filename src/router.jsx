import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/mainPage'
import UploadPage from './pages/uploadPage'
import NotFound from './pages/NotFound'
import ProjectOverview from './pages/projectOverview'
import CustomerSupport from './pages/customerSupport'
import MainSection from './components/main-section'
import SinglePost from './pages/SinglePost'
import LoginPage from './pages/auth/loginPage'
import DashboardLayoutAdmin from './pages/dashboard/layout/dashboardLayout'
import DashboardLayoutTeacher from './pages/dashboard/layout/dashboardLayoutTeacher'
import HomeTeacher from './pages/dashboard/Teacher/pages/home'
import DocumentsTeacher from './pages/dashboard/Teacher/pages/documents'
import ClassTeacher from './pages/dashboard/Teacher/pages/class'
import CourseTeacher from './pages/dashboard/Teacher/pages/course'
import DocumentsAdmin from './pages/dashboard/Admin/Pages/documents'
import HomeAdmin from './pages/dashboard/Admin/Pages/homeAdmin'
import FacultiesAdmin from './pages/dashboard/Admin/Pages/faculty'
import UsersAdmin from './pages/dashboard/Admin/Pages/user'
import ActivityAdmin from './pages/dashboard/Admin/Pages/activity'
import ActivityTeacher from './pages/dashboard/Teacher/pages/activity'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <MainSection />
      },
      {
        path: 'detail/post/:id',
        element: <SinglePost />
      }
    ]
  },
  {
    path: '/dashboard/admin',
    element: <DashboardLayoutAdmin />,
    children: [
      {
        index: true,
        element: <HomeAdmin />
      },
      {
        path: 'user',
        element: <UsersAdmin />
      },
      {
        path: 'activity',
        element: <ActivityAdmin />
      },
      {
        path: 'document',
        element: <DocumentsAdmin />
      },
      {
        path: 'faculty',
        element: <FacultiesAdmin />
      },
      {
        path: 'class',
        element: <ClassTeacher />
      },
      {
        path: 'course',
        element: <CourseTeacher />
      }
    ]
  },

  // Teacher Dashboard
  {
    path: '/dashboard/teacher',
    element: <DashboardLayoutTeacher />,
    children: [
      {
        index: true,
        element: <HomeTeacher />
      },
      {
        path: 'activity',
        element: <ActivityTeacher />
      },
      {
        path: 'document',
        element: <DocumentsTeacher />
      },
      {
        path: 'class',
        element: <ClassTeacher />
      },
      {
        path: 'course',
        element: <CourseTeacher />
      }
    ]
  },
  {
    path: '/document/upload',
    element: <UploadPage />
  },
  {
    path: '/customer-support',
    element: <CustomerSupport />
  },
  {
    path: '/project-overview',
    element: <ProjectOverview />
  },
  {
    path: '/auth/login',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router