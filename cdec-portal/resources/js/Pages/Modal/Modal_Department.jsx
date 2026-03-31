import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa'; 

export default function ModalDepartment({ setIsModalOpen }) {

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
                    className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col"
                >

                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Add New Department
                            </h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>

                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                        >
                            <FaTimes className="text-xl" />
                        </button>                 
                    </div>

                    {/* FORM */}
                    <form className="w-full flex flex-col gap-6 pt-5">

                        {/* TITLE */}
                        <div>
                            <h2 className="text-2xl font-bold">Department Details</h2>
                            <p>Enter the required information to register a department.</p>
                        </div>

                        {/* LEFT & RIGHT */}
                        <div className="w-full flex flex-row gap-12 pt-4">

                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">Name</label>
                                <input 
                                    type="text" 
                                    name="department_name" 
                                    placeholder="" 
                                    className="border rounded-md p-2 w-full" 
                                />

                                <label className="text-lg font-medium mt-2">Contact Number</label>
                                <input
                                    type="number"
                                    name="contact_number"
                                    placeholder=""
                                    className="border rounded-md p-2 w-full"
                                />

                                <label className="text-lg font-medium mt-2">Description</label>
                                <textarea
                                    className="border rounded-md p-2 w-full h-[200px]"
                                />
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">College</label>
                                <select name="college" className="border rounded-md p-2">
                                    <option></option>
                                    <option>Education</option>
                                    <option>Criminology</option>
                                    <option>Business Administration</option>
                                </select>

                                <label className="text-lg font-medium mt-2">Program</label>
                                <select name='program' className="border rounded-md p-2">
                                    <option></option>
                                    <option>BSBA - FM</option>
                                    <option>Criminology</option>
                                    <option>Business Administration</option>
                                </select>

                                <label className="text-lg font-medium mt-2">Chair Person</label>
                                <select className="border rounded-md p-2">
                                    <option></option>
                                    <option>Education</option>
                                    <option>Criminology</option>
                                    <option>Business Administration</option>
                                </select>
                            </div>

                        </div>

                        {/* SUBMIT */}
                        <div className="w-full flex justify-center mt-6">
                            <button 
                                type="submit" 
                                className="w-full h-[50px] bg-slate-400 rounded-md"
                            >
                                Create
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}