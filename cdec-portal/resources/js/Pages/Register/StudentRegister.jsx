import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';

export default function StudentRegister() {

    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        prefix: '',
        suffix: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        age: '',
        gender: '',
        civil_status: '',
        contact_number: '',
        address: '',
        emergency_fullname: '',
        emergency_address: '',
        emergency_number: ''

    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

const handleSubmit = () => {
    router.post('/student/register', form, {
        onSuccess: () => {
            setStep(4);

            setTimeout(() => {
                router.visit('/preenroll');
            }, 1500);
        }
    });
};

    const stepText = [
        "Personal Information",
        "Emergency Details",
        "Review & Confirmation",
        "Registration Complete"
    ];

    const inputStyle = "w-full h-[45px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition";

    const renderStep = () => {
        switch (step) {

            case 1:
                return (
                    <>
                        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Personal Information</h2>

                        <div className='grid md:grid-cols-2 gap-4'>
                            <select name="prefix" value={form.prefix} onChange={handleChange} className={inputStyle}>
                                <option value="">Prefix</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                            </select>

                            <select name="suffix" value={form.suffix} onChange={handleChange} className={inputStyle}>
                                <option value="">Suffix</option>
                                <option>Jr.</option>
                                <option>Sr.</option>
                            </select>
                        </div>

                        <div className='grid md:grid-cols-3 gap-4'>
                            <input name="first_name" value={form.first_name}  onChange={handleChange} placeholder="First Name" className={inputStyle}  />
                            <input name="middle_name" value={form.middle_name} onChange={handleChange} placeholder="Middle Name" className={inputStyle} />
                            <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" className={inputStyle} />
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                            <input type="date" name="birth_date" value={form.birth_date} onChange={handleChange} className={inputStyle} />
                            <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className={inputStyle} />
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                            <select name="gender" value={form.gender} onChange={handleChange} className={inputStyle}>
                                <option value="">Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            <select name="civil_status" value={form.civil_status} onChange={handleChange} className={inputStyle}>
                                <option value="">Civil Status</option>
                                <option>Single</option>
                                <option>Married</option>
                            </select>
                        </div>

                        <input name="contact_number" value={form.contact_number} onChange={handleChange} placeholder="Contact Number" className={inputStyle} />
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className={inputStyle} />
                    </>
                );

            case 2:
                return (
                    <>
                        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Emergency Details</h2>

                        <input name="emergency_fullname" value={form.emergency_fullname} onChange={handleChange} placeholder="Full Name" className={inputStyle} />
                        <input name="emergency_address" value={form.emergency_address} onChange={handleChange} placeholder="Address" className={inputStyle} />
                        <input name="emergency_number" value={form.emergency_number} onChange={handleChange} placeholder="Contact Number" className={inputStyle} />
                    </>
                );



            case 3:
                return (
                    <>
                        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Review & Confirmation</h2>

                        <div className='bg-gray-50 p-5 rounded-xl border space-y-2'>
                            {Object.entries(form).map(([key, value]) => (
                                <div key={key} className='flex justify-between text-sm border-b py-1'>
                                    <span className='capitalize text-gray-600'>{key.replace('_', ' ')}</span>
                                    <span className='font-medium text-gray-800'>{value || '-'}</span>
                                </div>
                            ))}
                        </div>
                    </>
                );

            case 4:
                return (
                    <div className='text-center py-10'>
                        <h2 className='text-3xl font-bold text-green-600 mb-2'>🎉 Registration Successful</h2>
                        <p className='text-gray-600'>Student has been successfully registered.</p>
                    </div>
                );
        }
    };

    return (
        <AdminLayout>
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white p-5'>

                <div className='w-full max-w-4xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-10'>

                    <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
                        Student Registration
                    </h2>

                    {/* Stepper */}
                    <div className='flex items-center justify-between mb-6 relative'>
                        {[1, 2, 3, 4].map((num, index) => (
                            <div key={num} className="flex-1 flex items-center">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold z-10 ${
                                        step >= num
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                    }`}
                                >
                                    {num}
                                </div>

                                {index < 3 && (
                                    <div
                                        className={`flex-1 h-1 ${
                                            step > num ? 'bg-orange-500' : 'bg-gray-300'
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <p className='text-center text-gray-500 mb-6'>{stepText[step - 1]}</p>

                    <form className='space-y-4'>
                        {renderStep()}

<div className='flex justify-between mt-6'>

    {step > 1 && step < 4 && (
        <button
            type="button"
            onClick={prevStep}
            className='px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition'>
            Back
        </button>
    )}

    {step < 3 && (
        <button
            type="button"
            onClick={nextStep}
            className='ml-auto px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition'>
            Next
        </button>
    )}

    {step === 3 && (
        <button
            type="button"
            onClick={handleSubmit}
            className='ml-auto px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'>
            Submit
        </button>
    )}

</div>
                    </form>

                </div>
            </div>
        </AdminLayout>
    );
}