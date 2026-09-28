import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-[#F1F5F9] text-slate-900">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col bg-[#F1F5F9]">
                <Header />

                <main className="flex-1 overflow-x-auto bg-[#F1F5F9]">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout