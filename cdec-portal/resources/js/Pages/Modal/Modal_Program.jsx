import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function ModalProgram({ setIsModalOpen, users, colleges = [] }) {
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);

    // 🔹 Filter users for Program Head dropdown
    useEffect(() => {
        if (!users) return;

        if (search.trim() === '') {
            setFilteredUsers(users);
        } else {
            const results = users.filter(user =>
                user.fullname.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(results);
        }
    }, [search, users]);

    // 🔹 Select user for Program Head
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearch(user.fullname);
        setFilteredUsers([]);
    };

    // 🔹 Select College
    const handleSelectCollege = (college) => {
        setSelectedCollege(college);
        setIsCollegeDropdownOpen(false);
    };

    // 🔹 Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedUser) {
            alert('Please select a Program Head');
            return;
        }
        if (!selectedCollege) {
            alert('Please select a College Department');
            return;
        }

        const formData = new FormData(e.target);
        router.post(route('program.store'), formData, {
            onSuccess: () => {
                setIsModalOpen(false);
                setSearch('');
                setSelectedUser(null);
                setSelectedCollege(null);
                setFilteredUsers([]);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 w-full h-screen bg-gray-500/50">
            <div className="flex justify-center items-center h-full overflow-y-auto pt-10 pb-8">
                <div className="w-[50%] max-h-full bg-white rounded-xl shadow-4xl p-5 flex flex-col">

                    {/* HEADER */}
                    <div className="flex justify-between items-start border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Add New Program
                            </h3>
                            <p className="text-sm text-gray-500">
                                Please provide accurate information for the program.
                            </p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>

                    {/* FORM */}
                    <form className="w-full flex flex-col gap-6 pt-5" onSubmit={handleSubmit}>

                        <div className="flex flex-row gap-12">

                            {/* LEFT SIDE */}
                            <div className="flex-1 flex flex-col gap-4">
                                <label className="text-lg font-medium">Abbreviation</label>
                                <input type="text" name="abbreviation" placeholder="BSCS" className="border rounded-md p-3 w-full" />

                                <label className="text-lg font-medium">Program Name</label>
                                <input type="text" name="program_name" placeholder="Bachelor Science in Computer Science" className="border rounded-md p-3 w-full" />

                                <label className="text-lg font-medium">Major</label>
                                <input type="text" name="major" placeholder="N/A" className="border rounded-md p-3 w-full" />
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex-1 flex flex-col gap-4">
                                {/* Program Head */}
                                <label className="text-lg font-medium">Program Head</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setSelectedUser(null);
                                        }}
                                        placeholder="Search Program Head"
                                        className="border rounded-md p-3 w-full"
                                    />

                                    {/* User Dropdown */}
                                    {filteredUsers.length > 0 && !selectedUser && (
                                        <div className="absolute bg-white border w-full mt-1 rounded-md max-h-40 overflow-y-auto z-10">
                                            {filteredUsers.map(user => (
                                                <div
                                                    key={user.id}
                                                    onMouseDown={() => handleSelectUser(user)}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    {user.fullname}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {search && filteredUsers.length === 0 && !selectedUser && (
                                        <div className="absolute bg-white border w-full mt-1 rounded-md p-2 text-gray-400 text-sm z-10">
                                            No results found
                                        </div>
                                    )}
                                </div>
                                <input type="hidden" name="program_head_id" value={selectedUser ? selectedUser.id : ''} />

                                {/* College Department */}
                                <label className="text-lg font-medium">College Department</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={selectedCollege ? selectedCollege.college_name : ''}
                                        readOnly
                                        onClick={() => setIsCollegeDropdownOpen(!isCollegeDropdownOpen)}
                                        placeholder="Select College Department"
                                        className="border rounded-md p-3 w-full cursor-pointer"
                                    />
                                    {isCollegeDropdownOpen && (
                                        <div className="absolute bg-white border w-full mt-1 rounded-md max-h-40 overflow-y-auto z-10">
                                            {colleges.map(college => (
                                                <div
                                                    key={college.id}
                                                    onMouseDown={() => handleSelectCollege(college)}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    {college.college_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                               <input type="hidden" name="college_name" value={selectedCollege ? selectedCollege.college_name : ''} />

                                {/* College Duration */}
                                <label className="text-lg font-medium">College Duration</label>
                                <input type="text" name="college_duration" className="border rounded-md p-3 w-full" />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-lg font-medium mt-2">Description</label>
                            <textarea name="description" className="border rounded-md p-2 w-full h-[200px]" />
                        </div>

                        {/* Submit */}
                        <div className="w-full flex justify-center mt-6">
                            <button type="submit" className="w-full h-[50px] bg-slate-400 rounded-md hover:bg-slate-500">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}