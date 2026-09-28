import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    return (
        <aside className="w-64 min-h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col">

            {/* Logo / Brand */}
            <div className="px-6 py-6 border-b border-slate-800">

                <h1 className="text-xl font-bold tracking-wide">
                    Library
                </h1>

                <p className="text-xs text-slate-500 mt-1">
                    Management System
                </p>

            </div>


            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">

                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
                    Management
                </p>

                <div className="flex flex-col gap-1">

                    <NavLink
                        to="/issue"
                        className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        📚 Issue
                    </NavLink>

                    <NavLink
                        to="/book"
                        className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        📖 Book
                    </NavLink>

                    <NavLink
                        to="/member"
                        className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        👤 Member
                    </NavLink>

                    <NavLink
                        to="/author"
                        className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        ✍️ Author
                    </NavLink>

                    <NavLink
                        to="/category"
                        className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        🗂️ Category
                    </NavLink>

                    <NavLink
                        to="/publisher"
                        className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                    >
                        🏢 Publisher
                    </NavLink>

                </div>


                {/* Settings */}
                <div className="mt-8">

                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
                        System
                    </p>

                    <NavLink
                        to="/setting"
                        className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 block"
                    >
                        ⚙️ Setting
                    </NavLink>

                </div>

            </nav>


            {/* Bottom */}
            <div className="px-6 py-4 border-t border-slate-800">

                <p className="text-xs text-slate-500">
                    Library Management
                </p>

                <p className="text-xs text-slate-600 mt-1">
                    Admin Panel
                </p>

            </div>

        </aside>
    )
}

export default Sidebar