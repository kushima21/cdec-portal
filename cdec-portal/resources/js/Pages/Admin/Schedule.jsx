import { useState } from 'react';
import { FaSearch, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalSchedule from '../Modal/ModalSchedule';


export default function Schedule({ users, curriculla, resources, schedules = [] }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ SAFE FILTER
    const filteredSchedules = schedules.filter(s =>
        (s.course?.course_no || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );
    return (
        <AdminLayout>
            <div className="flex flex-col h-full">
                <div className="pt-[3%] bg-white p-6">
                    {/* BREADCRUMBS */}
                    <div className="flex items-center py-2 gap-2 text-sm">
                        <span className="font-bold text-gray-400">Admin</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">Manage</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">CDEC</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-orange-500">Schedule</span>
                    </div>

                    {/* TITLE + ACTIONS */}
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h2 className="text-4xl font-black text-gray-800">Schedules</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage and view all course schedules.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative w-[300px]">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search course..."
                                    className="w-full h-10 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            <button onClick={() => setSearchQuery('')} className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                                <FiRefreshCw />
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors"
                            >
                                <FaPlus />
                                <span>Create Schedule</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div>
                    <div className="bg-white  shadow-sm border border-gray-100 overflow-hidden">
                        <div className=" relative max-h-[calc(100vh-250px)]">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                                    <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                        <th className="px-6 py-4">Course</th>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4">Day</th>
                                        <th className="px-6 py-4">Duration</th>
                                        <th className="px-6 py-4">Availability</th>
                                        <th className="px-6 py-4 text-center">Slots</th>
                                        <th className="px-6 py-4">Room</th>
                                        <th className="px-6 py-4">Teacher</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredSchedules.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors text-sm text-gray-600">
                                            <td className="px-6 py-4">
                                                <div className="relative inline-flex items-center gap-2 group">

                                                    {/* COURSE NO */}
                                                    <span className="font-bold text-gray-800 cursor-pointer">
                                                        {item.course?.course_no}
                                                    </span>

                                                    <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                        Enabled
                                                    </span>

                                                    {/* HOVER TOOLTIP (FIXED POSITION - NO SCROLL) */}
                                                    <div className="hidden group-hover:block fixed z-[9999]">
                                                        <div className="bg-gray-800 border w-full border-gray-100 shadow-xl flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 max-w-[260px]">

                                                            {/* COURSE TITLE */}
                                                            <div className="font-sm text-white ">
                                                                {item.course?.descriptive_title}
                                                            </div>

                                                            {/* UNITS */}
                                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                <span className="font-medium text-white">
                                                                    {item.course?.total_units}
                                                                </span>
                                                                <span className='text-white'>-</span>

                                                                <span className='text-white'>units</span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium">{item.time}</span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{item.days}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-full text-xs">{item.duration}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold text-gray-400">{item.availability}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-lime-50 text-lime-700 font-bold px-3 py-1 rounded-lg text-xs border border-lime-100">
                                                    {item.slots}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                                    <span className="font-medium text-xs">{item.room}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative flex items-center  group">

                                                    {/* AVATAR */}
                                                    <img
                                                        src={item.instructor.avatar || '/default-avatar.png'}
                                                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-2 ring-orange-400 cursor-pointer"
                                                    />

                                                    {/* TOOLTIP LEFT SIDE */}
                                                    <div className="absolute  right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex z-[9999]">

                                                        <div className="bg-white px-3 py-3 rounded-xl shadow-xl border border-gray-100 w-max flex items-center gap-3">

                                                            {/* IMAGE LEFT */}
                                                            <img
                                                                src={item.instructor.avatar || '/default-avatar.png'}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />

                                                            {/* TEXT RIGHT */}
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-gray-800 text-sm">
                                                                    {item.instructor.name}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {item.instructor.email}
                                                                </span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ModalSchedule
                    setIsModalOpen={setIsModalOpen}
                    users={users}
                    curriculla={curriculla}
                    resources={resources}
                />
            )}
        </AdminLayout>
    );
}