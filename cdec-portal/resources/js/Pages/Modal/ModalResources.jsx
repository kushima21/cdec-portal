        import { router } from '@inertiajs/react';
        import { FaTimes } from 'react-icons/fa'; 


        export default function ModalResources({ setIsModalOpen }) {
            return(
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
                                        Create New Room
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
                            <form className="w-full flex flex-col gap-6 pt-5"></form>
                                {/* TITLE */}
                                <div>
                                    <h2 className="text-2xl font-bold">Room Details</h2>
                                    <p>Enter the required information to register a room.</p>
                                </div>
                                {/* LEFT & RIGHT */}
                                <div className="w-full flex flex-row gap-12 pt-4">
                                    {/* LEFT */}
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label className="text-lg font-medium">Room Name</label>
                                        <input 
                                            type="text" 
                                            name="room_name" 
                                            placeholder="Computer Laboratory" 
                                            className="border rounded-md p-2 w-full" 
                                        />

                                        <label className="text-lg font-medium ">Glossary</label>
                                        <input
                                            type="text"
                                            name="glossary"
                                            placeholder="Meeting space"
                                            className="border rounded-md p-2 w-full"
                                        />
                                        <label className="text-lg font-medium">Description</label>
                                        <textarea
                                            className="border rounded-md p-2 w-full h-[200px]"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label className="text-lg font-medium">Building</label>
                                        <select
                                            name="building"
                                            className="border rounded-md p-2 w-full"
                                        >
                                            <option value="">Select Building</option>
                                            <option value="Main Building">Main Building</option>
                                            <option value="Annex Building">Annex Building</option>
                                        </select>
                                        <label className="text-lg font-medium ">Room Number</label>
                                        <input
                                            type="text"
                                            name="room_number"
                                            placeholder="101"
                                            className="border rounded-md p-2 w-full"
                                        />
                                        <label className="text-lg font-medium ">Capacity</label>
                                        <input
                                            type="number"
                                            name="capacity"
                                            placeholder="50"
                                            className="border rounded-md p-2 w-full"
                                        />
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
                        </div>

                    </div>
                </div>

            );
        }