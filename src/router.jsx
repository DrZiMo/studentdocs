import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/mainPage'
import UploadPage from './pages/uploadPage'
import NotFound from './pages/NotFound'
import ProjectOverview from './pages/projectOverview'

const router = createBrowserRouter([
  {
    path: '/studentdocs',
    element: <MainPage />
  },
  {
    path: '/studentdocs/upload',
    element: <UploadPage />
  },
  {
    path: '/studentdocs/project-overview',
    element: <ProjectOverview />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router