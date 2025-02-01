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

const router = createBrowserRouter([
  {
    path: '/studentdocs',
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
    path: '/studentdocs/dashboard/admin',
    element: <DashboardLayoutAdmin />,
    // children: []
  },
  {
    path: '/studentdocs/dashboard/teacher',
    element: <DashboardLayoutTeacher />,
    children: [
      {
        index: true,
        element: <HomeTeacher />
      },
      {
        path: 'document',
        element: <DocumentsTeacher />
      },
    ]
  },
  {
    path: '/studentdocs/upload',
    element: <UploadPage />
  },
  {
    path: 'studentdocs/customer-support',
    element: <CustomerSupport />
  },
  {
    path: '/studentdocs/project-overview',
    element: <ProjectOverview />
  },
  {
    path: '/studentdocs/auth/login',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router