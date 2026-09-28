import React, { useState } from 'react'
import { API } from '../../common/api'
import { useNavigate } from 'react-router-dom'

const CreateCategory = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        description: ""
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
            await API.post('/category', formData)

            setFormData({ name: "", description: "" })

            navigate('/category')
        }
        catch (err) {
            console.log(err)
            alert(err.response?.data?.message || 'Failed to create category')
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="mx-auto mb-6 max-w-4xl">

                <button
                    onClick={() => navigate('/category')}
                    className="mb-4 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    ← Back to Categories
                </button>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Create Category
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Create a new library category
                </p>

            </div>

            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 bg-slate-900 px-6 py-5">

                    <h2 className="text-lg font-semibold text-white">
                        Category Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Enter the category details below.
                    </p>

                </div>

                <form onSubmit={submitHandler} className="p-6">

                    <div className="grid grid-cols-1 gap-6">

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={changeHandler}
                                placeholder="Enter category name"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={changeHandler}
                                placeholder="Enter category description"
                                rows="5"
                                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>

                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">

                        <button
                            type="button"
                            onClick={() => navigate('/category')}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                        >
                            Create Category
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateCategory
