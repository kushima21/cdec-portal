import { useState } from 'react';
import { 
  FaChalkboardTeacher, FaLayerGroup, FaProjectDiagram, FaBook,
  FaBuilding, FaTools, FaUserGraduate, FaSitemap,
  FaCalendarAlt, FaUsers,
  FaUserCog, FaIdBadge
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
    const [open, setOpen] = useState(false);

    const menuItem = "w-full h-[40px] shadow-sm rounded-md flex items-center gap-3 px-3 mt-2 cursor-pointer hover:bg-gray-50 transition";

    return (
        <div className='w-full h-screen overflow-hidden bg-white'>
            <div className='flex h-full'>

                {/* Sidebar */}
                <div className='w-[17%] h-screen bg-white border-r border-gray-200 shadow-xl p-6 flex flex-col'>

                    {/* Logo */}
                    <div className='flex items-center gap-4 mb-5'>
                        <img 
                        src='/system-images/cdec-logo.png' 
                        className='w-[80px] h-[80px] object-contain' 
                        />
                        <h2 className='text-xl font-bold'>Deon Connect</h2>
                        <span>v1.2026.2.05</span>
                    </div>

                    {/* User Info */}
                    <div 
                        onClick={() => setOpen(!open)}
                        className='w-full flex items-center justify-center text-center shadow-xl p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition'
                    >
                        <img 
                            src='/system-images/user.png' 
                            className='w-10 h-10 rounded-full object-cover shadow'
                        />
                        <div className='w-full'>
                            <h2 className='font-semibold text-lg truncate'>John Mark Hondrada</h2>
                            <p className='text-sm text-gray-500 truncate'>ID:0912331</p>
                        </div>
                        {/* Dropdown */}
                    <div className={`w-max fixed mt-[15%] bg-white rounded-xl shadow-2xl p-5 ${open ? 'block' : 'hidden'}`}>
                        <div className='w-max flex flex-col items-center gap-4'>
                            <span className='truncate text-sm text-gray-500 text-center'>
                                Sign in: johnhondrada@ckcm.edu.ph
                            </span>

                            <div className='w-full h-[50px] bg-gray-50 hover:bg-gray-100 rounded-lg shadow flex items-center px-4 cursor-pointer transition'>
                                <span className='font-medium'>Settings</span>
                            </div>

                            <div className='w-full h-[50px] bg-gray-50 hover:bg-gray-100 rounded-lg shadow flex items-center px-4 cursor-pointer transition'>
                                <span className='font-medium'>Night Mode</span>
                            </div>

                            <div className='w-full h-[50px] bg-red-50 hover:bg-red-100 rounded-lg shadow flex items-center px-4 cursor-pointer transition'>
                                <span className='font-medium text-red-600'>Sign out</span>
                            </div>
                        </div>
                    </div>
                    </div>


                    {/* School Overview */}
                    <div className='w-full h-[50px] flex items-center justify-center mt-6 rounded-md border-2 border-orange-600 shadow-lg cursor-pointer hover:bg-orange-50 transition'>
                        <h2 className='font-bold text-lg text-orange-500'>School Overview</h2>
                    </div>

                    {/* Manage Section */}
                    <div className='w-full mt-5 flex-1 overflow-hidden flex flex-col'>

                        {/* Scroll Area */}
                        <div className='w-full overflow-y-auto pr-2 mt-2 flex-1'>

                            <div className='font-semibold text-gray-500 tracking-wide'>
                                MANAGE
                            </div>

                            <div className='w-full'>
                                <div className={menuItem}><FaChalkboardTeacher /> <span>Classes</span></div>
                                <div className={menuItem}><FaLayerGroup /> <span>Program</span></div>
                                <div className={menuItem}><FaProjectDiagram /> <span>Curricula</span></div>
                                <div className={menuItem}><FaBook /> <span>Courses</span></div>
                                <div className={menuItem}><FaBuilding /> <span>Building</span></div>
                                <div className={menuItem}><FaBuilding /> <span>Colleges</span></div>
                                <div className={menuItem}><FaTools /> <span>Resources</span></div>
                                <div className={menuItem}><FaUserGraduate /> <span>Tertiary</span></div>
                                <div className={menuItem}><FaSitemap /> <span>Departments</span></div>
                                <div className={menuItem}><FaSitemap /> <span>Academic Year</span></div>
                                <div className={menuItem}><FaSitemap /> <span>Academic Term</span></div>
                            </div>

                            <div className='pt-6 font-semibold text-gray-500 tracking-wide'>
                                ENROLLMENT
                            </div>

                            <div className='w-full'>
                                <div className={menuItem}><FaCalendarAlt /> <span>Schedules</span></div>
                                <div className={menuItem}><FaUsers /> <span>Tertiary Enrollees</span></div>
                            </div>

                            <div className='pt-6 font-semibold text-gray-500 tracking-wide'>
                                ACCOUNT
                            </div>

                            <div className='w-full'>
                                <div className={menuItem}><FaUserCog /> <span>Users</span></div>
                                <div className={menuItem}><FaIdBadge /> <span>Personnels</span></div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Main Content — fixed */}
                <div className='flex-1 h-full overflow-hidden'>
                    <div className='w-full h-[50px] fixed bg-white border-b border-gray-200 shadow-sm z-10'></div>
                    {children}
                </div>

            </div>
        </div>
    );
}