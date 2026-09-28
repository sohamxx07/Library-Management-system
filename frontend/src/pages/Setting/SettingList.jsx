import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../common/api'

const SettingList = () => {

    const navigate = useNavigate()

    const [settingData, setSettingData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getSetting = async () => {
        try {

            setLoading(true)
            setError(false)

            const response = await API.get("/setting")

            setSettingData(response.data.data)

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
        getSetting()
    }, [])


    const deleteHandler = async (id) => {
        try {

            await API.delete(`/setting/${id}`)

            alert("Setting Deleted Successfully")

            getSetting()

        }
        catch (err) {
            console.log(err)

            if (err.response?.data?.message) {
                alert(err.response.data.message)
            }
            else {
                alert("Failed To Delete Setting")
            }
        }
    }


    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Setting List
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage library settings
                    </p>

                </div>

                <button
                    onClick={() => navigate("/setting/create")}
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                >
                    + Create Setting
                </button>

            </div>


            {/* Loading */}

            {loading && (

                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Loading settings...
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
                        Failed to load settings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Something went wrong while loading settings.
                    </p>

                    <button
                        onClick={getSetting}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* No Data */}

            {!loading && !error && settingData.length === 0 && (

                <div className="rounded-xl border border-slate-200 bg-white p-14 text-center shadow-sm">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                        ⚙️
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900">
                        No Settings Found
                    </h2>

                    <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                        There are currently no library settings.
                    </p>

                    <button
                        onClick={() => navigate("/setting/create")}
                        className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Create First Setting
                    </button>

                </div>

            )}


            {/* Table */}

            {!loading && !error && settingData.length > 0 && (

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[800px] text-left">

                            <thead className="bg-slate-900">

                                <tr>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        ID
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Library Name
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Issue Days
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Fine Per Day
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-300">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {settingData.map((items) => (

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
                                                {items.libraryName}
                                            </span>

                                        </td>


                                        <td className="px-5 py-4">

                                            <span className="text-sm text-slate-600">
                                                {items.issueDays} Days
                                            </span>

                                        </td>


                                        <td className="px-5 py-4">

                                            <span className="font-semibold text-slate-800">
                                                ₹{items.finePerDay}
                                            </span>

                                        </td>


                                        <td className="px-5 py-4">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/setting/edit/${items.id}`)
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


                    {/* Footer */}

                    <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">

                        <p className="text-xs text-slate-500">

                            Total Settings:{" "}

                            <span className="font-semibold text-slate-700">
                                {settingData.length}
                            </span>

                        </p>

                    </div>

                </div>

            )}

        </div>
    )
}

export default SettingList