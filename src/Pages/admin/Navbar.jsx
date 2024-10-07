import React from 'react'
import { FaBell } from 'react-icons/fa';
import profile from '../../assets/female.png'


function Navbar() {
    return (
        <div className='items-center mt-2 px-1 py-2 flex self-end '>
            <p> <FaBell /></p>
            <img src={profile} className='mx-2 w-8 h-8 rounded-full' />
            <p>Esther.K</p>
        </div>
    )
}

export default Navbar