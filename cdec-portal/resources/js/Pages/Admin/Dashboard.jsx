    import { useState } from 'react';
    import { FaSearch, FaPlus } from 'react-icons/fa';
    import { FiRefreshCw } from 'react-icons/fi';
    import AdminLayout from '../Layouts/AdminLayout';

    export default function Dashboard() {
        return(
            <AdminLayout>
                <div className="flex flex-col h-full">
                    <div className="pt-[3%] h-full bg-white p-6 w-full flex items-center justify-center ">
                        <div className='flex items-center justify-center'>
                            <h2 className='text-4xl text-center w-[80%]'>Some features are not yet covered, may introduce breaking changes, and can change at any time.</h2>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }