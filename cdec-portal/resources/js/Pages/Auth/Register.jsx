import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register')); // route to store()
    };

    

    return (
        <>
            <Head title="Register" />

            <div className='w-full min-h-screen bg-white flex items-center justify-center p-5'>
                <div className='w-full max-w-3xl flex flex-col items-center p-10 rounded-2xl shadow-lg relative'>

                    <Link 
                        href={route('welcome')}
                        className='absolute top-6 left-6 text-sm text-orange-600 font-semibold hover:underline'
                    >
                        ← Go back home
                    </Link>

                    <img className='w-[120px] drop-shadow-md mb-6' src='/system-images/cdec-logo.png' />

                    <div className='text-center mb-6'>
                        <h2 className='text-3xl font-bold'>Start Your Journey</h2>
                        <p className='text-orange-600 font-semibold'>with</p>
                        <h2 className='text-2xl text-orange-600 font-semibold'>Colegio de Kapatagan</h2>
                        <p className='text-gray-700 mt-2 text-sm'>
                            Online Registration Form for the Second Semester (SY: 2025-2026)
                        </p>
                    </div>

                    <div className='bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-10 mb-8 text-2sm rounded text-center'>
                        NOTICE! If you are an existing student, please login to your account here.
                    </div>

                    {/* ✅ FORM */}
                    <form onSubmit={submit} className='w-full space-y-4'>

                        {/* First & Last Name */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>First Name</label>
                                <input 
                                    type='text'
                                    value={data.firstname}
                                    onChange={e => setData('firstname', e.target.value)}
                                    className='input'
                                />
                                {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                            </div>

                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Last Name</label>
                                <input 
                                    type='text'
                                    value={data.lastname}
                                    onChange={e => setData('lastname', e.target.value)}
                                    className='input'
                                />
                                {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className='flex flex-col'>
                            <label className='font-semibold mb-1'>Email</label>
                            <input 
                                type='email'
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className='input'
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Password</label>
                                <input 
                                    type='password'
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className='input'
                                />
                            </div>

                            <div className='flex flex-col w-full'>
                                <label className='font-semibold mb-1'>Confirm Password</label>
                                <input 
                                    type='password'
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className='input'
                                />
                            </div>
                        </div>

                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        {/* Button */}
                        <button 
                            type='submit'
                            disabled={processing}
                            className='w-full h-[45px] bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md'
                        >
                            {processing ? 'Registering...' : 'Register'}
                        </button>

                        <p className='text-center text-sm'>
                            Already have an Account? 
                            <Link href={route('login')} className='text-orange-600 font-semibold ml-1'>
                                Login Here
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </>
    );
}