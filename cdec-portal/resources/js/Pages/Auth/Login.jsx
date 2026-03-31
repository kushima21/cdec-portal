
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    return (
            <>
                <div className='w-full min-h-screen bg-white'>
                    <div className='w-full flex items-center justify-center gap-2'>
                        <div className='w-[40%] min-h-screen flex flex-col items-center justify-center '>
                            <Link 
                                href={route('welcome')}
                                className='absolute top-6 left-6 text-sm text-orange-600 font-semibold hover:underline'
                            >
                                ← Go back home
                            </Link>
                            <img className='w-[120px] drop-shadow-md mb-6' src='/system-images/cdec-logo.png' />

                            <h2 className='text-2xl font-bold text-center'>Sign in to your CDEC Connect</h2>
                            <p className='text-gray-600 mb-8'>
                                <span className='mr-1'>or</span>
                                
                                    <Link 
        href={route('register')} 
        className='text-orange-600 font-semibold hover:underline'
    >
        Start to enroll today!
    </Link>
                            </p>

                            <form method='POST' className='w-full max-w-md space-y-6'>
                                {/* Email */}
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold'>Email</label>
                                    <input 
                                        type='text'
                                        className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'
                                        placeholder='Enter your email'
                                    />
                                </div>

                                {/* Password */}
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold'>Password</label>
                                    <input 
                                        type='password'
                                        className='w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400'
                                        placeholder='Enter your password'
                                    />
                                </div>

                                {/* Remember & Forgot */}
                                <div className='flex items-center justify-between text-sm'>
                                    <label className='flex items-center gap-2 cursor-pointer'>
                                        <input type='checkbox' />
                                        Remember me
                                    </label>
                                    <p className='text-orange-600 cursor-pointer hover:underline'>
                                        Forgot Password
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className='flex flex-col gap-4 pt-2'>
                                    <button 
                                        type='submit'
                                        className='w-full h-[45px] bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md hover:scale-[1.02] transition'
                                    >
                                        Sign in Now
                                    </button>

                                    <div className='text-center text-gray-500 text-sm'>or continue with</div>

                                    <button 
                                        type='button'
                                        className='w-full h-[45px] border font-semibold rounded-md hover:bg-gray-50 transition'
                                    >
                                        Sign in with Google
                                    </button>
                                </div>

                            </form>

                            <p className='text-xs text-gray-500 text-center mt-10 max-w-md leading-relaxed'>
                                By clicking <span className='font-semibold'>“Sign in”</span>, you agree to our  
                                <span className='text-orange-600 font-semibold p-2'>Terms of Service</span>and <span className='text-orange-600 font-semibold p-2'>Privacy Statement</span>. We’ll occasionally send you 
                                account-related emails.
                            </p>

                        </div>
                        <div className='w-[40%] min-h-screen flex items-center justify-center'>
                            <img 
                                src='/system-images/LoginCdec.png' 
                                className='w-[72%] rounded-2xl'
                            />
                        </div>
                    </div>
                </div>
            </>
    );
}