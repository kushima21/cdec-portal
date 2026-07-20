import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import AdminLayout from '../Layouts/AdminLayout';

export default function Application({ programs = [], academicTerm }) {
    const [openProgram, setOpenProgram] = useState(null);

    const getOrdinal = (num) => {
        if (num === 1) return 'st';
        if (num === 2) return 'nd';
        if (num === 3) return 'rd';
        return 'th';
    };

    const generateLevels = (duration) => {
        const years = parseInt(duration) || 4;

        return Array.from({ length: years }, (_, index) => {
            const year = years - index;
            return `${year}${getOrdinal(year)} Year`;
        });
    };

    return (
        <AdminLayout>
            <div className="flex flex-col h-full">
                <div className="pt-[3%] bg-white p-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center py-2 gap-2 text-sm">
                        <span className="font-bold text-gray-400">Admin</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">Manage</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-gray-400">CDEC</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-bold text-orange-500">
                            Application
                        </span>
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h2 className="text-4xl font-black text-gray-800 tracking-tight">
                                Application For Admission
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                Manage and view all application-related information.
                            </p>
                        </div>

                        <div className="relative w-[300px]">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                placeholder="Search program..."
                                className="w-full h-10 rounded-xl border-gray-200 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    {/* Program List */}
                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* Card Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    College Programs
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Program-based admissions accepting applications.
                                </p>
                            </div>

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                                {programs.length} Programs
                            </span>
                        </div>

                        {/* Program Items */}
                        <div className="divide-y">

                            {programs.map((program) => (

                                <div key={program.program_id}>

                                    <div className="flex items-start justify-between p-5">

                                        <div className="flex gap-4">

                                            <div className="w-1 rounded-full bg-purple-600"></div>

                                            <div>

                                                <div className="flex items-center gap-2">

                                                    <h2 className="font-bold text-gray-800">
                                                        {program.program_name}
                                                    </h2>

                                                    <span
                                                        className={`rounded-full px-2 font-thin py-1 text-xs ${
                                                            program.program_status === 'Active'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {program.program_status}
                                                    </span>

                                                </div>

                                                <p className="mt-1 font-thin text-sm text-gray-500">
                                                    {program.abbreviation}
                                                </p>

                                                <p className="text-sm font-bold text-gray-500">
                                                    {program.college_duration}
                                                </p>

                                                <p className="text-sm font-thin text-gray-500">
                                                    {academicTerm?.academic_period} ({academicTerm?.academic_year})
                                                </p>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() =>
                                                setOpenProgram(
                                                    openProgram === program.program_id
                                                        ? null
                                                        : program.program_id
                                                )
                                            }
                                            className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            {openProgram === program.program_id
                                                ? 'Hide ▲'
                                                : 'More ▼'}
                                        </button>

                                    </div>

                                    {openProgram === program.program_id && (

                                        <div className="px-6 pb-5">

                                            <div className="overflow-hidden rounded-xl border">

                                                {generateLevels(program.college_duration).map((level) => (

                                                    <div
                                                        key={level}
                                                        className="flex items-center justify-between border-b px-5 py-4 last:border-b-0 hover:bg-gray-50"
                                                    >

                                                        <div>

                                                            <h2 className="font-semibold text-gray-800">
                                                                {level}
                                                            </h2>

                                                            <p className="text-sm text-gray-500">
                                                                {level} • {academicTerm?.academic_period} ({academicTerm?.academic_year})
                                                            </p>

                                                        </div>

                                                        <button className="font-semibold text-purple-600 hover:underline">
                                                            Apply →
                                                        </button>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            ))}

                            {programs.length === 0 && (
                                <div className="p-10 text-center text-gray-500">
                                    No programs available.
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}