import { router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaSearch, FaPlus, FaEllipsisV } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalCourse from '../Modal/ModalCourse';

const AddCourseIcon = () => (
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

export default function Courses({ courses: initialCourses, search: initialSearch }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialSearch || '');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        router.get(route('courses.index'), { search: e.target.value }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout>
            <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='pt-[3%] bg-white p-6'>
                    <div className='flex items-center py-2 gap-2 text-sm'>
                        <span className='font-bold text-gray-400'>Admin</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>Manage</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>CDEC</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-orange-500'>Courses</span>
                    </div>

                    <div className='flex justify-between items-end mt-2'>
                        <div>
                            <h2 className='text-4xl font-black text-gray-800 tracking-tight'>Courses</h2>
                            <p className='text-gray-500 text-sm mt-1'>Manage and view all academic course offerings.</p>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <div className='relative w-[300px]'>
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder='Search course or title...'
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
                                <AddCourseIcon />
                                <span>Add Course</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='flex-1 mt-4 overflow-hidden flex flex-col'>
                    <div className='overflow-x-auto overflow-y-auto bg-white'>
                        <table className='w-full bg-white text-left'>
                            <thead className='bg-white sticky top-0 z-200'>
                                <tr>
                                    <th className='p-4 w-10'>
                                        <input type='checkbox' className='w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500' />
                                    </th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>Course No</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider'>Descriptive Title</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center'>Lecture</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center'>Lab</th>
                                    <th className='p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center'>Units</th>
                                    <th className='p-4 w-10'></th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-50'>
                                {initialCourses.map((course) => (
                                    <tr key={course.id} className='group hover:bg-orange-50/30 transition-colors'>
                                        <td className='p-4'>
                                            <input type='checkbox' className='w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500' />
                                        </td>
                                        <td className='p-4 font-bold text-gray-700'>{course.course_no}</td>
                                        <td className='p-4 text-gray-600 font-medium'>{course.descriptive_title}</td>
                                        <td className='p-4 text-center text-gray-500'>{course.lecture_units}</td>
                                        <td className='p-4 text-center text-gray-500'>{course.lab_units}</td>
                                        <td className='p-4 text-center font-bold text-orange-600'>{course.total_units}</td>
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
                </div>
            </div>

            {isModalOpen && (
                <ModalCourse setIsModalOpen={setIsModalOpen} />
            )}
            
        </AdminLayout>
    );
}