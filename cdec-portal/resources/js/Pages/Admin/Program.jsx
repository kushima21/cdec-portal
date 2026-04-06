import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaSearch, FaEllipsisV, FaChevronDown } from 'react-icons/fa'; // Added FaChevronDown
import { FiRefreshCw, FiFilter } from 'react-icons/fi'; // Added FiFilter
import AdminLayout from '../Layouts/AdminLayout';
import ModalProgram from'../Modal/Modal_Program';
/* Add Icon */
const AddIcon = () => (
    <div className="relative flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-gradient-to-br from-orange-400 to-orange-600 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
        <div className="absolute -top-1 -right-1 bg-white rounded-full w-3 h-3 flex items-center justify-center border border-orange-500">
            <span className="text-[10px] font-black text-orange-600 leading-none">+</span>
        </div>
    </div>
);

export default function Program({ users }) {
    console.log("Users in Program.jsx:", users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeProgram, setActiveProgram] = useState('BS Information Technology');
    const [yearLevel, setYearLevel] = useState('All'); // State for the new dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    /* Year levels for the dropdown */
    const yearLevels = ['All', 'I', 'II', 'III', 'IV'];

    /* Programs */
    const programs = [
        'BS Information Technology',
        'BS Computer Science',
        'BS Information Systems',
        'BS Criminology',

    ];

    /* Courses */
    const allCourses = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        program: programs[i % programs.length],
        code: `IT-${200 + i}`,
        title: i % 2 === 0 ? 'Data Structures and Algorithms' : 'Advanced Web Development',
        lec: 3,
        lab: 2,
        units: 5,
        year: yearLevels[(i % 4) + 1] // Assigning dummy year levels
    }));

    const filteredCourses = allCourses.filter(course =>
        course.program === activeProgram &&
        (yearLevel === 'All' || course.year === yearLevel) &&
        (
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <AdminLayout>
            <div className='flex flex-col h-full overflow-hidden'>

                {/* Header */}
                <div className='pt-[3%] bg-white p-6'>
                    <div className='flex items-center py-2 gap-2 text-sm'>
                        <span className='font-bold text-gray-400'>Admin</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>Manage</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-gray-400'>CDEC</span>
                        <span className='text-gray-300'>/</span>
                        <span className='font-bold text-orange-500'>Programs</span>
                    </div>

                    <div className='flex justify-between items-end mt-2'>
                        <div>
                            <h2 className='text-4xl font-black text-gray-800 tracking-tight'>Programs</h2>
                            <p className='text-gray-500 text-sm mt-1'>
                                Manage academic programs and their course structures.
                            </p>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <div className='relative w-[300px]'>
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Quick search'
                                    className='w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm'
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs border border-gray-200 px-1.5 py-0.5 rounded-md bg-gray-50">⌘K</span>
                            </div>

                            {/* Year Level Dropdown from Image */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-4 px-4 h-10 bg-white border-2 border-orange-500 text-gray-700 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-medium"
                                >
                                    <span>{yearLevel}</span>
                                    <FaChevronDown className={`text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                        {yearLevels.map((lvl) => (
                                            <button
                                                key={lvl}
                                                onClick={() => {
                                                    setYearLevel(lvl);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 transition-colors ${yearLevel === lvl ? 'text-orange-600 font-bold bg-orange-50/50' : 'text-gray-600'}`}
                                            >
                                                {lvl === yearLevel && <span className="mr-2">✓</span>}
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className='p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600'>
                                <FiFilter className="text-lg" />
                            </button>

                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setYearLevel('All');
                                }}
                                className='p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600'
                            >
                                <FiRefreshCw className={`text-lg ${searchQuery ? 'animate-spin' : ''}`} />
                            </button>

                            <button 
                            onClick={() => setIsModalOpen(true)}
                            className='flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-bold'>
                                <AddIcon />
                                <span>Add Program</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Program Cards */}
                <div className='px-6 mt-2 grid grid-cols-4 gap-4 overflow-y-auto max-h-48'>
                    {programs.map((prog, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveProgram(prog)}
                            className={`p-4 rounded-xl border cursor-pointer transition
                                ${activeProgram === prog
                                    ? 'bg-orange-50 border-orange-400 shadow-sm'
                                    : 'bg-white border-gray-200 hover:shadow-md'}`}
                        >
                            <h3 className='font-bold text-gray-800 leading-tight'>{prog}</h3>
                            <p className='text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold'>4 Years • 120 Units</p>
                        </div>
                    ))}
                </div>

                {/* Courses Section */}
                <div className='flex-1 mt-4 overflow-hidden flex flex-col bg-white mx-6 rounded-xl border border-gray-100'>
                    <div className='px-6 pt-6'>
                        <h3 className='text-xl font-bold text-gray-800'>
                            Courses under: <span className='text-orange-600'>{activeProgram}</span>
                        </h3>
                    </div>

                    <div className='flex-1 overflow-auto mt-4'>
                        <table className='w-full text-left'>
                            <thead className='bg-white sticky top-0 border-b border-gray-100'>
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
                            <tbody className='divide-y divide-gray-100'>
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className='group hover:bg-orange-50/40 transition text-sm'>
                                        <td className='p-4'>
                                            <input type='checkbox' className='w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500' />
                                        </td>
                                        <td className='p-4 font-bold text-gray-700'>{course.code}</td>
                                        <td className='p-4 text-gray-600 font-medium'>{course.title}</td>
                                        <td className='p-4 text-center text-gray-500'>{course.lec}</td>
                                        <td className='p-4 text-center text-gray-500'>{course.lab}</td>
                                        <td className='p-4 text-center font-bold text-orange-600'>{course.units}</td>
                                        <td className='p-4 text-right'>
                                            <button className='p-2 hover:bg-white hover:shadow-sm rounded-lg transition text-gray-400 hover:text-orange-600'>
                                                <FaEllipsisV />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className='flex justify-between items-center py-6 px-6 border-t border-gray-100'>
                        <p className='text-sm text-gray-500'>
                            Showing <span className='font-bold text-gray-800'>{filteredCourses.length}</span> courses
                        </p>
                        <div className='flex items-center gap-2'>
                            <button className='px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-white hover:shadow-sm transition'>Previous</button>
                            <button className='w-10 h-10 rounded-xl bg-orange-600 text-white font-bold shadow-lg shadow-orange-100'>1</button>
                            <button className='w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm font-medium text-gray-600 transition'>2</button>
                            <button className='px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-white hover:shadow-sm transition'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
    {isModalOpen && (
        <ModalProgram 
            setIsModalOpen={setIsModalOpen} 
            users={users} // <--- users gi-pass diri
        />
    )}
        </AdminLayout>
    );
}