import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../common/api'

const PublisherList = () => {

    const navigate = useNavigate()

    const [publisherData, setPublisherData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getPublisher = async () => {
        try {
            setLoading(true)
            setError(false)

            const response = await API.get("/publisher")

            setPublisherData(response.data.data)
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
        getPublisher()
    }, [])

    // Delete Publisher
    const deleteHandler = async (id) => {
        try {
            await API.delete(`/publisher/${id}`)

            // Refresh publisher list after successful delete
            getPublisher()
        }
        catch (err) {
            console.log(err)

            // If publisher is used by a book, backend returns 400
            if (err.response?.status === 400) {
                alert(err.response.data.message)
            }
            else {
                alert("Failed to delete publisher")
            }
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Publisher List
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage library publishers
                    </p>
                </div>

                <button
                    onClick={() => navigate('/publisher/create')}
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                >
                    + Create Publisher
                </button>

            </div>


            {loading && (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Loading publishers...
                    </p>
                </div>
            )}


            {!loading && error && (
                <div className="rounded-xl border border-red-100 bg-white p-12 text-center shadow-sm">

                    <h2 className="font-semibold text-slate-900">
                        Failed to load publishers
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Something went wrong while loading publishers.
                    </p>

                    <button
                        onClick={getPublisher}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
                    >
                        Try Again
                    </button>

                </div>
            )}


            {!loading && !error && publisherData.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-14 text-center shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                        No Publishers Found
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        There are currently no publishers.
                    </p>

                    <button
                        onClick={() => navigate('/publisher/create')}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Create First Publisher
                    </button>

                </div>
            )}


            {!loading && !error && publisherData.length > 0 && (

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[900px] text-left">

                            <thead className="bg-slate-900">

                                <tr>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        ID
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Name
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Address
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Phone
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {publisherData.map((items) => (

                                    <tr
                                        key={items.id}
                                        className="transition hover:bg-slate-50"
                                    >

                                        <td className="px-5 py-4">
                                            <span className="font-semibold text-slate-700">
                                                #{items.id}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="font-semibold text-slate-900">
                                                {items.name}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {items.address}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {items.phone}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {items.email}
                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/publisher/edit/${items.id}`)
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

                    <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">

                        <p className="text-xs text-slate-500">
                            Total Publishers:{" "}
                            <span className="font-semibold text-slate-700">
                                {publisherData.length}
                            </span>
                        </p>

                    </div>

                </div>

            )}

        </div>
    )
}

export default PublisherList