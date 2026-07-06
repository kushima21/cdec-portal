import { useState } from 'react';
import { FaSearch, FaEllipsisV, FaUserPlus } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import { router, Link } from '@inertiajs/react';

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
                </div>
            </div>
        </AdminLayout>
    );
}