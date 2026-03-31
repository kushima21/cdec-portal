import { Head, Link } from '@inertiajs/react';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <div className='w-full min-h-screen bg-white flex items-center justify-center p-5'>
                
                {/* Main Form Container */}
                <div className='w-full max-w-3xl flex flex-col items-center  p-10 rounded-2xl shadow-lg relative'>

                    {/* Go Back Home */}
                    <Link 
                        href={route('welcome')}
                        className='absolute top-6 left-6 text-sm text-orange-600 font-semibold hover:underline'
                    >
                        ← Go back home
                    </Link>

                    {/* Logo */}
                    <img className='w-[120px] drop-shadow-md mb-6' src='/system-images/cdec-logo.png' />

                    {/* Header */}
                    <div className='text-center mb-6'>
                        <h2 className='text-3xl font-bold'>Start Your Journey</h2>
                        <p className='text-orange-600 font-semibold'>with</p>
                        <h2 className='text-2xl text-orange-600 font-semibold'>Colegio de Kapatagan</h2>
                        <p className='text-gray-700 mt-2 text-sm'>Online Registration Form for the Second Semester (SY: 2025-2026)</p>
                    </div>

                    {/* Notice */}
                    <div className='bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-10 mb-8 text-2sm rounded text-center'>
                        NOTICE! If you are an existing student, please login to your account here. This form is intended for new and transferring students only.
                    </div>

                    {/* Form */}
                    <form method='POST' className='w-full space-y-4'>

                        {/* First & Last Name */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>First Name</label>
                                <input 
                                    type='text'
                                    className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'
                                    placeholder='Enter your first name'
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Last Name</label>
                                <input 
                                    type='text'
                                    className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'
                                    placeholder='Enter your last name'
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className='flex flex-col'>
                            <label className='font-semibold mb-1'>Email</label>
                            <input 
                                type='email'
                                className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'
                                placeholder='Enter your email'
                            />
                        </div>

                        {/* Password & Confirm Password */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Password</label>
                                <input 
                                    type='password'
                                    className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'
                                    placeholder='Enter your password'
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Confirm Password</label>
                                <input 
                                    type='password'
                                    className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'
                                    placeholder='Confirm your password'
                                />
                            </div>
                        </div>

                        {/* Agreement */}
                        <p className='text-sm text-gray-600 text-center'>
                            By selecting this, you agree to the <span className='text-orange-600 font-semibold'>Privacy Policy</span> and <span className='text-orange-600 font-semibold'>Cookie Policy</span>.
                        </p>

                        {/* Register Button */}
                        <div className='flex flex-col gap-2'>
                            <button 
                                type='submit'
                                className='w-full h-[45px] bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md hover:scale-[1.02] transition'
                            >
                                Register
                            </button>
                            <p className='text-center text-sm text-gray-600'>
                                Already have an Account? <Link href={route('login')} className='text-orange-600 font-semibold hover:underline'>Login Here</Link>
                            </p>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
}