import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../common/api'

const EditSetting = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [settingData, setSettingData] = useState({
        libraryName: "",
        issueDays: "",
        finePerDay: ""
    })

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)


    // Get Setting By ID

    const getSettingById = async () => {

        try {

            setLoading(true)

            const response = await API.get(`/setting/${id}`)

            const data = response.data.data

            setSettingData({
                libraryName: data.libraryName,
                issueDays: data.issueDays,
                finePerDay: data.finePerDay
            })

        }
        catch (err) {

            console.log(err)

            if (err.response?.data?.message) {
                alert(err.response.data.message)
            }
            else {
                alert("Failed To Fetch Setting")
            }

            navigate("/setting")

        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getSettingById()
    }, [id])


    // Change Handler

    const changeHandler = (e) => {

        const { name, value } = e.target

        setSettingData({
            ...settingData,
            [name]: value
        })
    }


    // Update Setting

    const submitHandler = async (e) => {

        e.preventDefault()

        try {

            setUpdating(true)

            const data = {
                libraryName: settingData.libraryName,
                issueDays: Number(settingData.issueDays),
                finePerDay: Number(settingData.finePerDay)
            }

            await API.put(`/setting/${id}`, data)

            alert("Setting Updated Successfully")

            navigate("/setting")

        }
        catch (err) {

            console.log(err)

            if (err.response?.data?.message) {
                alert(err.response.data.message)
            }
            else {
                alert("Failed To Update Setting")
            }

        }
        finally {
            setUpdating(false)
        }
    }


    if (loading) {

        return (
            <div className="min-h-screen bg-slate-100 p-6">

                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                    <p className="text-sm font-medium text-slate-500">
                        Loading setting...
                    </p>

                </div>

            </div>
        )
    }


    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="mx-auto max-w-2xl">

                {/* Header */}

                <div className="mb-6">

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Edit Setting
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Update library settings
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={submitHandler}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                    {/* Library Name */}

                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Library Name
                        </label>

                        <input
                            type="text"
                            name="libraryName"
                            value={settingData.libraryName}
                            onChange={changeHandler}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        />

                    </div>


                    {/* Issue Days */}

                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Issue Days
                        </label>

                        <input
                            type="number"
                            name="issueDays"
                            value={settingData.issueDays}
                            onChange={changeHandler}
                            min="1"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        />

                    </div>


                    {/* Fine Per Day */}

                    <div className="mb-6">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Fine Per Day
                        </label>

                        <input
                            type="number"
                            name="finePerDay"
                            value={settingData.finePerDay}
                            onChange={changeHandler}
                            min="0"
                            step="0.01"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        />

                    </div>


                    {/* Buttons */}

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={() => navigate("/setting")}
                            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={updating}
                            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {updating ? "Updating..." : "Update Setting"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditSetting