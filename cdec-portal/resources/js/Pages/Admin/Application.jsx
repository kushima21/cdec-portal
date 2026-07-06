import { router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaSearch, FaPlus, FaEllipsisV } from 'react-icons/fa';
import AdminLayout from '../Layouts/AdminLayout';
export default function Application({ }) {

    const [openProgram, setOpenProgram] = useState(null);

const programs = [
    {
        id: 1,
        title: "Bachelor of Arts in English Language Studies",
        code: "BAELS",
        year: "4th Year",
        semester: "1st Semester (2026-2027)",
        intakes: 4,
        levels: ["4th Year", "3rd Year", "2nd Year", "1st Year"],
    },
    {
        id: 2,
        title: "Bachelor of Elementary Education",
        code: "BEEd",
        year: "4th Year",
        semester: "1st Semester (2026-2027)",
        intakes: 4,
        levels: ["4th Year", "3rd Year", "2nd Year", "1st Year"],
    },
    {
        id: 3,
        title: "Bachelor of Science in Business Administration - Operations Management",
        code: "BSBA-OM",
        year: "4th Year",
        semester: "1st Semester (2026-2027)",
        intakes: 4,
        levels: ["4th Year", "3rd Year", "2nd Year", "1st Year"],
    },
];
    return (
            <AdminLayout>
                <div className='flex flex-col h-full'>
                    <div className='pt-[3%] bg-white p-6'>
                        <div className='flex items-center py-2 gap-2 text-sm'>
                            <span className='font-bold text-gray-400'>Admin</span>
                            <span className='text-gray-300'>/</span>
                            <span className='font-bold text-gray-400'>Manage</span>
                            <span className='text-gray-300'>/</span>
                            <span className='font-bold text-gray-400'>CDEC</span>
                            <span className='text-gray-300'>/</span>
                            <span className='font-bold text-orange-500'>Application</span>
                        </div>
                        <div className='flex justify-between items-end mt-2'>
                            <div>
                                <h2 className='text-4xl font-black text-gray-800 tracking-tight'>Application For Admission</h2>
                                <p className='text-gray-500 text-sm mt-1'>Manage and view all application-related information.</p>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <div className='relative w-[300px]'>
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type='text'
                                    
                                        placeholder='Search course or title...'
                                        className='w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 transition-all shadow-sm'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

                        <div className="flex items-center justify-between p-6 border-b">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    College Programs
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Program-based intakes accepting applications.
                                </p>
                            </div>

                            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                                {programs.length} Options
                            </span>
                        </div>

                        <div className="divide-y">

                            {programs.map((program) => (

                                <div key={program.id}>

                                    <div className="flex justify-between items-start p-5">

                                        <div className="flex gap-4">

                                            <div className="w-1 rounded-full bg-purple-600"></div>

                                            <div>

                                                <div className="flex items-center gap-2">

                                                    <h2 className="font-bold text-gray-800">
                                                        {program.title}
                                                    </h2>

                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                        {program.intakes} Intakes
                                                    </span>

                                                </div>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {program.code}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {program.year}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {program.year} · {program.semester}
                                                </p>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() =>
                                                setOpenProgram(
                                                    openProgram === program.id ? null : program.id
                                                )
                                            }
                                            className="px-4 py-2 rounded-full border hover:bg-gray-100 text-sm"
                                        >
                                            {openProgram === program.id ? "Hide ▲" : "More ▼"}
                                        </button>

                                    </div>

                                    {openProgram === program.id && (

                                        <div className="px-6 pb-5">

                                            <div className="border rounded-xl overflow-hidden">

                                                {program.levels.map((level) => (

                                                    <div
                                                        key={level}
                                                        className="flex justify-between items-center border-b last:border-b-0 px-5 py-4 hover:bg-gray-50"
                                                    >

                                                        <div>

                                                            <h2 className="font-semibold text-gray-800">
                                                                {level}
                                                            </h2>

                                                            <p className="text-sm text-gray-500">
                                                                {level} · {program.semester}
                                                            </p>

                                                        </div>

                                                        <button className="text-purple-600 font-semibold hover:underline">
                                                            Apply →
                                                        </button>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            ))}

                        </div>

                    </div>
                    </div>
                </div>
            </AdminLayout>
    );
}