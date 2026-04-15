    import { useState } from 'react';
    import { FaSearch, FaPlus } from 'react-icons/fa';
    import { FiRefreshCw } from 'react-icons/fi';
    import AdminLayout from '../Layouts/AdminLayout';
    import ModalAcademicTerm from '../Modal/ModalAcademicTerm';


    export default function Resources({ terms }) {
        const [searchQuery, setSearchQuery] = useState('');
        const [isModalOpen, setIsModalOpen] = useState(false);

        return (
                <AdminLayout>
                            <div className="flex flex-col h-full">
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
                                        {/* TITLE + ACTIONS */}
                                        <div className="flex justify-between items-end mt-2">
                                                <div>
                                                    <h2 className="text-4xl font-black text-gray-800">
                                                        Academic Term
                                                    </h2>
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        Manage and view all academic terms.
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                
                                                    {/* SEARCH */}
                                                    <div className="relative w-[300px]">
                                                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            placeholder="Search academic terms..."
                                                            className="w-full h-10 pl-10 rounded-xl border border-gray-200"
                                                        />
                                                    </div>

                                                    {/* REFRESH */}
                                                    <button
                                                        onClick={() => setSearchQuery('')}
                                                        className="p-2.5 bg-gray-100 rounded-xl"
                                                    >
                                                        <FiRefreshCw />
                                                    </button>

                                                    {/* ADD BUTTON */}
                                                    <button 
                                                        onClick={() => setIsModalOpen(true)}
                                                        className="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-xl"
                                                    >
                                                        <FaPlus />
                                                        <span>Create Academic Term</span>
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
                                                        <th className="px-6 py-4">Academic Year</th>
                                                        <th className="px-6 py-4">Academic Start</th>
                                                        <th className="px-6 py-4">Academic End</th>
                                                        <th className="px-6 py-4">Academic Period</th>
                                                        <th className="px-6 py-4">Academic Status</th>
                                                        <th className="px-6 py-4"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {terms.map((term) => (
                                                        <tr key={term.id} className="hover:bg-gray-50/50 transition-colors group">
                                                            <td className="px-6 py-4">
                                                                <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                                            </td>

                                                            <td className="px-6 py-4">{term.academic_year}</td>

                                                            <td className="px-6 py-4">
                                                                {new Date(term.academic_start).toLocaleDateString()}
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                {new Date(term.academic_end).toLocaleDateString()}
                                                            </td>

                                                            <td className="px-6 py-4">{term.academic_period}</td>

                                                            <td className="px-6 py-4">
                                                                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                                                                    {term.academic_status}
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-4 text-right">
                                                                {/* pwede nimo butangan edit/delete later */}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* MODAL */}
                                {isModalOpen && (
                                    <ModalAcademicTerm 
                                    setIsModalOpen={setIsModalOpen} 
                                />
                            )}
                </AdminLayout>
            
        );

    }