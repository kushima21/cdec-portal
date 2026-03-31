import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaSearch, FaPlus, FaEllipsisV } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';

import ModalAcademicYear from'../Modal/ModalAcademicYear';

export default function AcademicYear() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const AddCurriculaIcon = () => <FaPlus className="text-lg" />;

    return (
        <AdminLayout>
            <div className='flex flex-col h-full'>

                {/* Header Section */}
                <div className='pt-[3%] bg-white p-6'>

                    {/* Breadcrumbs */}
                    <div className='flex items-center py-2 gap-2 text-sm'>
                        <span className='font-bold text-gray-400'>Admin</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>Manage</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>CDEC</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-orange-500'>Academic Year</span>
                    </div>

                    {/* Title */}
                    <div className='flex justify-between items-end mt-2'>
                        <div>
                            <h2 className='text-4xl font-black text-gray-800 tracking-tight'>
                                Academic Year
                            </h2>
                            <p className='text-gray-500 text-sm mt-1'>
                                Manage and view all academic curriculum structures and course mappings.
                            </p>
                        </div>
                         {/* Search & Actions */}
                        <div className='flex gap-3 items-center mt-4'>

                            {/* Search */}
                            <div className='relative w-[300px]'>
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Quick search...'
                                    className='w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm'
                                />
                            </div>

                            {/* Refresh */}
                            <button
                                onClick={() => setSearchQuery('')}
                                className='p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600'
                            >
                                <FiRefreshCw className={`text-lg ${searchQuery ? 'animate-spin' : ''}`} />
                            </button>

                            {/* Add Button */}
                            <button 
                            onClick={() => setIsModalOpen(true)}
                            className='flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-bold'>
                                <AddCurriculaIcon />
                                <span>Add Academic Year</span>
                            </button>

                        </div>
                    </div>
                </div>

            </div>
{isModalOpen && (
    <ModalAcademicYear setIsModalOpen={setIsModalOpen} />
)}
        </AdminLayout>
    );
}