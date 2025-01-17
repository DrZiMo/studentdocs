import React from 'react'
import { Link } from 'react-router-dom'

const Back = () => {
    return (
        <Link to='/studentdocs'>
            <button className='bg-white px-6 py-1 rounded-full hover:bg-gray-200 transition'>
                👈 Back
            </button>
        </Link>
    )
}

export default Back