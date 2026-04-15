import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';

export default function ModalAcademicTerm({ setIsModalOpen }) {



    const [showAcademicPeriod, setShowAcademicPeriod] = useState(false);
    const [selectAcademicPeriod, setSelectAcademicPeriod] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        router.post('/academic-term/store', {
            academic_year: e.target.academic_year.value,
            academic_start: e.target.academic_start.value,
            academic_end: e.target.academic_end.value,
            academic_period: selectAcademicPeriod,
        });

        setIsModalOpen(false);
    };

    return (
        <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">

            {/* OUTSIDE CLICK */}
            <div
                onClick={() => setIsModalOpen(false)}
                className="w-full h-full flex justify-center items-center overflow-y-auto pt-10 pb-8"
            >

                {/* MODAL CONTENT */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-[50%] bg-white rounded-xl shadow-4xl p-5 flex flex-col"
                >

                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Create New Academic Term
                            </h3>
                            <p className="text-sm text-gray-500">
                                Fill in the details below.
                            </p>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={submitHandler} className="w-full flex flex-col gap-6 pt-5">

                        {/* TITLE */}
                        <div>
                            <h2 className="text-xl font-bold">
                                Academic Term Details
                            </h2>
                            <p className="text-sm text-gray-500">
                                Enter the required information of academic term.
                            </p>
                        </div>

                        {/* ACADEMIC YEAR */}
                        <label>Academic Year</label>
                        <input
                            type="text"
                            className="border p-2 rounded-md w-full"
                            name="academic_year"
                        />

                        <div className="w-full flex gap-12">

                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-3">

                                <label>Academic Start</label>
                                <input
                                    type="date"
                                    className="border p-2 rounded-md w-full"
                                    name="academic_start"
                                />
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 flex flex-col gap-3">

                                <label>Academic End</label>
                                <input
                                    type="date"
                                    className="border p-2 rounded-md w-full"
                                    name="academic_end"
                                />
                            </div>

                        </div>
                        <label>Academic Period</label>
                                <div className="relative">

                                    <input
                                        type="text"
                                        name="academic_period"
                                        readOnly
                                        value={selectAcademicPeriod}
                                        onClick={() => setShowAcademicPeriod(!showAcademicPeriod)}
                                        className="border p-2 rounded-md w-full cursor-pointer"
                                        placeholder="Select academic period..."
                                    />

                                    {showAcademicPeriod && (
                                        <div className="absolute z-10 w-full bg-white border rounded-md shadow">

                                            {["First Semester", "Second Semester", "Summer"].map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={() => {
                                                        setSelectAcademicPeriod(item);
                                                        setShowAcademicPeriod(false);
                                                    }}
                                                    className="p-2 hover:bg-orange-100 cursor-pointer"
                                                >
                                                    {item}
                                                </div>
                                            ))}

                                        </div>
                                    )}

                                </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="w-full h-[45px] bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            Create Academic Term
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}