    import { router } from '@inertiajs/react';
    import { FaTimes } from 'react-icons/fa'; 

    export default function ModalColleges ({ setIsModalOpen }) {
        return(
            
                <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">

                    <div className="w-full h-full justify-center flex overflow-y-auto pt-10 pb-8">

                        {/*MODAL CONTENT*/}
                        <div className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col">

                            {/*HEADER */}
                                <div className="w-full flex items-center justify-between border-b pb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                            Add New College
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

                            {/*FORM */}
                            <form className="w-full flex flex-col gap-6 pt-6">
                                
                                {/*TITLE*/}
                                <div>
                                    <h2 className="text-2xl font-bold">College Details</h2>
                                    <p>Enter the required information to register a college.</p>
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
                                            className="border rounded-md p-2 w-full" 
                                        />

                                        
                                        <label className="text-lg font-medium">Abbreviation</label>
                                        <input 
                                            type="file" 
                                            name="abbreviation" 
                                            placeholder="BSCS" 
                                            className="border rounded-md p-2 w-full h-[200px]" 
                                        />

                                        <label className="text-lg font-medium">Dean</label>
                                        <select 
                                            name='dean'
                                            className="border rounded-md p-2 w-full"
                                        > 
                                            <option value={''}></option>
                                            <option value={''}></option>
                                            <option value={''}></option>
                                        </select>

                                    </div>
                                    {/* RIGHT */}
                                    <div className="flex-1 flex flex-col gap-4">

                                        <label className="text-lg font-medium">Name</label>
                                        <input 
                                            type="text" 
                                            name="college_name" 
                                            placeholder="Computer Science" 
                                            className="border rounded-md p-2 w-full" 
                                        />

                                        <label className="text-lg font-medium">Email</label>
                                        <input 
                                            type="text" 
                                            name="email" 
                                            placeholder="@cdek.edu.ph" 
                                            className="border rounded-md p-2 w-full" 
                                        />

                                        <label className="text-lg font-medium">Associate Dean</label>
                                        <select 
                                            name='associate_dean'
                                            className="border rounded-md p-2 w-full"
                                        >
                                            <option value={''}></option>
                                            <option value={''}></option>
                                            <option value={''}></option>

                                        </select>

                                    </div>
                                </div>
                                <div className='w-full'>
                                    <label for="description" className='text-lg font-medium'>Description</label>
                                    <textarea 
                                        name=""
                                        placeholder="Enter detailed information about the college (e.g., history, mission, vision, programs offered, facilities, and other relevant details)..."
                                        className='w-full h-[200px] border rounded-md p-2'
                                    />
                                </div>
                                <div className='w-full'>
                                    <button 
                                        type=''
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