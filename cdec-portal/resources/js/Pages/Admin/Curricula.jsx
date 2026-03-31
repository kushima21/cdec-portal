import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaSearch, FaPlus, FaEllipsisV } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';

import ModalCurricula from'../Modal/ModalCurricula';

// Custom Recreated Icon for the "Add" action
const AddCurriculaIcon = () => (
    <div className="relative flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-gradient-to-br from-orange-400 to-orange-600 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
        <div className="absolute -top-1 -right-1 bg-white rounded-full w-3 h-3 flex items-center justify-center border-[1px] border-orange-500">
            <span className="text-[10px] font-black text-orange-600 leading-none">+</span>
        </div>
    </div>
);

export default function Curricula() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data updated for Curricula context
    const allCurricula = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        program: 'BS-IT',
        course: i % 2 === 0 ? 'Data Structures and Algorithms' : 'Advanced Web Development',
        academicYear: '2023-2024',
        term: '1st Semester',
        level: i % 4 === 0 ? 'First Year' : 'Second Year',
        type: 'Major',
    }));

    // Filter logic
    const filteredCurricula = allCurricula.filter(item => 
        item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.program.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='flex flex-col h-full'>
                
                {/* Sticky Header Section */}
                <div className='pt-[3%] bg-white p-6'>
                    {/* Breadcrumbs */}
                    <div className='flex items-center py-2 gap-2 text-sm'>
                        <span className='font-bold text-gray-400'>Admin</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>Manage</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>CDEC</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-orange-500'>Curricula</span>
                    </div>

                    <div className='flex justify-between items-end mt-2'>
                        <div>
                            <h2 className='text-4xl font-black text-gray-800 tracking-tight'>Curricula</h2>
                            <p className='text-gray-500 text-sm mt-1'>Manage and view all academic curriculum structures and course mappings.</p>
                        </div>

                        {/* Search & Actions */}
                        <div className='flex gap-3 items-center'>
                            <div className='relative w-[300px]'>
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Search program or course...'
                                    className='w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm'
                                />
                            </div>
                            <button 
                                onClick={() => setSearchQuery('')}
                                className='p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600'
                            >
                                <FiRefreshCw className={`text-lg ${searchQuery ? 'animate-spin' : ''}`} />
                            </button>
                            <button 
                            onClick={() => setIsModalOpen(true)}
                            className='flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-bold'>
                                <AddCurriculaIcon />
                                <span>Add Curricula</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className='flex-1 mt-4 overflow-hidden flex flex-col'>
                    <div className='overflow-x-auto overflow-y-auto bg-white'>
                        <table className='w-full bg-white text-left'>
                            <thead className='bg-white sticky top-0 z-10'>
                                <tr className="border-b border-gray-100">
                                    <th className='p-4 w-10'>
                                        <input type='checkbox' className='w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500' />
                                    </th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>PROGRAM</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>COURSE</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center'>ACADEMIC YEAR</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center'>ACADEMIC TERM</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center'>ACADEMIC LEVEL</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center'>TYPE</th>
                                    <th className='p-4 w-10'></th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-50'>
                                {filteredCurricula.map((item) => (
                                    <tr key={item.id} className='group hover:bg-orange-50/30 transition-colors'>
                                        <td className='p-4'>
                                            <input type='checkbox' className='w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500' />
                                        </td>
                                        <td className='p-4 font-bold text-gray-700'>{item.program}</td>
                                        <td className='p-4 text-gray-600 font-medium'>{item.course}</td>
                                        <td className='p-4 text-center text-gray-500'>{item.academicYear}</td>
                                        <td className='p-4 text-center text-gray-500'>{item.term}</td>
                                        <td className='p-4 text-center'>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                                                {item.level}
                                            </span>
                                        </td>
                                        <td className='p-4 text-center font-bold text-orange-600'>{item.type}</td>
                                        <td className='p-4 text-right'>
                                            <button className='p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-400 hover:text-orange-600'>
                                                <FaEllipsisV />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className='flex justify-between items-center py-6 px-6 border-t border-gray-100'>
                        <p className='text-sm text-gray-500'>
                            Showing <span className='font-bold text-gray-800'>{filteredCurricula.length}</span> results
                        </p>
                        <div className='flex items-center gap-2'>
                            <button className='px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-white hover:shadow-sm transition-all'>Previous</button>
                            <div className='flex gap-1'>
                                <button className='w-10 h-10 flex items-center justify-center rounded-xl bg-orange-600 text-white font-bold shadow-lg shadow-orange-100'>1</button>
                                <button className='w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm font-medium text-gray-600 transition-all'>2</button>
                            </div>
                            <button className='px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-white hover:shadow-sm transition-all'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
                {isModalOpen && (
                    <ModalCurricula setIsModalOpen={setIsModalOpen} />
                )}
        </AdminLayout>
    );
}