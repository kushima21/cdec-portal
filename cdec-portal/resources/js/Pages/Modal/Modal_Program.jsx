import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa'; 
import { useState, useEffect } from 'react';

export default function ModalProgram({ setIsModalOpen, users }) {
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // 🔹 Filter users dynamically based on search
    useEffect(() => {
        if (!users) return;
        if (search.trim() === '') {
            setFilteredUsers([]);
        } else {
            const results = users.filter(user =>
                `${user.firstname || ''} ${user.lastname || ''}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
            setFilteredUsers(results);
        }
    }, [search, users]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearch(`${user.firstname} ${user.lastname}`);
        setFilteredUsers([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // send form data via Inertia.js
        const formData = new FormData(e.target);

        router.post(route('program.store'), formData, {
            onSuccess: () => setIsModalOpen(false),
        });
    };

    return (
        <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">
            <div className="w-full h-full flex justify-center items-center overflow-y-auto pt-10 pb-8">
                <div className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col">

                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Add New Program
                            </h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
                        <div>
                            <h2 className="text-2xl font-bold">Program Details</h2>
                            <p>Please provide accurate information for the program.</p>
                        </div>

                        <div className="w-full flex flex-row gap-12 pt-4">
                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">Abbreviation</label>
                                <input type="text" name="abbreviation" placeholder="BSCS" className="border rounded-md p-3 w-full" />

                                <label className="text-lg font-medium">Name</label>
                                <input type="text" name="program_name" placeholder="Bachelor Science in Computer Science" className="border rounded-md p-3 w-full" />

                                <label className="text-lg font-medium">Major</label>
                                <input type="text" name="major" placeholder="N/A" className="border rounded-md p-3 w-full" />
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">Program Head</label>
                                <div className="relative w-full">
                                    <input 
                                        type="text" 
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setSelectedUser(null);
                                        }}
                                        className='border rounded-md p-3 w-full'
                                        placeholder='Search Program Head'
                                    />

                                    {filteredUsers.length > 0 && (
                                        <div className="absolute bg-white border w-full mt-1 rounded-md max-h-40 overflow-y-auto z-10">
                                            {filteredUsers.map(user => (
                                                <div 
                                                    key={user.id}
                                                    onClick={() => handleSelectUser(user)}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                                                >
                                                    <img src={user.profile_picture} className="w-6 h-6 rounded-full" />
                                                    <span>{user.firstname} {user.lastname}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* hidden input for Program Head full name */}
                                <input 
                                    type="hidden" 
                                    name="program_head_name"
                                    value={selectedUser ? `${selectedUser.firstname} ${selectedUser.lastname}` : ''}
                                />

                                <label className="text-lg font-medium">College Department</label>
                                <input type="text" name="college_name" placeholder="College of Computer Science" className="border rounded-md p-3 w-full" />

                                <label className="text-lg font-medium">College Duration</label>
                                <input type="text" name="college_duration" placeholder="4 YEARS" className="border rounded-md p-3 w-full" />
                            </div>
                        </div>

                        <div className="w-full justify-center">
                            <label className="text-lg font-medium mt-2">Description</label>
                            <textarea name="description" className="border rounded-md p-2 w-full h-[200px]" />
                        </div>

                        <div className="w-full flex justify-center mt-6">
                            <button type="submit" className="w-full h-[50px] bg-slate-400 rounded-md">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}