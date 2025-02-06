import React from 'react'
import { Link } from 'react-router-dom'
import PopoverDemo from '../../components/popover'

const DashboardHeader = () => {
    return (
        <div className="header shadow-md bg-blue-700 p-4 px-3 md:px-6 flex justify-between items-center sticky top-0 z-50">
            <div className="logo font-konit text-white text-2xl md:text-3xl">
                StudentDocs
            </div>
            <div className="right-part flex gap-4 items-center">
                <Link to='/studentdocs/'><div className="border-2 border-white text-white py-1 px-5 transition hover:bg-white  rounded-md hover:text-blue-700 cursor-pointer">
                    Home
                </div></Link>
                <div>
                    <PopoverDemo />
                </div>
                <div className="block md:hidden cursor-pointer">
                    <div className='px-5'></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader