import React from 'react'
import { Link } from 'react-router-dom'
import { FaDollarSign, FaUser } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';

function SideBar() {
    return (
        <>
            <div className='w-full rounded-lg capitalize  bg-[#f9fbfd] px-5 p-3 mt-5'>k - wallet</div>

            <Link to="/kwallet-admin">
                <div
                    className={`flex gap-4 p-4 w-full items-center hover:bg-secondary/25 rounded-lg  hover:cursor-pointer `}>
                    <div className="text-[#66b5a3] flex align-left justify-end items-center"><FaUser size={18} /></div>
                    <div className="capitalize">users</div>
                </div>

            </Link>
            <Link to="/admin-expense">
                <div
                    className={`flex gap-4 p-4 w-full items-center hover:bg-secondary/25 rounded-lg  hover:cursor-pointer `}>
                    <div className="text-[#66b5a3] flex align-left justify-end items-center"><FaDollarSign size={18} /></div>
                    <div className="capitalize">expense</div>
                </div>
            </Link>
        </>

    )
}

export default SideBar