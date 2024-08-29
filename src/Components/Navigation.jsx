import React from 'react'
import { LuLogOut } from 'react-icons/lu'

function Navigation({activeLink="dashboard"}) {
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
    return (
        <div className="w-full px-6 py-3 bg-white flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-3">
                <p>K-Wallet</p>
                {
                    links.map((item) => (
                        <a href={item.url} className={item.name === activeLink ? 'font-bold text-xl' : ''}>{item.text}</a>
                    ))
                }
            </div>
            <div className="flex flex-row items-center gap-3">
                <button className="rounded-md px-3 py-1 text-white font-medium text-lg bg-[#455A64]">
                    <span>+</span>
                    <span>{" "}Record</span>
                </button>
                <div className="flex flex-row gap-1 justify-center items-center">
                    <div className='mr-2 w-10 h-10 rounded-full bg-[#455A64] text-white shadow-lg flex items-center justify-center'>
                        <span>KK</span>
                    </div>
                    <LuLogOut size={20} />
                </div>
            </div>
        </div>
    )
}

export default Navigation