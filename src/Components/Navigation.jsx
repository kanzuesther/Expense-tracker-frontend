import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';
import { Drawer } from 'flowbite-react';

import { useState } from 'react';

function Navigation({ activeLink = "dashboard" }) {
    const links = [
        {
            id: 1,
            name: "dashboard",
            text: "Dashboard",
            url: "/dashboard"
        },
        {
            id: 2,
            name: "records",
            text: "Records",
            url: "/records"
        },
        {
            id: 3,
            name: "cash-reserves",
            text: "Cash Reserves",
            url: "/cash-reserves"
        },
        {
            id: 4,
            name: "budgets",
            text: "Budgets",
            url: "/budgets"
        },
        {
            id: 5,
            name: "reminders",
            text: "Reminders",
            url: "/reminders"
        }
    ]

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    return (
        <div className="w-full px-3 md:px-6 xl:px-[80px] py-2 md:py-3 bg-white flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-3">
                <button className='md:hidden' onClick={() => setDrawerIsOpen(true)}>
                    <FaBars />
                </button>
                <p>K-Wallet</p>
                {
                    links.map((item, index) => (
                        <a key={index} href={item.url} className={`hidden md:block ${item.name === activeLink ? 'font-bold text-xl' : ''}`}>{item.text}</a>
                    ))
                }
            </div>
            <div className="flex flex-row items-center gap-3">
                <button className="rounded-md px-3 py-1 text-white font-medium text-lg bg-[#455A64] hidden md:block">
                    <span>+</span>
                    <span>{" "}Record</span>
                </button>
                <div className="flex flex-row gap-1 justify-center items-center">
                    <div className='mr-2 w-10 h-10 rounded-full bg-[#455A64] text-white shadow-lg flex items-center justify-center'>
                        <span>KK</span>
                    </div>
                    <Link to="/login">
                        <LuLogOut size={20} />
                    </Link>
                </div>
            </div>

            <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
                <Drawer.Header title="Menu" titleIcon={() => <></>} />
                <Drawer.Items>
                    <div className='w-full flex flex-col items-center'>
                        {
                            links.map((item, index) => (
                                <a key={index} href={item.url} className={`w-full text-center py-2 rounded-md md:block ${item.name === activeLink ? 'bg-teal-50' : ''}`}>{item.text}</a>
                            ))
                        }
                    </div>
                </Drawer.Items>
            </Drawer>
        </div>
    )
}

export default Navigation