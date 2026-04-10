import { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalResources from '../Modal/ModalResources';

export default function Resources() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AdminLayout>
            <div className="flex flex-col h-full">
                {/* HEADER */}
                <div className="pt-[3%] bg-white p-6">
                    
                    {/* BREADCRUMBS */}
                    <div className="flex items-center gap-2 text-sm py-2">
                        <span className="font-bold text-gray-400">Admin</span>
                        <span>/</span>
                        <span className="font-bold text-gray-400">Manage</span>
                        <span>/</span>
                        <span className="font-bold text-gray-400">CDEC</span>
                        <span>/</span>
                        <span className="font-bold text-orange-500">Rooms</span>
                    </div>

                    {/* TITLE + ACTIONS */}
                    <div className="flex justify-between items-end mt-2">
                        
                        <div>
                            <h2 className="text-4xl font-black text-gray-800">
                                Rooms
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Manage and view all rooms.
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
                                    placeholder="Search room..."
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
                                <span>Create Room</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <ModalResources setIsModalOpen={setIsModalOpen} />
            )}
        </AdminLayout>
    );
}