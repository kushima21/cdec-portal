import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FaPlus, FaEllipsisV, FaSearch } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalColleges from'../Modal/Modal_Colleges';


export default function Colleges() {
    const [searchQuery, setSearchQuery] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const colleges = [
        {
            id: 1,
            name: "College of Education",
            code: "CED",
            dean: { name: "Lydie Paderanga", email: "lydiepaderanga@ckcm.edu.ph" },
            assistant: { name: "Everose Toylo", email: "toylo.everose@ckcm.edu.ph" },
            category: "Education",
            color: "bg-blue-100 text-blue-800"
        },

    ];

    const AddCollegeIcon = () => <FaPlus className="text-lg" />;

    return (
        <AdminLayout>
            <div className="flex flex-col h-full">

                {/* Header Section */}
                <div className="pt-[3%] bg-white p-6">
                    {/* Breadcrumbs */}
                    <div className="flex items-center py-2 gap-2 text-sm">
                        <span className="font-bold text-gray-400">Admin</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">Manage</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">CDEC</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-orange-500">Colleges</span>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h2 className="text-4xl font-black text-gray-800 tracking-tight">Colleges</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Manage and view all academic colleges in the institution.
                            </p>
                        </div>

                        {/* Search & Actions */}
                        <div className="flex gap-3 items-center">
                            <div className="relative w-[300px]">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search colleges..."
                                    className="w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm"
                                />
                            </div>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
                            >
                                <FiRefreshCw className={`text-lg ${searchQuery ? 'animate-spin' : ''}`} />
                            </button>
                            <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-bold">
                                <AddCollegeIcon />
                                <span>Add College</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="flex-1 mt-4 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto overflow-y-auto bg-white">
                         <table className='w-full bg-white text-left'>
                            {/* Table Head */}
                            <thead className='bg-white sticky top-0 z-200'>
                                <tr className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>NAME</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>Dean</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>Assistant</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>Department</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-100">
                                {colleges.map((college) => (
                                    <tr key={college.id} className="group hover:bg-gray-50 transition-colors">
                                        {/* College Name & Code */}
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-800">{college.name}</span>
                                                <span className="text-sm text-gray-400">{college.code}</span>
                                            </div>
                                        </td>

                                        {/* Dean */}
                                        <td className="p-4">
                                            {college.dean.name && (
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">{college.dean.name}</span>
                                                    <span className="text-sm text-gray-400">{college.dean.email}</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Assistant */}
                                        <td className="p-4">
                                            {college.assistant.name && (
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">{college.assistant.name}</span>
                                                    <span className="text-sm text-gray-400">{college.assistant.email}</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Category Badge */}
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${college.color}`}>
                                                {college.category}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4 text-right">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-orange-600">
                                                <FaEllipsisV />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-start p-4">
                        <span className="text-sm text-gray-500">
                            Showing 1 to {colleges.length} of {colleges.length} results
                        </span>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ModalColleges setIsModalOpen={setIsModalOpen} />
            )}
        </AdminLayout>
    );
}