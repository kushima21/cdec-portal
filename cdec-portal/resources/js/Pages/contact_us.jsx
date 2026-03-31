import { Link } from '@inertiajs/react';

export default function Contact() {
    return (
        <div className='w-full min-h-screen bg-gray-50'>
          {/* NAVBAR */}
                <div className='w-full h-max fixed flex items-center z-50 justify-center pt-5'>
                    <div className='flex items-center w-[95%] backdrop-blur-md bg-white/80 shadow-lg rounded-xl justify-between px-10 py-3 h-max gap-20'>
                        <Link href={route('welcome')}>
                            <div className='flex items-center cursor-pointer'>
                                <img className='w-[120px] mr-3 drop-shadow-md' src='/system-images/cdec-logo.png' />
                                <div className='w-max gap-3'>
                                    <h2 className='text-2xl font-bold text-orange-600'>Colegio de Kapatagan</h2>
                                    <h2 className='text-xl text-gray-600'>"Quality Education By All Means Necessary"</h2>
                                </div>
                            </div>
                        </Link>

                        <div>
                            <ul className='flex gap-12 cursor-pointer font-medium text-gray-700'>
                                <li className='hover:text-orange-600 transition'><Link href={route('about')}>About Us</Link></li>
                                <li className='hover:text-orange-600 transition'>Organization</li>
                                <li className='hover:text-orange-600 transition'>Academics</li>
                                <li className='font-bold text-orange-600'><Link href={('contact_us')}>Contact Us</Link></li>
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

             {/* CONTENT */}
              <div className='w-full h-[90%] flex flex-col items-center justify-center pt-[250px] px-6'>
                    <h2 className='text-4xl font-extrabold text-center mb-12 text-gray-800'>Contact Us</h2>

                    <p className='max-w-2xl text-center text-lg leading-relaxed text-gray-600'>
                        We would love to hear from you. If you have any questions, inquiries, or 
                        need assistance regarding admissions, programs, or student services, 
                        feel free to reach out to us. Our team is always ready to provide the 
                        support and information you need. You may contact us through phone, 
                        email, or by visiting our campus during office hours.
                    </p>

                        <div className='w-full h-max flex pt-20 flex-wrap items-center justify-center gap-10'>
                            
                            <div className='w-[450px] h-[350px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col items-center justify-center p-8 text-center'>
                                <h3 className='text-2xl font-bold mb-4 text-orange-600'>Visit Our Campus</h3>
                                <p className='text-gray-600'>
                                    Colegio de Kapatagan is located in Kapatagan, Lanao del Norte. 
                                    Visit our campus to explore our facilities, meet our faculty, 
                                    and learn more about our academic programs.
                                </p>
                            </div>

                            <div className='w-[450px] h-[350px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col items-center justify-center p-8 text-center'>
                                <h3 className='text-2xl font-bold mb-4 text-orange-600'>Call Us</h3>
                                <p className='text-gray-600'>
                                    Have questions? Our offices are open during business hours. 
                                    Contact us through our telephone and mobile numbers for 
                                    immediate assistance and inquiries.
                                </p>
                            </div>

                            <div className='w-[450px] h-[350px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col items-center justify-center p-8 text-center'>
                                <h3 className='text-2xl font-bold mb-4 text-orange-600'>Email Us</h3>
                                <p className='text-gray-600'>
                                    Send us your concerns and requests via email. 
                                    Our support team will respond promptly to assist 
                                    you with admissions, programs, and student services.
                                </p>
                            </div>

                        </div>
                </div>

                <div className='w-full h-[60%] bg-gradient-to-b from-white to-gray-100 mt-24'>
                    <div className='w-full h-full flex items-center justify-center gap-8 flex-wrap px-6'>
                        
                        <div className='w-[350px] h-[400px] bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition'>
                            <img src='/system-images/cdec-logo.png' className='w-[30%] drop-shadow mb-4'></img>
                            <h2 className='text-xl text-gray-700 leading-relaxed'>
                                We provide an environment where students develop into empathetic, 
                                self-directed, critical thinkers who don’t give up when faced with challenges.
                            </h2>
                        </div>

                        <div className='w-[350px] h-[400px] bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition'>
                            <h2 className='text-2xl font-bold'>Notices</h2>
                            <hr className="w-10 mt-4 border-orange-500" />
                            <hr className="w-20 mt-2 border-orange-500 mb-4" />
                            <h2 className='text-lg pt-2 hover:text-orange-600 cursor-pointer'>Privacy Statement</h2>
                            <hr />
                            <h2 className='text-lg pt-4 hover:text-orange-600 cursor-pointer'>Usage Policy</h2>
                            <hr />
                            <h2 className='text-lg pt-4 hover:text-orange-600 cursor-pointer'>Copy Right</h2>
                            <hr />
                            <h2 className='text-lg pt-4 hover:text-orange-600 cursor-pointer'>Disclaimer</h2>
                            <hr />
                        </div>

                         <div className='w-[350px] h-[400px] bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition'>
                            <h2 className='text-2xl font-bold'>Partners</h2>
                            <hr className="w-10 mt-4 border-orange-500" />
                            <hr className="w-20 mt-2 border-orange-500 mb-4" />
                            <h2 className='text-lg pt-2'>Municipality of Kapatagan</h2>
                            <hr />
                            <h2 className='text-lg pt-4'>Province of Lanao del Norte</h2>
                            <hr />
                            <h2 className='text-lg pt-4'>CHED Region X</h2>
                            <hr />
                            <h2 className='text-lg pt-4'>UniFast</h2>
                            <hr />
                        </div>

                        <div className='w-[350px] h-[400px] rounded-xl flex items-center justify-center flex-wrap text-gray-700'>
                            <div className='w-full h-max mb-6'>
                                <p className='font-semibold'>Address</p>
                                Villa Elena, Poblacion, Kapatagan, Lanao del Norte, Philippines 9214
                            </div>
                            <div className='w-full h-max mb-6'>
                                <p className='font-semibold'>Admission</p>
                                +63 63222 9414<br/>
                                admission@cdek.edu.ph
                            </div>
                            <div className='w-full h-max'>
                                <p className='font-semibold'>Registrar</p>
                                +63 63222 9414<br/>
                                registrar@cdek.edu.ph
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='mt-10'/>
                <p className="text-center text-sm italic text-gray-500 pt-2 pb-6">
                © 2025 Colegio de Kapatagan. All rights reserved.
                </p>
        </div>
    );
}