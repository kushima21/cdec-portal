import { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalSchedule from '../Modal/ModalSchedule';

export default function Schedule({
    users,
    curriculla,
    resources,
    schedules = [], 
    academicTerms,
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ SAFE FILTER: Checks direct table row fields first, then checks relationship fallback
 const filteredSchedules = schedules.filter(schedule => {

    const keyword = searchQuery.toLowerCase();

    return (
           (schedule.course_code ?? '')
            .toString()
            .toLowerCase()
            .includes(keyword)
            ||
        (schedule.course_no ?? '')
            .toString()
            .toLowerCase()
            .includes(keyword)

        ||

        (schedule.descriptive_title ?? '')
            .toLowerCase()
            .includes(keyword)

        ||

        (schedule.instructor_name ?? '')
            .toLowerCase()
            .includes(keyword)

        ||

        (schedule.room?.room_name ?? '')
            .toLowerCase()
            .includes(keyword)
    );

});

    return (
        <AdminLayout>
            <div className="flex flex-col h-full">
                <div className="pt-[3%] bg-white p-6 shadow-sm border-b border-gray-100">
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
                                    placeholder="Search course number..."
                                    className="w-full h-10 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                />
                            </div>
                            <button 
                                onClick={() => setSearchQuery('')} 
                                className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                <FiRefreshCw className="text-gray-600" />
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

                {/* DATA TABLE GRAPHIC DISPLAY CONTAINER */}
                <div className="flex-1 p-6 bg-gray-50">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-100 text-gray-700 uppercase font-bold text-xs border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Course No.</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Instructor</th>
                                    <th className="px-6 py-4">Room Location</th>
                                    <th className="px-6 py-4">Days & Time Span</th>
                                    <th className="px-6 py-4 text-center">Open Slots</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSchedules.length > 0 ? (
                                    filteredSchedules.map((schedule, index) => (
                                        <tr key={schedule.schedule_id || index} className="hover:bg-gray-50/80 transition-colors">
                                            {/* 🛠️ FIXED: Reads direct data string keys to insulate against load latency */}
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                               {schedule.course_code || 'N/A'} - {schedule.course_no || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 max-w-[220px] truncate">
                                                {schedule.descriptive_title || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {schedule.instructor_name || 'TBA'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium text-xs border border-blue-100">
                                                    {schedule.room?.room_name ?? 'TBA'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-800">{schedule.days || 'TBA'}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">
                                                    {schedule.start_time} - {schedule.end_time} ({schedule.duration})
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-bold text-gray-700">
                                                {schedule.available_slot ?? 0}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic bg-gray-50/30">
                                            {searchQuery 
                                                ? `No matched items found for query context: "${searchQuery}".` 
                                                : "No baseline schedules currently configured inside database."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ModalSchedule
                    setIsModalOpen={setIsModalOpen}
                    users={users}
                    curriculla={curriculla}
                    resources={resources}
                    academicTerms={academicTerms}
                />
            )}
        </AdminLayout>
    );
}