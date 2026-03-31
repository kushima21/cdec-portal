import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className='w-full min-h-screen bg-gray-50'>

                {/* NAVBAR */}
                <div className='w-full h-max fixed flex items-center z-50 justify-center pt-5'>
                    <div className='flex items-center w-[95%] backdrop-blur-md bg-white/80 shadow-lg rounded-xl justify-between px-10 py-3 h-max gap-20'>
                        <Link href={route('welcome')}>
                        <div className='flex items-center cursor-pointer'>
                            <img className=' w-[120px] mr-3 drop-shadow-md' src='/system-images/cdec-logo.png'></img>
                            <div className='w-max gap-3'>
                                <h2 className='text-2xl font-bold text-orange-600'>Colegio de Kapatagan</h2>
                                <h2 className='text-xl text-gray-600'>"Quality Education By All Means Necessary"</h2>
                            </div>
                        </div>
                        </Link>

                        <div>
                            <ul className='flex gap-12 cursor-pointer font-medium text-gray-700'>
                                <li className='hover:text-orange-600 transition'>
                                    <Link href={route('about')}>About Us</Link>
                                </li>
                                <li className='hover:text-orange-600 transition'>Organization</li>
                                <li className='hover:text-orange-600 transition'>Academics</li>
                                <li className='hover:text-orange-600 transition'><Link href={('contact_us')}>Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className='flex ml-10 items-center gap-5'>
                            <Link href={route('login')}>
                                <button
                                    type="button"
                                    className="w-[130px] h-[40px] bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link href={route('register')}>
                                <button 
                                    type='button' 
                                    className='w-[130px] h-[40px] border border-orange-400 text-orange-600 font-bold rounded-md shadow-md hover:bg-orange-50 hover:scale-105 transition'
                                >
                                    Enroll Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* HERO */}
                <div className='w-full h-[90%] flex items-center pt-[250px] pb-20 justify-center px-10'>
                    <div className='w-[35%] h-max'>
                        <h2 className='text-3xl font-bold text-gray-800'>Welcome To Colegio de Kapatagan</h2>
                        <h2 className='text-4xl mt-2 text-gray-800'>
                            <span className='text-orange-500 font-bold'>Master the Skills</span> to Drive your{' '}
                            <span className='text-orange-600 font-bold'>Career</span> and{' '}
                            <span className='text-orange-600 font-bold'>Personality.</span>
                        </h2>
                        <p className='pt-4 text-lg text-gray-600'>
                            Minimum theory and maximum practice with activities to boost your skill.
                            Solve tasks and check the results right away.
                        </p>
                        <Link href={route('register')}>
                                   <button
                        type="button"
                        className="w-[130px] h-[40px] mt-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition"
                        >
                        Enroll Now
                        </button></Link>                       
                    </div>

                    <div className='flex items-center justify-center'>
                        <img src='/system-images/landing-image.png' className='w-[100%] drop-shadow-xl'></img>
                    </div>
                </div>

                {/* FEATURES */}
                <div className="w-full h-max flex items-center justify-center">
                    <div className='w-full h-full flex flex-wrap items-center justify-center pb-16 pt-10 gap-10 px-6'>
                        
                        <div className="w-[40%] h-max bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition p-10">
                            <h2 className='text-xl font-bold text-orange-600'>Excellence in Education</h2>
                            <h2 className='text-2xl font-bold text-gray-800'>World-Class Learning for a Brighter Tomorrow</h2>
                            <p className='pt-4 text-lg text-gray-600'>
                                Education is a lifelong journey with endless opportunities.
                                Stop searching and start building an amazing future with us.
                            </p>
                        </div>

                        <div className="w-[40%] h-max bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition p-10">
                            <h2 className='text-xl font-bold text-orange-600'>Unlock Your Potential</h2>
                            <h2 className='text-2xl font-bold text-gray-800'>Expand Your Possibilities and Build a Successful Career</h2>
                            <p className='pt-4 text-lg text-gray-600'>
                                Discover simple and effective steps to boost productivity and achieve your goals faster.
                            </p>
                        </div>

                        <div className="w-[40%] h-max bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition p-10">
                            <h2 className='text-xl font-bold text-orange-600'>Learn from Industry Experts</h2>
                            <h2 className='text-2xl font-bold text-gray-800'>Gain Practical Skills That Matter in the Real World</h2>
                            <p className='pt-4 text-lg text-gray-600'>
                                Our programs focus on hands-on experience to prepare you for real challenges and career growth.
                            </p>
                        </div>

                        <div className="w-[40%] h-max bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition p-10">
                            <h2 className='text-xl font-bold text-orange-600'>Flexible and Modern Learning</h2>
                            <h2 className='text-2xl font-bold text-gray-800'>Study Anytime, Anywhere at Your Own Pace</h2>
                            <p className='pt-4 text-lg text-gray-600'>
                                Learn comfortably with our modern platform designed for convenience, accessibility, and success.
                            </p>
                        </div>
                    </div>
                </div>

               {/* PROGRAMS */}
               <div className='w-full h-max pb-20'>
                    <h2 className='text-2xl pl-40 font-bold pb-10 text-gray-800'>Programs Offered</h2>

                    <div className='w-full h-max flex items-center justify-center gap-10'>
                    
                    <div className='w-[28%] h-[340px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col'>
                        <div>
                            <div className='w-full h-max flex items-center justify-center p-5 gap-2'>
                                <img src='/system-images/cba.jpg' className='w-[22%] rounded-md' />
                                <h2 className='text-xl font-bold'>Bachelor of Science in Business Administration</h2>
                            </div>

                            <div className='px-5'>
                                <p className='text-lg pt-2 text-gray-600'>
                                    Develop strong leadership and management skills in finance, marketing, and operations.
                                    This program prepares students for careers in business management and entrepreneurship.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-[130px] h-[40px] mt-auto mb-6 self-center bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition"
                        >
                            Enroll Now
                        </button>
                    </div>

                    <div className='w-[28%] h-[340px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col'>
                        <div>
                            <div className='w-full h-max flex items-center justify-center p-5 gap-2'>
                                <img src='/system-images/crim.jpg' className='w-[22%] rounded-md' />
                                <h2 className='text-xl font-bold'>Bachelor of Science in Criminology</h2>
                            </div>

                            <div className='px-5'>
                                <p className='text-lg pt-2 text-gray-600'>
                                    Gain knowledge in criminal law, investigation, and public safety.
                                    Ideal for students aiming to serve in law enforcement and security professions.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-[130px] h-[40px] mt-auto mb-6 self-center bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition"
                        >
                            Enroll Now
                        </button>
                    </div>

                    <div className='w-[28%] h-[340px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col'>
                        <div>
                            <div className='w-full h-max flex items-center justify-center p-5 gap-3'>
                                <img src='/system-images/educ.jpg' className='w-[22%] rounded-md' />
                                <h2 className='text-xl font-bold'>Bachelor of Science in Education</h2>
                            </div>

                            <div className='px-5'>
                                <p className='text-lg pt-2 text-gray-600'>
                                    Learn modern teaching strategies and educational foundations.
                                    Designed for future educators passionate about shaping the next generation.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-[130px] h-[40px] mt-auto mb-6 self-center bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition"
                        >
                            Enroll Now
                        </button>
                    </div>

                    </div>

                    <div className='w-full pt-10 flex items-center justify-center'>
                        <button
                           className='w-[130px] h-[40px] border border-orange-400 text-orange-600 font-bold rounded-md shadow-md hover:bg-orange-50 hover:scale-105 transition'
                        >
                            See More...
                        </button>
                    </div>
                </div>

                {/* FOOTER */}
                <div className='w-full h-[60%] bg-gradient-to-b from-white to-gray-100'>
                    <div className='w-full h-full flex items-center justify-center gap-8 flex-wrap px-6'>
                        <div className='w-[350px] h-[400px] bg-white rounded-xl shadow-lg p-6'>
                            <img src='/system-images/cdec-logo.png' className='w-[30%] drop-shadow mb-4'></img>
                            <h2 className='text-xl text-gray-700'>We provide an environment where students develop into empathetic, self-directed, critical thinkers who don’t give up when faced with challenges.</h2>
                        </div>

                        <div className='w-[350px] h-[400px] bg-white rounded-xl shadow-lg p-6'>
                            <h2 className='text-2xl font-bold'>Notices</h2>
                            <hr className="w-10 mt-4 border-orange-500" />
                            <hr className="w-20 mt-2 border-orange-500 mb-4" />
                            <h2 className='text-lg pt-2'>Privacy Statement</h2><hr />
                            <h2 className='text-lg pt-4'>Usage Policy</h2><hr />
                            <h2 className='text-lg pt-4'>Copy Right</h2><hr />
                            <h2 className='text-lg pt-4'>Disclaimer</h2><hr />
                        </div>

                        <div className='w-[350px] h-[400px] bg-white rounded-xl shadow-lg p-6'>
                            <h2 className='text-2xl font-bold'>Partners</h2>
                            <hr className="w-10 mt-4 border-orange-500" />
                            <hr className="w-20 mt-2 border-orange-500 mb-4" />
                            <h2 className='text-lg pt-2'>Municipality of Kapatagan</h2><hr />
                            <h2 className='text-lg pt-4'>Province of Lanao del Norte</h2><hr />
                            <h2 className='text-lg pt-4'>CHED Region X</h2><hr />
                            <h2 className='text-lg pt-4'>UniFast</h2><hr />
                        </div>

                        <div className='w-[350px] h-[400px] rounded-xl flex items-center justify-center flex-wrap text-gray-700'>
                            <div className='w-full h-max mb-6'>
                                <p className='font-semibold'>Address</p>
                                Villa Elena, Poblacion, Kapatagan, Lanao del Norte, Philippines 9214
                            </div>
                            <div className='w-full h-max mb-6'>
                                <p className='font-semibold'>Admission</p>
                                +63 63222 9414<br/>admission@cdek.edu.ph
                            </div>
                            <div className='w-full h-max'>
                                <p className='font-semibold'>Registrar</p>
                                +63 63222 9414<br/>registrar@cdek.edu.ph
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <p className="text-center text-sm italic text-gray-500 pt-2 pb-6">
                © 2025 Colegio de Kapatagan. All rights reserved.
                </p>
            </div>
        </>
    );
}