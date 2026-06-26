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