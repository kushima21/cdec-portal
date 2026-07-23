import { useState, useRef, useEffect } from 'react';
import { 
  FaChalkboardTeacher, FaLayerGroup, FaProjectDiagram, FaBook,
  FaBuilding, FaTools, FaUserGraduate, FaSitemap,
  FaCalendarAlt, FaUsers,
  FaUserCog, FaIdBadge
} from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {

    const [open, setOpen] = useState(false);
const dropdownRef = useRef(null);

useEffect(() => {
    function handleClickOutside(event) {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setOpen(false);
        }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  const { url, props } = usePage();
const auth = props.auth;

    const menuItem =
        "w-full h-[40px] shadow-sm rounded-md flex items-center gap-3 px-3 mt-2 cursor-pointer transition";

    // ✅ Reusable Menu Item
    const renderMenuItem = (icon, label, link) => {
        const isActive = url.startsWith(link);

        return (
            <Link
                href={link}
                className={`${menuItem} ${
                    isActive
                        ? 'bg-orange-100 text-orange-600 font-semibold'
                        : 'hover:bg-gray-50'
                }`}
            >
                {icon}
                <span>{label}</span>
            </Link>
        );
    };

    return (
        <div className='w-full h-screen overflow-hidden bg-white'>
            <div className='flex h-full'>

                {/* SIDEBAR */}
                <div className='w-[17%] h-screen bg-white border-r border-gray-200 shadow-xl p-6 flex flex-col'>

                    {/* LOGO */}
                    <div className='flex items-center gap-4 mb-5'>
                        <img
                            src='/system-images/cdec-logo.png'
                            className='w-[70px] h-[70px] object-contain'
                        />
                        <div>
                            <h2 className='text-lg font-bold'>Deon Connect</h2>
                            <span className='text-xs text-gray-400'>v1.2026.2.05</span>
                        </div>
                    </div>

                    {/* USER */}
                    <div
                        onClick={() => setOpen(!open)}
                        className='relative w-full flex items-center gap-3 shadow-md p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition'
                    >
                        <img
                            src='/system-images/user.png'
                            className='w-10 h-10 rounded-full object-cover'
                        />

                        <div className='flex-1'>
                            <h2 className='font-semibold text-sm truncate'>
                                {auth?.user?.name}
                            </h2>

                            <p className='text-xs text-gray-500 truncate'>
                                {auth?.user?.email}
                            </p>
                        </div>

                        {/* DROPDOWN */}
                        {open && (
                            <div className='absolute top-16 left-0 w-full bg-white rounded-xl shadow-2xl p-4 z-50'>
                                <div className='flex flex-col gap-3 text-sm'>
                                <span className='text-gray-500 text-center'>
                                    {auth?.user?.email}
                                </span>

                                    <div className='p-2 rounded-md hover:bg-gray-100 cursor-pointer'>
                                        Settings
                                    </div>

                                    <div className='p-2 rounded-md hover:bg-gray-100 cursor-pointer'>
                                        Night Mode
                                    </div>

                                    <div className='p-2 rounded-md bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer'>
                                        Sign out
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SCHOOL OVERVIEW */}
                    <Link
                        href="/dashboard"
                        className='w-full h-[45px] flex items-center justify-center mt-6 rounded-md border-2 border-orange-600 shadow-md hover:bg-orange-50 transition'
                    >
                        <h2 className='font-semibold text-orange-500'>
                            School Overview
                        </h2>
                    </Link>

                    {/* MENU */}
                    <div className='w-full mt-5 flex-1 flex flex-col overflow-hidden'>

                        <div className='w-full overflow-y-auto pr-2 flex-1'>

                            {/* MANAGE */}
                            <div className='text-xs font-semibold text-gray-400 tracking-wide mb-2'>
                                MANAGE
                            </div>

                            {renderMenuItem(<FaChalkboardTeacher />, "Classes", "/classes")}
                            {renderMenuItem(<FaLayerGroup />, "Program", "/program")}
                            {renderMenuItem(<FaProjectDiagram />, "Curricula", "/curricula")}
                            {renderMenuItem(<FaBook />, "Courses", "/courses")}
                            {renderMenuItem(<FaBuilding />, "Building", "/building")}
                            {renderMenuItem(<FaBuilding />, "Colleges", "/colleges")}
                            {renderMenuItem(<FaTools />, "Resources", "/resources")}
                            {renderMenuItem(<FaUserGraduate />, "Tertiary", "/tertiary")}
                            {renderMenuItem(<FaSitemap />, "Departments", "/department")}

                            <div className='text-xs font-semibold text-gray-400 tracking-wide mt-6 mb-2'>
                                MANAGE ACADEMIC
                            </div>

                            {renderMenuItem(<FaSitemap />, "Academic Year", "/academicyear")}
                            {renderMenuItem(<FaSitemap />, "Academic Enrollment", "/academicenrollment")}
                            {renderMenuItem(<FaSitemap />, "Academic Term", "/academicterm")}

                            
                            {/*Admission*/}
                            <div className='text-xs font-semibold text-gray-400 tracking-wide mt-6 mb-2'>
                            ADMISSION
                            </div>

                            {renderMenuItem(<FaSitemap />, "Application for Admission", "/application")}
                            {renderMenuItem(<FaSitemap />, "Application", "/applicationstudent")}


                            {/* ENROLLMENT */}
                            <div className='text-xs font-semibold text-gray-400 tracking-wide mt-6 mb-2'>
                                ENROLLMENT
                            </div>

                            {renderMenuItem(<FaCalendarAlt />, "Schedules", "/schedule")}
                            {renderMenuItem(<FaUsers />, "Tertiary Enrollees", "/enrollees")}

                            {/* ACCOUNT */}
                            <div className='text-xs font-semibold text-gray-400 tracking-wide mt-6 mb-2'>
                                ACCOUNT
                            </div>

                            {renderMenuItem(<FaUserCog />, "Users", "/users")}
                            {renderMenuItem(<FaIdBadge />, "Personnels", "/personnels")}

                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className='flex-1 h-full overflow-hidden'>
                    <div className='w-full h-[50px] fixed bg-white border-b border-gray-200 shadow-sm z-10'></div>

                    <div className='h-full overflow-y-auto pt-2'>
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}