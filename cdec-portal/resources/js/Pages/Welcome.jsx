    import { useState } from 'react';
    import { Head, Link } from '@inertiajs/react';
    import { FaUser, FaMoon, FaSun } from 'react-icons/fa'; // Icons

    export default function Welcome() {
    const [isDark, setIsDark] = useState(false); // Light mode initially

        const toggleDarkMode = () => {
            setIsDark(!isDark);

            // Optional: toggle Tailwind dark mode class
            if (!isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        return (
            <>
                <div className='w-full h-screen'>
                    <Head title='Welcome' />
                    <div className='w-full h-full flex items-center '>
                        <div className='w-[50%] h-full'>
                            <div className='w-full h-full flex items-center justify-center'>
                                <div className='w-[70%] h-full shadow-xl'>
                                    <button
                                        onClick={toggleDarkMode}
                                        className="m-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 transition-all"
                                    >
                                        {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
                                    </button>
                                    <div className='w-full h-max flex items-center pt-5 justify-center'>
                                        <img className='w-[25%] h-[25%] object-contain' src='/system-images/cdec-logo.png' alt='CDEC Logo' />
                                    </div>

                                    <h1 className='text-4xl text-center pt-7 font-bold text-orange-800 dark:text-orange-600'>
                                        Welcome to CDEC Portal
                                        </h1>

                                    <h3 className='text-lg text-center text-orange-500 pt-2 dark:text-gray-600'>
                                        Signin to access your account
                                    </h3>

                                    <span className='flex items-center justify-center'>
                                        or
                                    </span>

                                    <Link href="/register" className='text-blue-500 hover:text-blue-700 pt-2'>
                                        <h2 className='text-center text-lg'>Enroll Now</h2>
                                    </Link>
                                    <div className='w-full h-max flex-col'>
                                        <form method="">
                                            <div className='w-full h-max flex-col items-center justify-center pt-5'>
                                                <div className='w-full h-max flex-col items-center justify-center'>
                                                    <label className='text-gray-700 dark:text-gray-400'>Email</label>
                                                    <input type="email" name="email" className='w-full h-10 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                                                </div>
                                                <div className='w-full h-max flex-col items-center justify-center pt-5'>
                                                    <label className='text-gray-700 dark:text-gray-400'>Password</label>
                                                    <input type="password" name="password" className='w-full h-10 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                                                </div>
                                                <div className='w-full mt-2 p-2 flex items-center justify-between'>
                                                    <div className='flex items-center'>
                                                        <input type="checkbox" id="remember" name="remember" className='mr-2' />
                                                        <label for="remember" className=''>Remember Me</label>
                                                    </div>
                                                    <a href=''>Forgot Password?</a>
                                                </div>
                                                <button type="submit" className='w-full h-10 mt-5 bg-orange-200 text-white rounded-md hover:bg-orange-600 transition-colors'>
                                                    Sign In
                                                </button>
                                                <span className='text-center flex justify-center pt-4'>or continue in</span>
                                                <a href='/'>
                                                    <button type="button" className='w-full h-10 mt-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center'>
                                                        <FaUser className='mr-2' />
                                                        Sign in with Google
                                                    </button>
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[50%] h-full flex items-center  '>
                            
                        </div>
                    </div>
                </div>
            </>
        );
    }