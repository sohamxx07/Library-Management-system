import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from '../layout/Layout'

// Issue
import IssueList from '../pages/Issue/IssueList'
import CreateIssue from '../pages/Issue/CreateIssue'
import EditIssue from '../pages/Issue/EditIssue'

// Book
import BookList from '../pages/Book/BookList'
import CreateBook from '../pages/Book/CreateBook'
import EditBook from '../pages/Book/EditBook'

// Member
import MemberList from '../pages/Member/MemberList'
import CreateMember from '../pages/Member/CreateMember'
import EditMember from '../pages/Member/EditMember'

// Author
import AuthorList from '../pages/Author/AuthorList'
import CreateAuthor from '../pages/Author/CreateAuthor'
import EditAuthor from '../pages/Author/EditAuthor'

// Category
import CategoryList from '../pages/Category/CategoryList'
import CreateCategory from '../pages/Category/CreateCategory'
import EditCategory from '../pages/Category/EditCategory'

// Publisher
import PublisherList from '../pages/Publisher/PublisherList'
import CreatePublisher from '../pages/Publisher/CreatePublisher'
import EditPublisher from '../pages/Publisher/EditPublisher'

// Setting
import SettingList from '../pages/Setting/SettingList'
import CreateSetting from '../pages/Setting/CreateSetting'
import EditSetting from '../pages/Setting/EditSetting'

const AppRoutes = () => {
    return (
        <Routes>

            {/* Default Route */}
            <Route
                path="/"
                element={<Navigate to="/issue" replace />}
            />

            {/* Layout */}
            <Route element={<Layout />}>

                {/* Issue */}
                <Route path="/issue" element={<IssueList />} />
                <Route path="/issue/create" element={<CreateIssue />} />
                <Route path="/issue/edit/:id" element={<EditIssue />} />

                {/* Book */}
                <Route path="/book" element={<BookList />} />
                <Route path="/book/create" element={<CreateBook />} />
                <Route path="/book/edit/:id" element={<EditBook />} />

                {/* Member */}
                <Route path="/member" element={<MemberList />} />
                <Route path="/member/create" element={<CreateMember />} />
                <Route path="/member/edit/:id" element={<EditMember />} />

                {/* Author */}
                <Route path="/author" element={<AuthorList />} />
                <Route path="/author/create" element={<CreateAuthor />} />
                <Route path="/author/edit/:id" element={<EditAuthor />} />

                {/* Category */}
                <Route path="/category" element={<CategoryList />} />
                <Route path="/category/create" element={<CreateCategory />} />
                <Route path="/category/edit/:id" element={<EditCategory />} />

                {/* Publisher */}
                <Route path="/publisher" element={<PublisherList />} />
                <Route path="/publisher/create" element={<CreatePublisher />} />
                <Route path="/publisher/edit/:id" element={<EditPublisher />} />

                {/* Setting */}
                <Route path="/setting" element={<SettingList />} />
                <Route path="/setting/create" element={<CreateSetting />} />
                <Route path="/setting/edit/:id" element={<EditSetting />} />

            </Route>

            {/* Unknown Route */}
            <Route
                path="*"
                element={<Navigate to="/issue" replace />}
            />

        </Routes>
    )
}

export default AppRoutes