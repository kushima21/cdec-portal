import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function StudentRegister() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        // Personal Info
        prefix: '',
        suffix: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        contact_number: '',
        address: '',
        // Emergency Details
        emergency_fullname: '',
        emergency_address: '',
        emergency_number: '',
        // Academic Info
        previous_school: '',
        school_address: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = () => {
        router.post('/student/register', form);
        setStep(step + 1); // move to success message
    };

    const stepText = [
        "Personal Information",
        "Emergency Details",
        "Academic Information",
        "Review & Confirmation",
        "Registration Complete"
    ];

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <>
                        <h2 className='text-2xl font-bold mb-6'>Personal Information</h2>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Prefix</label>
                                <select name="prefix" value={form.prefix} onChange={handleChange} className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'>
                                    <option value="">Select Prefix</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Suffix</label>
                                <select name="suffix" value={form.suffix} onChange={handleChange} className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'>
                                    <option value="">Select Suffix</option>
                                    <option value="Jr.">Jr.</option>
                                    <option value="Sr.">Sr.</option>
                                    <option value="III">III</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 mt-2'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>First Name</label>
                                <input type='text' name="first_name" value={form.first_name} onChange={handleChange} placeholder='Enter your first name' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Middle Name</label>
                                <input type='text' name="middle_name" value={form.middle_name} onChange={handleChange} placeholder='Enter your middle name' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                            </div>
                        </div>

                        <div className='flex flex-col w-full mt-2'>
                            <label className='font-semibold mb-1'>Last Name</label>
                            <input type='text' name="last_name" value={form.last_name} onChange={handleChange} placeholder='Enter your last name' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 mt-2'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Birth Date</label>
                                <input type='date' name="birth_date" value={form.birth_date} onChange={handleChange} className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Gender</label>
                                <select name="gender" value={form.gender} onChange={handleChange} className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col w-full mt-2'>
                            <label className='font-semibold mb-1'>Contact Number</label>
                            <input type='tel' maxLength={11} inputMode="numeric" name="contact_number" value={form.contact_number} onChange={handleChange} placeholder='09XXXXXXXXX' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>

                        <div className='flex flex-col w-full mt-2'>
                            <label className='font-semibold mb-1'>Address</label>
                            <input type='text' name="address" value={form.address} onChange={handleChange} placeholder='Address' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                        <h2 className='text-2xl font-bold mb-6'>Emergency Details</h2>
                        <div className='flex flex-col w-full'>
                            <label className='font-semibold mb-1'>Full Name</label>
                            <input type='text' name="emergency_fullname" value={form.emergency_fullname} onChange={handleChange} placeholder='Emergency Contact Full Name' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>
                        <div className='flex flex-col w-full mt-2'>
                            <label className='font-semibold mb-1'>Address</label>
                            <input type='text' name="emergency_address" value={form.emergency_address} onChange={handleChange} placeholder='Emergency Address' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>
                        <div className='flex flex-col w-full mt-2'>
                            <label className='font-semibold mb-1'>Contact Number</label>
                            <input type='tel' maxLength={11} inputMode="numeric" name="emergency_number" value={form.emergency_number} onChange={handleChange} placeholder='09XXXXXXXXX' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>
                    </>
                );

            case 3:
                return (
                    <>
                        <h2 className='text-2xl font-bold mb-6'>Academic Information</h2>
                        <div className='flex flex-col w-full'>
                            <label className='font-semibold mb-1'>Previous School</label>
                            <input type='text' name="previous_school" value={form.previous_school} onChange={handleChange} placeholder='Previous School' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>
                        <div className='flex flex-col w-full mt-2'>
                            <label className='font-semibold mb-1'>School Address</label>
                            <input type='text' name="school_address" value={form.school_address} onChange={handleChange} placeholder='School Address' className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'/>
                        </div>
                    </>
                );

            case 4:
                return (
                    <>
                        <h2 className='text-2xl font-bold mb-6'>Review & Confirmation</h2>
                        <div className='space-y-2'>
                            {Object.entries(form).map(([key, value]) => (
                                <div key={key} className='flex flex-col md:flex-row gap-2'>
                                    <span className='font-semibold w-1/3 capitalize'>{key.replace('_',' ')}</span>
                                    <span className='w-2/3'>{value}</span>
                                </div>
                            ))}
                        </div>
                    </>
                );

            case 5:
                return (
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold mb-4 text-green-600'>Registration Successful!</h2>
                        <p>Thank you for submitting your information.</p>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className='w-full min-h-screen bg-white flex items-center justify-center p-5'>
            <div className='w-full max-w-4xl flex justify-center flex-col items-center p-10 rounded-2xl shadow-lg relative'>
                <h2 className='font-bold text-2xl mb-6 text-center'>Register Student Account Information!</h2>

                {/* Stepper */}
                <div className='flex flex-col items-center w-full mb-4'>
                    <div className='flex justify-center w-full mb-2'>
                        <div className='flex items-center gap-4'>
                            {[1,2,3,4,5].map((item) => (
                                <div key={item} className='flex items-center'>
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold
                                        ${step >= item ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                        {item}
                                    </div>
                                    {item !== 5 && (
                                        <div className={`w-16 h-1 mx-2 ${step > item ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step text below stepper */}
                    <span className='text-gray-600 font-medium'>{stepText[step - 1]}</span>
                </div>

                <form className='w-full space-y-4'>
                    {renderStep()}

                    <div className='flex justify-between mt-6'>
                        {step > 1 && step < 5 && (
                            <button type='button' onClick={prevStep} className='px-4 py-2 bg-gray-400 text-white rounded'>Back</button>
                        )}
                        {step < 4 && (
                            <button type='button' onClick={nextStep} className='px-4 py-2 bg-orange-500 text-white rounded'>Next</button>
                        )}
                        {step === 4 && (
                            <button type='button' onClick={handleSubmit} className='px-4 py-2 bg-green-500 text-white rounded'>Submit</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}