import { useState } from 'react';
import { FaSearch, FaEllipsisV, FaUserPlus } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import { router, Link } from '@inertiajs/react';

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

export default function Classes () {
    return(
        <AdminLayout>
            <div className="flex flex-col h-full">
                <div className="pt-[3%] bg-white p-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center py-2 gap-2 text-sm">
                        <span className="font-bold text-gray-400">Admin</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">Manage</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">CDEK</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-orange-500">Classes</span>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h2 className="text-4xl font-black text-gray-800 tracking-tight">Classes</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Manage academic programs and their course structures.
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            {/* Search */}
                            <div className="relative w-[300px]">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                               
                                placeholder="Quick search"
                                className="w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-wrap gap-2 p-2">
                    <div className="w-[400px] h-[450px] rounded-xl overflow-hidden bg-white border border-gray-200 shadow-md">
                        
                        {/* Header with Background Image */}
                        <div
                            className="relative w-full h-[170px] bg-cover bg-center"
                            style={{
                                backgroundImage: "url('/system-images/cover-classes.jpg')",
                            }}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Header Text */}
                            <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
                                <h2 className="text-lg font-medium uppercase tracking-wider">
                                    CS - 11
                                </h2>
                                <h1 className="text-2xl font-bold">
                                    Programming 1
                                </h1>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                            <p className="text-gray-600 text-sm">
                                Course information goes here...
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}