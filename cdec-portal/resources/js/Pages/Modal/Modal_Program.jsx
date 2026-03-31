import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa'; 

export default function ModalProgram({ setIsModalOpen }) {
    return(
        <>
        <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">

            <div className="w-full h-full flex justify-center items-center overflow-y-auto pt-10 pb-8">
                
                {/* MODAL CONTENT */}
                <div
                className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col"
                >
                    
                        {/* HEADER */}
                        <div className="w-full flex items-center justify-between border-b pb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                    Add New Program                                         </h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>

                            <button 
                                 onClick={() => setIsModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                            >
                                <FaTimes className="text-xl" />
                            </button>                 
                        </div>

                        { /* FORM */}
                        <form className="w-full flex flex-col gap-6 pt-5">

                                {/* TITLE */}
                                <div>
                                    <h2 className="text-2xl font-bold">Program Details</h2>
                                    <p>Please provide accurate information for the program.</p>
                                </div>

                                 {/* LEFT & RIGHT */}
                                <div className="w-full flex flex-row gap-12 pt-4">

                                     {/* LEFT */}
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label className="text-lg font-medium">Abbreviation</label>
                                        <input 
                                            type="text" 
                                            name="abbreviation" 
                                            placeholder="BSCS" 
                                            className="border rounded-md p-3 w-full" 
                                        />
                                        <label className="text-lg font-medium">Name</label>
                                        <input 
                                            type="text" 
                                            name="program_name" 
                                            placeholder="Bachelor Science in Computer Science" 
                                            className="border rounded-md p-3 w-full" 
                                        />
                                        <label className="text-lg font-medium">Major</label>
                                        <input 
                                            type="text" 
                                            name="major" 
                                            placeholder="N/A" 
                                            className="border rounded-md p-3 w-full" 
                                        />                                                                              
                                    </div>
                                    {/*right */}
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label className="text-lg font-medium">College Department</label>
                                        <input 
                                            type="text" 
                                            name="college_name" 
                                            placeholder="College of Computer Science" 
                                            className="border rounded-md p-3 w-full" 
                                        />
                                        <label className="text-lg font-medium">College Duration</label>
                                        <input 
                                            type="text" 
                                            name="college_duration" 
                                            placeholder="4 YEARS" 
                                            className="border rounded-md p-3 w-full" 
                                        />
                                    </div>

                                </div>
                                <div className="w-full  justify-center">
                                        <label className="text-lg font-medium mt-2">Description</label>
                                        <textarea
                                            className="border rounded-md p-2 w-full h-[200px]"
                                        />  
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
        </>
    );
}