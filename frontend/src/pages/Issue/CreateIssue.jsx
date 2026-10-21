import React, { useEffect, useState } from 'react'
import { API } from '../../common/api'
import { useNavigate } from 'react-router-dom'

const CreateIssue = () => {

    const navigate = useNavigate()

    const [books, setBooks] = useState([])
    const [members, setMembers] = useState([])

    const [formData, setFormData] = useState({
        bookId: "",
        memberId: "",
        issueDate: "",
        dueDate: "",
        returnDate: "",
        status: "Issued",
        fineAmount: 0
    })

    const [loading, setLoading] = useState(true)

    // Get Books and Members
    const getData = async () => {
        try {

            const [bookResponse, memberResponse] = await Promise.all([
                API.get("/book"),
                API.get("/member")
            ])

            setBooks(bookResponse.data.data)
            setMembers(memberResponse.data.data)

        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])


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

            const response = await API.post("/issue", {
                ...formData,
                bookId: Number(formData.bookId),
                memberId: Number(formData.memberId),
                fineAmount: Number(formData.fineAmount)
            })

            console.log(response.data)

            alert("Issue Created Successfully")

            navigate("/issue")

        }
        catch (err) {

            console.log(err)

            alert(
                err.response?.data?.message ||
                "Failed To Create Issue"
            )
        }
    }


    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="mx-auto mb-6 max-w-4xl">

                <button
                    onClick={() => navigate("/issue")}
                    className="mb-4 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    ← Back to Issues
                </button>

                <h1 className="text-3xl font-bold text-slate-900">
                    Create Issue
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Issue a book to a library member
                </p>

            </div>


            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 bg-slate-900 px-6 py-5">

                    <h2 className="text-lg font-semibold text-white">
                        Issue Information
                    </h2>

                </div>


                {loading ? (

                    <div className="p-10 text-center text-slate-500">
                        Loading books and members...
                    </div>

                ) : (

                    <form
                        onSubmit={submitHandler}
                        className="p-6"
                    >

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                            {/* Book */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Select Book
                                </label>

                                <select
                                    name="bookId"
                                    value={formData.bookId}
                                    onChange={changeHandler}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                                >

                                    <option value="">
                                        Select Book
                                    </option>

                                    {books.map((book) => (

                                        <option
                                            key={book.id}
                                            value={book.id}
                                            disabled={book.availableCopies <= 0}
                                        >
                                            {book.title} -
                                            Available: {book.availableCopies}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* Member */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Select Member
                                </label>

                                <select
                                    name="memberId"
                                    value={formData.memberId}
                                    onChange={changeHandler}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                                >

                                    <option value="">
                                        Select Member
                                    </option>

                                    {members.map((member) => (

                                        <option
                                            key={member.id}
                                            value={member.id}
                                        >
                                            {member.name} - {member.memberCode}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* Issue Date */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Issue Date
                                </label>

                                <input
                                    type="date"
                                    name="issueDate"
                                    value={formData.issueDate}
                                    onChange={changeHandler}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                                />

                            </div>


                            {/* Due Date */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={changeHandler}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                                />

                            </div>


                            {/* Status */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={changeHandler}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                                >

                                    <option value="Issued">
                                        Issued
                                    </option>

                                    <option value="Returned">
                                        Returned
                                    </option>

                                    <option value="Overdue">
                                        Overdue
                                    </option>

                                </select>

                            </div>


                            {/* Fine */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Fine Amount
                                </label>

                                <input
                                    type="number"
                                    name="fineAmount"
                                    value={formData.fineAmount}
                                    onChange={changeHandler}
                                    min="0"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                                />

                            </div>


                            {/* Return Date */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Return Date
                                </label>

                                <input
                                    type="date"
                                    name="returnDate"
                                    value={formData.returnDate}
                                    onChange={changeHandler}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                                />

                            </div>

                        </div>


                        <div className="mt-8 flex justify-end gap-3 border-t pt-6">

                            <button
                                type="button"
                                onClick={() => navigate("/issue")}
                                className="rounded-lg border px-5 py-2.5 text-sm font-semibold"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white"
                            >
                                Create Issue
                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>
    )
}

export default CreateIssue