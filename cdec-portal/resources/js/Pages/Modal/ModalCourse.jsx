import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';  
import { useState } from 'react';

export default function ModalCourse ({ setIsModalOpen}) {

const [lecture, setLecture] = useState('');
const [lab, setLab] = useState('');
const total = (Number(lecture) || 0) + (Number(lab) || 0);

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Ensure total_units is always correct
    formData.set('total_units', total);

    router.post(route('courses.store'), formData, {
        onSuccess: () => setIsModalOpen(false),
    });
};

    return (
        <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">
            <div className="w-full h-full justify-center items-center flex overflow-y-auto pt-10 pb-8">
                
                {/*MODAL CONTENT*/}
                <div className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col">
                    
                    {/*HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Create New Course
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
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 pt-6">

                        {/*TITLE*/}
                        <div>
                            <h2 className="text-2xl font-bold">Course Details</h2>
                            <p>Enter the required information to register a college.</p>
                        </div>

                        {/* LEFT & RIGHT */}
                        <div className="w-full flex flex-row gap-12 pt-4">
                            
                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-2">
                                
                                <label className="text-lg font-medium">Course No</label>
                                <input 
                                    type="text" 
                                    name="course_no" 
                                    placeholder="CS101" 
                                    className="border rounded-md p-2 w-full" 
                                />

                                <label className="text-lg font-medium">Descriptive Title</label>
                                <input 
                                    type="text" 
                                    name="descriptive_title" 
                                    placeholder="Programming 1" 
                                    className="border rounded-md p-2 w-full" 
                                />

                                <label className="text-lg font-medium">Lecture Unit</label>
                                <input 
                                    type="number" 
                                    name="lecture_units" 
                                    value={lecture}
                                    onChange={(e) => setLecture(e.target.value)}
                                    className="border rounded-md p-2 w-full" 
                                />                                        

                                <label className="text-lg font-medium">Laboratory Unit</label>
                                <input 
                                    type="number" 
                                    name="lab_units" 
                                    value={lab}
                                    onChange={(e) => setLab(e.target.value)}
                                    className="border rounded-md p-2 w-full" 
                                />                                        

                                <label className="text-lg font-medium">Total Units</label>
                                <input 
                                    type="number" 
                                    name="total_units" 
                                    value={total}
                                    readOnly
                                    className="border rounded-md p-2 w-full bg-gray-100" 
                                />
                            </div>

                        </div>

                        <div className='w-full'>
                            <button 
                                type='submit'
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