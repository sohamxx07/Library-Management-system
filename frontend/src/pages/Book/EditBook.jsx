import React, { useEffect, useState } from 'react'
import { API } from '../../common/api'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        isbn: "",
        categoryId: "",
        authorId: "",
        publisherId: "",
        totalCopies: "",
        availableCopies: "",
        shelfNo: ""
    })

    // Get Book Data
    const getBookData = async () => {
        try {

            const response = await API.get(`/book/${id}`)

            setFormData(response.data.data)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBookData()
    }, [id])


    // Change Handler
    const changeHandler = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })

    }


    // Submit Handler
    const submitHandler = async (e) => {

        e.preventDefault()

        try {

            const response = await API.put(`/book/${id}`, formData)

            console.log(response.data)

            navigate("/book")

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
                    onClick={() => navigate("/book")}
                    className="mb-4 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    ← Back to Books
                </button>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Edit Book
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Update the book information
                </p>

            </div>


            {/* Form Card */}

            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                {/* Card Header */}

                <div className="border-b border-slate-100 bg-slate-900 px-6 py-5">

                    <h2 className="text-lg font-semibold text-white">
                        Book Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Update the book details below.
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={submitHandler}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                        {/* Title */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Book Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title || ""}
                                onChange={changeHandler}
                                placeholder="Enter book title"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* ISBN */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                ISBN
                            </label>

                            <input
                                type="text"
                                name="isbn"
                                value={formData.isbn || ""}
                                onChange={changeHandler}
                                placeholder="Enter ISBN"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* Category ID */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Category ID
                            </label>

                            <input
                                type="number"
                                name="categoryId"
                                value={formData.categoryId || ""}
                                onChange={changeHandler}
                                placeholder="Enter category ID"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* Author ID */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Author ID
                            </label>

                            <input
                                type="number"
                                name="authorId"
                                value={formData.authorId || ""}
                                onChange={changeHandler}
                                placeholder="Enter author ID"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* Publisher ID */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Publisher ID
                            </label>

                            <input
                                type="number"
                                name="publisherId"
                                value={formData.publisherId || ""}
                                onChange={changeHandler}
                                placeholder="Enter publisher ID"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* Total Copies */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Total Copies
                            </label>

                            <input
                                type="number"
                                name="totalCopies"
                                value={formData.totalCopies || ""}
                                onChange={changeHandler}
                                placeholder="Enter total copies"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* Available Copies */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Available Copies
                            </label>

                            <input
                                type="number"
                                name="availableCopies"
                                value={formData.availableCopies || ""}
                                onChange={changeHandler}
                                placeholder="Enter available copies"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>


                        {/* Shelf No */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Shelf No
                            </label>

                            <input
                                type="text"
                                name="shelfNo"
                                value={formData.shelfNo || ""}
                                onChange={changeHandler}
                                placeholder="Enter shelf number"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">

                        <button
                            type="button"
                            onClick={() => navigate("/book")}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                        >
                            Update Book
                        </button>

                    </div>

                </form>

            </div>

        </div>

    )
}

export default EditBook