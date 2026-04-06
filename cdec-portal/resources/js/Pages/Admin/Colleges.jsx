import { useState } from 'react';
import { FaPlus, FaEllipsisV, FaSearch } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalColleges from '../Modal/Modal_Colleges';

export default function Colleges({ users, colleges }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ safety (para di mo crash)
    const safeColleges = colleges || [];

    const AddCollegeIcon = () => <FaPlus className="text-lg" />;

    // ✅ search filter
    const filteredColleges = safeColleges.filter((college) =>
        (college.college_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (college.abbreviation || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (college.associate_dean || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="flex flex-col h-full">

                {/* Header */}
                <div className="pt-[3%] bg-white p-6">
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

                        <div className="flex gap-3 items-center">
                            {/* SEARCH */}
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

                            {/* RESET */}
                            <button
                                onClick={() => setSearchQuery('')}
                                className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
                            >
                                <FiRefreshCw className={`text-lg ${searchQuery ? 'animate-spin' : ''}`} />
                            </button>

                            {/* ADD */}
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-bold"
                            >
                                <AddCollegeIcon />
                                <span>Add College</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="flex-1 mt-4 overflow-hidden flex flex-col">
                    <div className="overflow-x-auto overflow-y-auto bg-white">
                        <table className='w-full bg-white text-left'>

                            {/* HEAD */}
                            <thead className='bg-white sticky top-0 z-200'>
                                <tr className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                    <th className='p-4 text-xs font-bold text-gray-500'>NAME</th>
                                    <th className='p-4 text-xs font-bold text-gray-500'>Dean</th>
                                    <th className='p-4 text-xs font-bold text-gray-500'>Status</th>
                                    <th className='p-4 text-xs font-bold text-gray-500'>Created At</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody className="divide-y divide-gray-100">
                                {filteredColleges.length > 0 ? (
                                    filteredColleges.map((college) => (
                                        <tr key={college.id} className="hover:bg-gray-50">

                                            {/* NAME */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {college.college_logo && (
                                                        <img
                                                            src={`/${college.college_logo}`}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-800">
                                                            {college.college_name}
                                                        </span>
                                                        <span className="text-sm text-gray-400">
                                                            {college.abbreviation}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* DEAN */}
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">
                                                        {college.associate_dean}
                                                    </span>
                                                    <span className="text-sm text-gray-400">
                                                        {college.email}
                                                    </span>
                                                </div>
                                            </td>



                                                {/* STATUS */}
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        college.colleges_status === 'Active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        {college.colleges_status}
                                                    </span>
                                                </td>

                                                   {/* CREATED AT */}
                                                <td className="p-4">
                                                    <span className="text-sm text-gray-400">
                                                        {college.created_at}
                                                    </span>
                                                </td>

                                            {/* ACTION */}
                                            <td className="p-4 text-right">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-orange-600">
                                                    <FaEllipsisV />
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-6 text-gray-400">
                                            No colleges found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-start p-4">
                        <span className="text-sm text-gray-500">
                            Showing {filteredColleges.length} of {safeColleges.length} results
                        </span>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <ModalColleges 
                    setIsModalOpen={setIsModalOpen}
                    users={users}
                />
            )}
        </AdminLayout>
    );
}