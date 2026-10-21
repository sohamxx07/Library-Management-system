import React, { useEffect, useState } from 'react'
import { API } from '../../common/api'
import { useNavigate } from 'react-router-dom'

const CreateBook = () => {

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

    const [categoryData, setCategoryData] = useState([])
    const [authorData, setAuthorData] = useState([])
    const [publisherData, setPublisherData] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    // =========================
    // Get Categories
    // =========================

    const getCategory = async () => {

        try {

            const response = await API.get('/category')

            setCategoryData(response.data.data)

        }
        catch (err) {

            console.log(err)

        }

    }


    // =========================
    // Get Authors
    // =========================

    const getAuthor = async () => {

        try {

            const response = await API.get('/author')

            setAuthorData(response.data.data)

        }
        catch (err) {

            console.log(err)

        }

    }


    // =========================
    // Get Publishers
    // =========================

    const getPublisher = async () => {

        try {

            const response = await API.get('/publisher')

            setPublisherData(response.data.data)

        }
        catch (err) {

            console.log(err)

        }

    }


    // =========================
    // Load Dropdown Data
    // =========================

    useEffect(() => {

        getCategory()
        getAuthor()
        getPublisher()

    }, [])


    // =========================
    // Change Handler
    // =========================

    const changeHandler = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })

    }


    // =========================
    // Submit Handler
    // =========================

    const submitHandler = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)
            setError(false)

            const data = {
                ...formData,

                categoryId: Number(formData.categoryId),
                authorId: Number(formData.authorId),
                publisherId: Number(formData.publisherId),
                totalCopies: Number(formData.totalCopies),
                availableCopies: Number(formData.availableCopies)
            }

            console.log("Book Data:", data)

            await API.post('/book', data)

            navigate('/book')

        }
        catch (err) {

            console.log(err)

            setError(true)

        }
        finally {

            setLoading(false)

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
                    Create Book
                </h1>


                <p className="mt-1 text-sm text-slate-500">
                    Add a new book to the library
                </p>

            </div>



            {/* Error */}

            {error && (

                <div className="mx-auto mb-5 max-w-4xl rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-600">

                    Failed to create book. Please check the details and try again.

                </div>

            )}



            {/* Form Card */}

            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">


                {/* Card Header */}

                <div className="border-b border-slate-100 bg-slate-900 px-6 py-5">

                    <h2 className="text-lg font-semibold text-white">
                        Book Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Enter the book details below.
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
                                value={formData.title}
                                onChange={changeHandler}
                                placeholder="Enter book title"
                                required
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
                                value={formData.isbn}
                                onChange={changeHandler}
                                placeholder="Enter ISBN"
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />

                        </div>



                        {/* Category */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Category
                            </label>

                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={changeHandler}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categoryData.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.id} - {item.name}
                                    </option>

                                ))}

                            </select>

                        </div>



                        {/* Author */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Author
                            </label>

                            <select
                                name="authorId"
                                value={formData.authorId}
                                onChange={changeHandler}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            >

                                <option value="">
                                    Select Author
                                </option>

                                {authorData.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.id} - {item.name}
                                    </option>

                                ))}

                            </select>

                        </div>



                        {/* Publisher */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Publisher
                            </label>

                            <select
                                name="publisherId"
                                value={formData.publisherId}
                                onChange={changeHandler}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            >

                                <option value="">
                                    Select Publisher
                                </option>

                                {publisherData.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.id} - {item.name}
                                    </option>

                                ))}

                            </select>

                        </div>



                        {/* Total Copies */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Total Copies
                            </label>

                            <input
                                type="number"
                                name="totalCopies"
                                value={formData.totalCopies}
                                onChange={changeHandler}
                                placeholder="Enter total copies"
                                min="1"
                                required
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
                                value={formData.availableCopies}
                                onChange={changeHandler}
                                placeholder="Enter available copies"
                                min="0"
                                required
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
                                value={formData.shelfNo}
                                onChange={changeHandler}
                                placeholder="Enter shelf number"
                                required
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
                            disabled={loading}
                            className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? "Creating..." : "Create Book"}

                        </button>

                    </div>


                </form>

            </div>

        </div>

    )

}

export default CreateBook