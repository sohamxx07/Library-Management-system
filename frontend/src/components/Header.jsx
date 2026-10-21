import React from 'react'

const SearchIcon = () => (
    <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
    </svg>
)

const BellIcon = () => (
    <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
)

const BookIcon = () => (
    <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
)

const ChevronDownIcon = () => (
    <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
)

const Header = () => {
    return (
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Library Branding */}
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                        <BookIcon />
                    </div>

                    <div className="min-w-0">
                        <h1 className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-base">
                            Library Management System
                        </h1>

                        <p className="hidden text-[11px] font-medium text-slate-500 sm:block">
                            Manage your library efficiently
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-4">

                    {/* Search */}
                    <div className="hidden md:flex">
                        <div className="flex h-9 w-64 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 transition-all focus-within:border-slate-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-100">
                            <SearchIcon />

                            <input
                                type="text"
                                placeholder="Search books, members..."
                                className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                            />

                            <span className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:inline-block">
                                Ctrl K
                            </span>
                        </div>
                    </div>

                    {/* Notifications */}
                    <button
                        type="button"
                        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Notifications"
                    >
                        <BellIcon />

                        {/* Notification dot */}
                        <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" />
                    </button>

                    {/* Divider */}
                    <div className="hidden h-7 w-px bg-slate-200 sm:block" />

                    {/* Admin Profile */}
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition hover:bg-slate-50"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm">
                            A
                        </div>

                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-semibold leading-4 text-slate-900">
                                Admin
                            </p>

                            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                                Administrator
                            </p>
                        </div>

                        <span className="hidden text-slate-400 sm:block">
                            <ChevronDownIcon />
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
