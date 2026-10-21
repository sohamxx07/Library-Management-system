import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../common/api'

const BookList = () => {

    const navigate = useNavigate()

    const [bookData, setBookData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // Get All Books
    const getBook = async () => {
        try {
            setLoading(true)
            setError(false)

            const response = await API.get("/book")

            setBookData(response.data.data)
        }
        catch (err) {
            console.log(err)
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBook()
    }, [])

    // Delete Book
    const deleteHandler = async (id) => {
        try {
            await API.delete(`/book/${id}`)
            getBook()
        }
        catch (err) {
            console.log(err)

            alert(err.response.data.message)
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Book List
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage library books
                    </p>

                </div>

                <button
                    onClick={() => navigate('/book/create')}
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                >
                    + Create Book
                </button>

            </div>


            {/* Loading */}

            {loading && (

                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Loading books...
                    </p>

                </div>

            )}


            {/* Error */}

            {!loading && error && (

                <div className="rounded-xl border border-red-100 bg-white p-12 text-center shadow-sm">

                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                        !
                    </div>

                    <h2 className="font-semibold text-slate-900">
                        Failed to load books
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Something went wrong while loading the book records.
                    </p>

                    <button
                        onClick={getBook}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* No Data */}

            {!loading && !error && bookData.length === 0 && (

                <div className="rounded-xl border border-slate-200 bg-white p-14 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                        📚
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900">
                        No Books Found
                    </h2>

                    <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                        There are currently no books in the library.
                    </p>

                    <button
                        onClick={() => navigate('/book/create')}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Create First Book
                    </button>

                </div>

            )}


            {/* Table */}

            {!loading && !error && bookData.length > 0 && (

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1200px] text-left">

                            <thead className="bg-slate-900">

                                <tr>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        ID
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Title
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        ISBN
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Category
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Author
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Publisher
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Total Copies
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Available Copies
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Shelf No
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {bookData.map((items) => (

                                    <tr
                                        key={items.id}
                                        className="transition hover:bg-slate-50"
                                    >

                                        {/* ID */}

                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-700">
                                                #{items.id}
                                            </span>

                                        </td>


                                        {/* Title */}

                                        <td className="px-5 py-4">

                                            <div className="font-semibold text-slate-900">
                                                {items.title}
                                            </div>

                                        </td>


                                        {/* ISBN */}

                                        <td className="px-5 py-4">

                                            <span className="text-sm text-slate-600">
                                                {items.isbn}
                                            </span>

                                        </td>


                                        {/* Category */}

                                        <td className="px-5 py-4">

                                            <div className="font-medium text-slate-800">
                                                {items.categoryData?.name}
                                            </div>

                                            <div className="mt-0.5 text-xs text-slate-400">
                                                Category ID: {items.categoryId}
                                            </div>

                                        </td>


                                        {/* Author */}

                                        <td className="px-5 py-4">

                                            <div className="font-medium text-slate-800">
                                                {items.authorData?.name}
                                            </div>

                                            <div className="mt-0.5 text-xs text-slate-400">
                                                Author ID: {items.authorId}
                                            </div>

                                        </td>


                                        {/* Publisher */}

                                        <td className="px-5 py-4">

                                            <div className="font-medium text-slate-800">
                                                {items.publisherData?.name}
                                            </div>

                                            <div className="mt-0.5 text-xs text-slate-400">
                                                Publisher ID: {items.publisherId}
                                            </div>

                                        </td>


                                        {/* Total Copies */}

                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-700">
                                                {items.totalCopies}
                                            </span>

                                        </td>


                                        {/* Available Copies */}

                                        <td className="px-5 py-4">

                                            <span
                                                className={`inline-flex min-w-[40px] justify-center rounded-md px-3 py-1.5 text-xs font-semibold ${items.availableCopies > 0
                                                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                                    : "bg-red-50 text-red-700 ring-1 ring-red-200"
                                                    }`}
                                            >
                                                {items.availableCopies}
                                            </span>

                                        </td>


                                        {/* Shelf */}

                                        <td className="px-5 py-4">

                                            <span className="text-sm text-slate-600">
                                                {items.shelfNo}
                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td className="px-5 py-4">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/book/edit/${items.id}`)
                                                    }
                                                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteHandler(items.id)
                                                    }
                                                    className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {/* Table Footer */}

                    <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">

                        <p className="text-xs text-slate-500">

                            Total Books:{" "}

                            <span className="font-semibold text-slate-700">
                                {bookData.length}
                            </span>

                        </p>

                    </div>

                </div>

            )}

        </div>
    )
}

export default BookList

