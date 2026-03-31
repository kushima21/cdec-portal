import { Link } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';
import {
    FaSearch,
    FaUserPlus,
    FaEllipsisV,
    FaChevronLeft,
    FaChevronRight,
    FaTimes
} from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

import AdminLayout from '../Layouts/AdminLayout';
import ModalUser from '../Modal/Modal_User';

export default function User({ users }) {
    // ================= STATE =================
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    const [formData, setFormData] = useState({
        firstname: '',
        prefix: '',
        middlename: '',
        lastname: '',
        email: '',
        username: '',
    });

    // ================= SEARCH =================
    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;

        const query = searchQuery.toLowerCase();
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
        );
    }, [searchQuery, users]);
    

    // ================= UI =================
    return (
        <AdminLayout>

            {/* ================= MODAL ================= */}
            <ModalUser
                isModalOpen={isModalOpen || isEditOpen}
                setIsModalOpen={(val) => {
                    setIsModalOpen(val);
                    setIsEditOpen(val);
                    if (!val) setSelectedUser(null);
                }}
                selectedUser={selectedUser}
            />

            <div className="flex flex-col h-full bg-gray-50 relative">

                {/* ================= HEADER ================= */}
                <div className="pt-[3%] bg-white p-6 shadow-sm">

                    {/* Breadcrumb */}
                    <div className="flex items-center py-2 gap-2 text-sm">
                        <span className="font-bold text-gray-400">Admin</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">Manage</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">CDEC</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-orange-500">Users</span>
                    </div>

                    {/* Title + Actions */}
                    <div className="flex justify-between items-end mt-4">

                        {/* Title */}
                        <div>
                            <h2 className="text-4xl font-black text-gray-800 tracking-tight">
                                Users
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Manage user accounts, roles, and system access permissions.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 items-center">

                            {/* Search */}
                            <div className="relative w-[300px]">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm"
                                />
                            </div>

                            {/* Reset */}
                            <button
                                onClick={() => setSearchQuery('')}
                                title="Reset Search"
                                className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
                            >
                                <FiRefreshCw className={`text-lg ${searchQuery ? 'animate-spin' : ''}`} />
                            </button>

                            {/* Add User */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-bold"
                            >
                                <FaUserPlus className="text-lg" />
                                <span>Add User</span>
                            </button>

                        </div>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* Scroll */}
                         <div className="overflow-auto max-h-[500px]">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-white z-10">
                                <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                    <th className="px-6 py-4 w-10">
                                        <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                    </th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Username</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Roles</th>
                                    <th className="px-6 py-4">Last Sign In</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                        {/* Checkbox */}
                                        <td className="px-6 py-4">
                                            <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                        </td>

                                        {/* User Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                                                    <img
                                                        src={user.profile_picture || '/system-images/cdec-logo.png'}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-700 text-sm leading-tight">
                                                        {user.prefix} {user.name}
                                                    </span>
                                                    <span className="text-xs text-blue-500 hover:underline cursor-pointer">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Username */}
                                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">{user.username}</td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                                    user.status === 'Active'
                                                        ? 'bg-green-50 text-green-600 border-green-100'
                                                        : 'bg-orange-50 text-orange-600 border-orange-100'
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>

                                        {/* Roles */}
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                {user.roles.map((role, idx) => (
                                                    <span key={idx} className="w-2.5 h-2.5 rounded-full bg-blue-500" title={role} />
                                                ))}
                                            </div>
                                        </td>

                                        {/* Last Sign In */}
                                        <td className="px-6 py-4 text-sm text-gray-500">{user.lastSignIn}</td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
                                            >
                                                <FaEllipsisV />
                                            </button>

                                            {openMenuId === user.id && (
                                                <div className="absolute right-10 mr-2 top-1/2 -translate-y-1/2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsModalOpen(true);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                        {/* ================= PAGINATION ================= */}
                        <div className="px-6 py-4 bg-white border-t border-gray-50 flex justify-between items-center text-xs">

                            <div className="text-gray-500 font-medium">
                                Showing <span className="font-bold">1 to 10</span> of <span className="font-bold">4466</span> results
                            </div>

                            <div className="flex items-center gap-1">

                                <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50">
                                    <FaChevronLeft className="text-[10px]" />
                                </button>

                                <button className="px-3 py-1.5 bg-orange-50 text-orange-600 border border-orange-200 font-bold rounded-lg">
                                    1
                                </button>

                                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                    <button
                                        key={n}
                                        className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 border border-transparent rounded-lg"
                                    >
                                        {n}
                                    </button>
                                ))}

                                <span className="px-2 text-gray-400">...</span>

                                <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 border border-transparent rounded-lg">
                                    446
                                </button>

                                <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 border border-transparent rounded-lg">
                                    447
                                </button>

                                <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50">
                                    <FaChevronRight className="text-[10px]" />
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}