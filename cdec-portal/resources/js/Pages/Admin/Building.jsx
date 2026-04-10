import { useState } from 'react';
import { FaSearch, FaEllipsisV, FaUserPlus } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalBuilding from '../Modal/ModalBuilding';
import { router, Link } from '@inertiajs/react';

export default function Building({ buildings: initialBuildings }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buildings, setBuildings] = useState(initialBuildings || []);

    // Add new building from modal
    const addBuilding = (building) => {
        setBuildings([...buildings, building]);
    };

    // Filter buildings by search
    const filteredBuildings = buildings.filter((b) =>
        b.building_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="pt-[3%] bg-white p-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center py-2 gap-2 text-sm">
                        <span className="font-bold text-gray-400">Admin</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">Manage</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">CDEK</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-orange-500">Building</span>
                    </div>

                    {/* Page Title & Actions */}
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h2 className="text-4xl font-black text-gray-800 tracking-tight">Building</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage all building information.</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 items-center">
                            {/* Search Input */}
                            <div className="relative w-[300px]">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or building..."
                                    className="w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm"
                                />
                            </div>

                            {/* Reset Button */}
                            <button
                                type="button"
                                title="Reset Search"
                                onClick={() => setSearchQuery('')}
                                className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
                            >
                                <FiRefreshCw className="text-lg" />
                            </button>

                            {/* Add Building Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-bold"
                            >
                                <FaUserPlus className="text-lg" />
                                <span>Add Building</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-auto max-h-[500px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-white z-10">
                                    <tr>
                                        <th className="px-6 py-4 w-10">
                                            <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                                        </th>
                                        <th className="text-sm px-6 py-4">NAME</th>
                                        <th className="text-sm px-6 py-4">FLOORS</th>
                                        <th className="text-sm px-6 py-4">DESCRIPTIONS</th>
                                        <th className="text-sm px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                  {filteredBuildings.map((building) => (
                                        <tr key={building.id} className="group hover:bg-orange-50/30 transition-colors">
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">{building.building_name}</td>
<td className="px-6 py-4">
    {Array.isArray(building.floors) ? building.floors.join(', ') : building.floors}
</td>
                                            <td className="px-6 py-4">{building.description}</td>
                                            <td className="px-6 py-4 text-right">
                                                <FaEllipsisV className="text-gray-400 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
    <ModalBuilding
        setIsModalOpen={setIsModalOpen}
        addBuilding={(newBuilding) => setBuildings([...buildings, newBuilding])}
    />
)}
            </div>
        </AdminLayout>
    );
}