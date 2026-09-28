import React, { useState } from 'react'
import { API } from '../../common/api'
import { useNavigate } from 'react-router-dom'

const CreateAuthor = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        bio: ""
    })

    const changeHandler = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const submitHandler = async (e) => {

        e.preventDefault()

        try {

            const response = await API.post("/author", formData)

            console.log(response.data)

            setFormData({
                name: "",
                bio: ""
            })

            navigate("/author")

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Header */}

            <div className="mx-auto mb-6 max-w-4xl">

                <button
                    onClick={() => navigate("/author")}
                    className="mb-4 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    ← Back to Authors
                </button>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Create Author
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Create a new library author
                </p>

            </div>


            {/* Form Card */}

            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                {/* Card Header */}

                <div className="border-b border-slate-100 bg-slate-900 px-6 py-5">

                    <h2 className="text-lg font-semibold text-white">
                        Author Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Enter the author details below.
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={submitHandler}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 gap-6">

                        {/* Name */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={changeHandler}
                                placeholder="Enter author name"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* Bio */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Bio
                            </label>

                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={changeHandler}
                                placeholder="Enter author bio"
                                rows="5"
                                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">

                        <button
                            type="button"
                            onClick={() => navigate("/author")}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                        >
                            Create Author
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateAuthor