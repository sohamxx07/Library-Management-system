import React, { useEffect, useState } from 'react'
import { API } from '../../common/api'
import { useNavigate } from 'react-router-dom'

const IssueList = () => {

    const navigate = useNavigate()

    const [issueData, setIssueData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // Get All Issues
    const getIssue = async () => {
        try {
            setLoading(true)
            setError(false)

            const response = await API.get('/issue')

            setIssueData(response.data.data)

            console.log(response.data.data)
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
        getIssue()
    }, [])


    // Delete Issue
    const deleteHandler = async (id) => {
        try {
            await API.delete(`/issue/${id}`)
            getIssue()
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Issue List
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage issued library books
                    </p>

                </div>

                <button
                    onClick={() => navigate('/issue/create')}
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                >
                    + Create Issue
                </button>

            </div>


            {/* Loading */}

            {loading && (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Loading issues...
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
                        Failed to load issues
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Something went wrong while loading the issue records.
                    </p>

                    <button
                        onClick={getIssue}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
                    >
                        Try Again
                    </button>

                </div>
            )}


            {/* No Data */}

            {!loading && !error && issueData.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-14 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                        📚
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900">
                        No Issues Found
                    </h2>

                    <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                        There are currently no issued books in the library.
                    </p>

                    <button
                        onClick={() => navigate('/issue/create')}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Create First Issue
                    </button>

                </div>
            )}


            {/* Table */}

            {!loading && !error && issueData.length > 0 && (

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1200px] text-left">

                            <thead className="bg-slate-900">

                                <tr>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        ID
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Book
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Book ID
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Member
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Member Code
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Issue Date
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Due Date
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Return Date
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Fine
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {issueData.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="transition hover:bg-slate-50"
                                    >

                                        {/* ID */}

                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-700">
                                                #{item.id}
                                            </span>

                                        </td>


                                        {/* Book */}

                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-900">
                                                {item.bookData?.title}
                                            </span>

                                        </td>


                                        {/* Book ID */}

                                        <td className="px-5 py-4">

                                            <span className="text-sm text-slate-600">
                                                {item.bookData?.id}
                                            </span>

                                        </td>


                                        {/* Member */}

                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-900">
                                                {item.memberData?.name}
                                            </span>

                                        </td>


                                        {/* Member Code */}

                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-800">
                                                {item.memberData?.memberCode}
                                            </span>

                                        </td>


                                        {/* Issue Date */}

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {item.issueDate}
                                        </td>


                                        {/* Due Date */}

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {item.dueDate}
                                        </td>


                                        {/* Return Date */}

                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {item.returnDate || "-"}
                                        </td>


                                        {/* Status */}

                                        <td className="px-5 py-4">

                                            <span
                                                className={`inline-flex min-w-[75px] justify-center rounded-md px-3 py-1.5 text-xs font-semibold ${
                                                    item.status === "Issued"
                                                        ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                                                        : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                                }`}
                                            >
                                                {item.status}
                                            </span>

                                        </td>


                                        {/* Fine */}

                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-800">
                                                ₹{item.fineAmount}
                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td className="px-5 py-4">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/issue/edit/${item.id}`)
                                                    }
                                                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        deleteHandler(item.id)
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

                            Total Issues:{" "}

                            <span className="font-semibold text-slate-700">
                                {issueData.length}
                            </span>

                        </p>

                    </div>

                </div>

            )}

        </div>
    )
}

export default IssueList
