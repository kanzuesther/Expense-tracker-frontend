import React from 'react'
import Sidebar from './sidebar'
import Navbar from './Navbar'
function AdminLayout({children}) {
    return (
        <div className='flex w-screen'>
            <aside className='w-96 bg-white h-screen hidden md:block'>
                <Sidebar />
            </aside>

            <div className='flex flex-col p-1 bg-tetiary w-full h-screen overflow-auto'>
                <div className=''><Navbar /></div>
                <main className='w-full h-screen overflow-scroll p-4'> {children} </main>
            </div>
        </div>
    )
}

export default AdminLayout