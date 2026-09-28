import React, { useEffect, useState } from 'react'
import { API } from '../../common/api'
import { useNavigate, useParams } from 'react-router-dom'

const EditIssue = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [books, setBooks] = useState([])
    const [members, setMembers] = useState([])

    const [formData, setFormData] = useState({
        bookId: "",
        memberId: "",
        issueDate: "",
        dueDate: "",
        returnDate: "",
        status: "",
        fineAmount: 0
    })

    const [loading, setLoading] = useState(true)


    const getData = async () => {

        try {

            const [issueResponse, bookResponse, memberResponse] =
                await Promise.all([
                    API.get(`/issue/${id}`),
                    API.get("/book"),
                    API.get("/member")
                ])

            const issue = issueResponse.data.data

            setBooks(bookResponse.data.data)
            setMembers(memberResponse.data.data)

            setFormData({
                bookId: issue.bookId,
                memberId: issue.memberId,
                issueDate: issue.issueDate
                    ? issue.issueDate.substring(0, 10)
                    : "",
                dueDate: issue.dueDate
                    ? issue.dueDate.substring(0, 10)
                    : "",
                returnDate: issue.returnDate
                    ? issue.returnDate.substring(0, 10)
                    : "",
                status: issue.status,
                fineAmount: issue.fineAmount
            })

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
    }, [id])


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

            await API.put(`/issue/${id}`, {
                ...formData,
                bookId: Number(formData.bookId),
                memberId: Number(formData.memberId),
                fineAmount: Number(formData.fineAmount)
            })

            alert("Issue Updated Successfully")

            navigate("/issue")

        }
        catch (err) {

            console.log(err)

            alert(
                err.response?.data?.message ||
                "Failed To Update Issue"
            )
        }
    }


    if (loading) {

        return (
            <div className="min-h-screen bg-slate-100 p-10 text-center">
                Loading issue...
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="mx-auto mb-6 max-w-4xl">

                <button
                    onClick={() => navigate("/issue")}
                    className="mb-4 text-sm text-slate-500 hover:text-slate-900"
                >
                    ← Back to Issues
                </button>

                <h1 className="text-3xl font-bold text-slate-900">
                    Edit Issue
                </h1>

            </div>


            <div className="mx-auto max-w-4xl rounded-xl border bg-white shadow-sm">

                <div className="bg-slate-900 px-6 py-5">

                    <h2 className="text-lg font-semibold text-white">
                        Edit Issue Information
                    </h2>

                </div>


                <form
                    onSubmit={submitHandler}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                        {/* Book */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold">
                                Select Book
                            </label>

                            <select
                                name="bookId"
                                value={formData.bookId}
                                onChange={changeHandler}
                                required
                                className="w-full rounded-lg border px-4 py-2.5"
                            >

                                <option value="">
                                    Select Book
                                </option>

                                {books.map((book) => (

                                    <option
                                        key={book.id}
                                        value={book.id}
                                    >
                                        {book.title} -
                                        Available: {book.availableCopies}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Member */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold">
                                Select Member
                            </label>

                            <select
                                name="memberId"
                                value={formData.memberId}
                                onChange={changeHandler}
                                required
                                className="w-full rounded-lg border px-4 py-2.5"
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

                            <label className="mb-2 block text-sm font-semibold">
                                Issue Date
                            </label>

                            <input
                                type="date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={changeHandler}
                                required
                                className="w-full rounded-lg border px-4 py-2.5"
                            />

                        </div>


                        {/* Due Date */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold">
                                Due Date
                            </label>

                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={changeHandler}
                                required
                                className="w-full rounded-lg border px-4 py-2.5"
                            />

                        </div>


                        {/* Return Date */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold">
                                Return Date
                            </label>

                            <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={changeHandler}
                                className="w-full rounded-lg border px-4 py-2.5"
                            />

                        </div>


                        {/* Status */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={changeHandler}
                                className="w-full rounded-lg border px-4 py-2.5"
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

                            <label className="mb-2 block text-sm font-semibold">
                                Fine Amount
                            </label>

                            <input
                                type="number"
                                name="fineAmount"
                                value={formData.fineAmount}
                                onChange={changeHandler}
                                min="0"
                                className="w-full rounded-lg border px-4 py-2.5"
                            />

                        </div>

                    </div>


                    <div className="mt-8 flex justify-end gap-3 border-t pt-6">

                        <button
                            type="button"
                            onClick={() => navigate("/issue")}
                            className="rounded-lg border px-5 py-2.5 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-6 py-2.5 font-semibold text-white"
                        >
                            Update Issue
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditIssue