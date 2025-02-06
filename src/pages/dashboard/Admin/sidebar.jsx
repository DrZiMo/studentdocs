import React, { useState, useRef, useEffect } from 'react'
import {
    FaHome,
    FaBook,
    FaBookOpen,
    FaUpload,
    FaBars,
    FaCopy,
    FaUser,
    FaUsers,
    FaChartLine,
} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

// Sidebar link data
const SIDEBAR_LINKS = [
    { name: 'Home', icon: FaHome, href: '', isHome: true },
    { name: 'Activtiy', icon: FaChartLine, href: 'activity' },
    { name: 'User', icon: FaUser, href: 'user' },
    { name: 'Document', icon: FaCopy, href: 'document' },
    { name: 'Faculty', icon: FaUsers, href: 'faculty' },
    { name: 'Class', icon: FaBook, href: 'class' },
    { name: 'Course', icon: FaBookOpen, href: 'course' },
    { name: 'Upload', icon: FaUpload, href: '/document/upload' },
]

const SideBarTeacher = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const sidebarRef = useRef(null)
    const location = useLocation()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Function to check if the link is active
    const isActive = (href) => location.pathname === `/${href}`

    return (
        <>
            {/* Hamburger Menu Button (Mobile Only) */}
            <button
                onClick={toggleSidebar}
                className='fixed top-4 right-4 p-2 text-white rounded-lg md:hidden z-50'
            >
                <FaBars className='w-8 h-8' />
            </button>

            {/* Sidebar */}
            <motion.div
                ref={sidebarRef}
                style={{ position: "fixed", top: "4.5rem", left: 0 }}
                className={`w-full h-screen bg-gray-800 text-white p-4 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:relative`}
                animate={{ width: 240 }}
            >
                {/* Sidebar Content */}
                <div className='flex items-center mb-6'>
                    <h1 className='text-xl font-bold'>Dashboard</h1>
                </div>
                <nav>
                    <ul className='space-y-2'>
                        {SIDEBAR_LINKS.map((item) => (
                            <li key={item.href}>
                                <Link
                                    to={item.href}
                                    className={`flex items-center p-2 rounded transition-all ${isActive(item.href)
                                        ? 'bg-blue-700 text-white'
                                        : 'hover:bg-gray-700'
                                        }`}
                                >
                                    {/* Icon */}
                                    <item.icon className='w-6 h-6' />

                                    {/* Text */}
                                    <AnimatePresence>
                                        <motion.span
                                            className='ml-4 whitespace-nowrap'
                                            initial={{
                                                opacity: 0,
                                                width: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                width: 'auto',
                                            }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    </AnimatePresence>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </motion.div>
        </>
    )
}

export default SideBarTeacher
