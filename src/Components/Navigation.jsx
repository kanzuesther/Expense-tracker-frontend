import React from 'react'

function Navigation() {
    return (
        <div className="w-full px-6 py-3 bg-white flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-3">
                <p>Wallet</p>
                <p className="font-bold">Dashboard</p>
                <p>Accounts</p>
                <p>Records</p>
                <p>Analytics</p>
                <p>Investments</p>
                <p>Income</p>
            </div>
            <div className="flex flex-row items-center gap-3">
                <button className="rounded-full px-3 text-white font-medium text-xl bg-[#0077fc]">
                    <span>+</span>
                    <span>Record</span>
                </button>
                <div className="flex flex-row gap-2">
                    <label htmlFor="">Esther N</label>
                    <select name="name" id="name"></select>
                </div>
            </div>
        </div>
    )
}

export default Navigation