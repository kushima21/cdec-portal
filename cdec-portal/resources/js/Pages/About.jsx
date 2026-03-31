import { Link } from '@inertiajs/react';

export default function About() {
    return (
        <>
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
                                <li className='font-bold text-orange-600'><Link href={route('about')}>About Us</Link></li>
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

                {/* CONTENT */}
               <div className='w-full h-[90%] flex flex-col items-center  justify-center pt-[250px] px-6'>
                    <h2 className='text-4xl font-extrabold text-center mb-12 text-gray-800'>About Us</h2>

                    <div className='w-full h-max flex flex-wrap items-center justify-center gap-10'>
                        <div className='w-[400px] h-[350px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col items-center justify-center p-8 text-center'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>Our Mission</h3>
                            <p className='text-gray-600'>
                                Colegio de Kapatagan is committed to providing quality education
                                that fosters excellence, integrity, and community values.
                            </p>
                        </div>

                        <div className='w-[400px] h-[350px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col items-center justify-center p-8 text-center'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>Our Vision</h3>
                            <p className='text-gray-600'>
                                We envision a generation of learners who are empowered to lead,
                                innovate, and contribute meaningfully to society.
                            </p>
                        </div>

                        <div className='w-[400px] h-[350px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col items-center justify-center p-8 text-center'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>Our Values</h3>
                            <p className='text-gray-600'>
                                Excellence, integrity, respect, and community service are
                                the core values we instill in all students.
                            </p>
                        </div>

                        <div className='w-[400px] h-[350px] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition rounded-xl flex flex-col items-center justify-center p-8 text-center'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>Our Commitment</h3>
                            <p className='text-gray-600'>
                                We provide an environment that nurtures creativity, critical
                                thinking, and lifelong learning for every student.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='w-full h-max flex flex-col items-center justify-center'>
                    <h2 className='text-4xl font-extrabold text-center pt-20 pb-10 text-gray-800'>VMOC & History</h2>

                    <div className='w-full h-max flex flex-wrap items-start justify-center pb-20 gap-5 px-6'>
                        <div className='w-[40%] h-max flex flex-col p-12 bg-white rounded-xl shadow-lg'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>VISION</h3>
                            <p className='text-gray-700 leading-relaxed'>“Colegio de Kapatagan envisions to be the Center of Excellence founded on a state-of-the-art infrastructure system in providing relevant and responsive education in forming a progressive, productive, eco-friendly, entrepreneurially inclined and value laden graduates”</p>
                        </div>

                        <div className='w-[40%] h-max flex flex-col p-12 bg-white rounded-xl shadow-lg'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>MISSION</h3>
                            <p className='text-gray-700'>1. To provide access to relevant, quality, responsive education and advocate sustainable development.</p>
                            <p className='text-gray-700'>2. To inculcate socio-cultural, political, moral and spiritual values.</p>
                            <p className='text-gray-700'>3. To undertake community extension services relevant to the changing needs of the community.</p>
                        </div>

                        <div className='w-[40%] h-max p-12 flex flex-col bg-white rounded-xl shadow-lg'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>OBJECTIVES</h3>
                            <p className='text-gray-700'>1. Provide quality instruction thru:</p>
                            <p className='text-gray-700'>- Hiring of qualified and competent instructors</p>
                            <p className='text-gray-700'>- Adoption of standardized CHED curriculum</p>
                            <p className='text-gray-700'>- Intensified delivery of research-based and contextualized instruction.</p>
                            <p className='text-gray-700'>- Faculty and staff development program.</p>
                            <p className='text-gray-700'>2. Provide adequate and state-of-the-art facilities.</p>
                            <p className='text-gray-700'>3. Provide customer-friendly administrative support system.</p>
                            <p className='text-gray-700'>4. Integrate values formation in all learning areas.</p>
                            <p className='text-gray-700'>5. Advocate partnership with community and other stakeholders.</p>
                            <p className='text-gray-700'>6. Adopt the principle of transparency and accountability</p>
                        </div>

                        <div className='w-[40%] h-max flex flex-col p-12 bg-white rounded-xl shadow-lg'>
                            <h3 className='text-2xl font-bold mb-4 text-orange-600'>CORE VALUES</h3>
                            <p className='text-gray-700'>Integrity</p>
                            <p className='text-gray-700'>Excellence</p>
                            <p className='text-gray-700'>Service</p>
                        </div>
                    </div>

                    <h2 className='text-4xl font-extrabold text-center pb-10 text-gray-800'>SCHOOL HISTORY</h2>

                    <div className='w-full h-max flex flex-wrap items-center justify-center pb-20 gap-10 px-6'>
                        <div className='w-[80%] bg-white rounded-xl shadow-lg p-10 text-gray-700 leading-relaxed'>Colegio de Kapatagan was created under Municipal Ordinance No. 96, series of 2019...</div>
                        <div className='w-[80%] bg-white rounded-xl shadow-lg p-10 text-gray-700 leading-relaxed'>Colegio de Kapatagan was an initiative of Hon. Mayor Barry Yu Baguio...</div>
                        <div className='w-[80%] bg-white rounded-xl shadow-lg p-10 text-gray-700 leading-relaxed'>The school was temporarily located at the premises of the Municipal Social Welfare...</div>
                        <div className='w-[80%] bg-white rounded-xl shadow-lg p-10 text-gray-700 leading-relaxed'>At present, Colegio de Kapatagan, with its new state-of-the-art facilities...</div>
                    </div>
                </div>

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