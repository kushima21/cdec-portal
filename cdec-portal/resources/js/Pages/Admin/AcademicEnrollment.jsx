    import { useState } from 'react';
    import { FaSearch, FaPlus } from 'react-icons/fa';
    import { FiRefreshCw } from 'react-icons/fi';
    import AdminLayout from '../Layouts/AdminLayout';
   import ModalAcademicEnrollment from '../Modal/ModalAcademicEnrollment';


    export default function AcademicEnrollment () {
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
                                <span className="font-bold text-orange-500">Academic Enrollment</span>
                            </div>
                            {/* TITLE + ACTIONS */}
                            <div className="flex justify-between items-end mt-2">
                                <div>
                                    <h2 className="text-4xl font-black text-gray-800">
                                        Academic Enrollment
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Manage and view all academic enrollment.
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
                                    <span>Create Academic Enrollment</span>
                                    </button>
                                </div>                         
                            </div>                     
                    </div>
                </div>
                {/* MODAL */}
                    {isModalOpen && (
                    <ModalAcademicEnrollment
                        setIsModalOpen={setIsModalOpen} 
                    />
                )}
            </AdminLayout>
        );
    }