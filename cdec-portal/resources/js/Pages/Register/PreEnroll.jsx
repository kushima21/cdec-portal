import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout'; 

export default function PreEnroll() {

    const [step, setStep] = useState(0);

    const [form, setForm] = useState({
        status: '',
        program: ''
    });

    const handleSubmit = () => {
        router.post('/pre-enroll', form);
    };

    return (
        <AdminLayout>
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br to-white p-5'>
                <div className='w-full max-w-4xl bg-white/80 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-10'>
                    
                    {/* HEADER */}
                    <div className='flex items-center justify-center gap-5'>
                        <img className='w-[120px] drop-shadow-md mb-6' src='/system-images/cdec-logo.png' />
                        
                        <h2 className="text-2xl text-orange-600 font-semibold text-center">
                            Welcome to Colegio de Kapatagan
                        </h2>

                        <img className='w-[120px] drop-shadow-md mb-6' src='/system-images/cdec-logo.png' />
                    </div>

                    <p className='text-gray-700 mt-2 text-sm text-center'>
                        Online Registration Form for the Second Semester (SY: 2025-2026)
                    </p>

                    {/* STEP 0 */}
                    {step === 0 && (
                        <div className='flex justify-center mt-6'>
                            <button 
                                onClick={() => setStep(1)}
                                className='bg-orange-600 hover:bg-orange-700 text-orange-500 font-bold py-2 px-6 rounded-full shadow-md transition'>
                                Pre Register
                            </button>
                        </div>
                    )}

                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className='mt-8 text-center'>
                            <h3 className='text-lg font-semibold mb-4 text-orange-600'>
                                Select Student Status
                            </h3>

                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className='w-full max-w-sm border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none rounded-lg px-4 py-2 shadow'
                            >
                                <option value="">-- Select Status --</option>
                                <option value="New">New Student</option>
                                <option value="Old">Old Student</option>
                            </select>

                            <div className='mt-5'>
                                <button
                                    disabled={!form.status}
                                    onClick={() => setStep(2)}
                                    className='bg-orange-600 hover:bg-orange-700 text-orange-500 px-6 py-2 rounded-lg shadow disabled:opacity-50 transition'>
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className='mt-8 text-center'>
                            <h3 className='text-lg font-semibold mb-4 text-orange-600'>
                                Select Program
                            </h3>

                            <select
                                value={form.program}
                                onChange={(e) => setForm({ ...form, program: e.target.value })}
                                className='w-full max-w-sm border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none rounded-lg px-4 py-2 shadow'
                            >
                                <option value="">-- Select Program --</option>
                                <option value="BSIT">BSIT</option>
                                <option value="BSBA">BSBA</option>
                                <option value="BSED">BSED</option>
                                <option value="BEED">BEED</option>
                            </select>

                            <div className='mt-5 flex justify-center gap-3'>
                                <button
                                    onClick={() => setStep(1)}
                                    className='bg-orange-400 hover:bg-orange-500 text-blue-950 px-6 py-2 rounded-lg shadow transition'>
                                    Back
                                </button>

                                <button
                                    disabled={!form.program}
                                    onClick={handleSubmit}
                                    className='bg-orange-600 hover:bg-orange-700 text-orange-500 px-6 py-2 rounded-lg shadow disabled:opacity-50 transition'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AdminLayout>
    );
}