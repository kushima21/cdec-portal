import { router } from '@inertiajs/react';
import { FaTimes, FaSearch, FaGraduationCap, FaChevronDown } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function ModalProgram({ setIsModalOpen, users = [], colleges = [] }) {
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({});

    // Filter users for Program Head directory search
    useEffect(() => {
        if (!users) return;

        if (search.trim() === '') {
            setFilteredUsers([]);
        } else {
            const results = users.filter(user =>
                user.fullname?.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(results);
        }
    }, [search, users]);

    // Select user for Program Head
    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearch(user.fullname);
        setFilteredUsers([]);
        setErrors(prev => ({ ...prev, program_head_name: null }));
    };

    // Select College Department
    const handleSelectCollege = (college) => {
        setSelectedCollege(college);
        setIsCollegeDropdownOpen(false);
        setErrors(prev => ({ ...prev, college_name: null }));
    };

    // Handle form submission
// Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Frontend local validations
        let localErrors = {};
        if (!selectedUser) {
            localErrors.program_head_name = 'Please select a qualified Program Head from the directory search.';
        }
        if (!selectedCollege) {
            localErrors.college_name = 'Please assign this program to an active College Department.';
        }

        if (Object.keys(localErrors).length > 0) {
            setErrors(localErrors);
            return;
        }

        setErrors({});

        // 1. Gamit og unod sa kasamtangang HTML Form Element
        const target = e.target;

        // 2. Paghimo og Plain Object nga maoy ipasa sa Inertia Router
        const payload = {
            abbreviation: target.abbreviation.value,
            college_duration: target.college_duration.value,
            program_name: target.program_name.value,
            major: target.major.value,
            description: target.description.value,
            
            // Ipasulod ang mga text values para sa imong hidden inputs
            program_head_name: selectedUser ? selectedUser.fullname : '',
            college_name: selectedCollege ? selectedCollege.college_name : '',

            // NOTE: Kung ang imong database nangita og ID, mas maayo kani ang gamiton:
            // user_id: selectedUser ? selectedUser.id : null,
            // college_id: selectedCollege ? selectedCollege.college_id : null,
        };
        
        // 3. I-submit gamit ang plain payload object
        router.post('/program/store', payload, {
            onSuccess: () => {
                setIsModalOpen(false);
                setSearch('');
                setSelectedUser(null);
                setSelectedCollege(null);
                setFilteredUsers([]);
            },
            onError: (err) => setErrors(err),
        });
    };

    // Shared UI Utility Styles
    const inputStyle = "mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";
    const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600";
    const errorStyle = "text-xs font-medium text-red-600 mt-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all">
            <div className="flex max-h-[95vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">

                {/* MODAL HEADER */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <FaGraduationCap className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Add New Program Degree</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Configure academic program information tracks, durations, and department heads.</p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-xl p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>

                {/* FORM CONTENT CONTAINER */}
                <form onSubmit={handleSubmit} id="programForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                    
                    {/* CORE INFO GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* ABBREVIATION */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Abbreviation Code</label>
                            <input 
                                type="text" 
                                name="abbreviation" 
                                placeholder="e.g., BSCS, BSIT, BSBA" 
                                className={inputStyle} 
                                required
                            />
                            {errors.abbreviation && <p className={errorStyle}>{errors.abbreviation}</p>}
                        </div>

                        {/* COLLEGE DURATION */}
                        <div className="col-span-1">
                            <label className={labelStyle}>Program Duration</label>
                            <input 
                                type="text" 
                                name="college_duration" 
                                placeholder="e.g., 4 Years" 
                                className={inputStyle} 
                                required
                            />
                            {errors.college_duration && <p className={errorStyle}>{errors.college_duration}</p>}
                        </div>

                        {/* PROGRAM NAME */}
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Official Program Name</label>
                            <input 
                                type="text" 
                                name="program_name" 
                                placeholder="e.g., Bachelor of Science in Computer Science" 
                                className={inputStyle} 
                                required
                            />
                            {errors.program_name && <p className={errorStyle}>{errors.program_name}</p>}
                        </div>

                        {/* MAJOR */}
                        <div className="md:col-span-2">
                            <label className={labelStyle}>Major Specialize Focus</label>
                            <input 
                                type="text" 
                                name="major" 
                                placeholder="e.g., Software Engineering (Enter 'N/A' if general)" 
                                className={inputStyle} 
                                required
                            />
                            {errors.major && <p className={errorStyle}>{errors.major}</p>}
                        </div>

                        {/* PROGRAM HEAD FIELD WITH FLOATING SEARCH */}
                        <div className="col-span-1 relative">
                            <label className={labelStyle}>Program Head Assignment</label>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <FaSearch className="text-xs" />
                                </span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        if (selectedUser) setSelectedUser(null);
                                    }}
                                    placeholder="Search directory by name..."
                                    className={`${inputStyle} pl-9`}
                                />
                            </div>

                            {/* Dropdown Card */}
                            {filteredUsers.length > 0 && !selectedUser && (
                                <div className="absolute left-0 right-0 z-20 mt-1 max-h-44 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl py-1 divide-y divide-gray-50">
                                    {filteredUsers.map(user => (
                                        <div
                                            key={user.id}
                                            onClick={() => handleSelectUser(user)}
                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                                        >
                                            {user.fullname}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Fallback Empty Dropdown View */}
                            {search.trim() !== '' && filteredUsers.length === 0 && !selectedUser && (
                                <div className="absolute left-0 right-0 z-20 mt-1 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-400 italic shadow-xl">
                                    No direct results found
                                </div>
                            )}
                            
                            {/* Pass the string fullname representation based on schema attributes */}
                            <input type="hidden" name="program_head_name" value={selectedUser ? selectedUser.fullname : ''} />
                            {errors.program_head_name && <p className={errorStyle}>{errors.program_head_name}</p>}
                        </div>

                        {/* COLLEGE DEPARTMENT SELECTOR */}
                        <div className="col-span-1 relative">
                            <label className={labelStyle}>College Department Link</label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    value={selectedCollege ? selectedCollege.college_name : ''}
                                    readOnly
                                    onClick={() => setIsCollegeDropdownOpen(!isCollegeDropdownOpen)}
                                    placeholder="Choose Department College..."
                                    className={`${inputStyle} pr-9 cursor-pointer select-none`}
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 text-xs">
                                    <FaChevronDown />
                                </span>
                            </div>

                            {/* Options Dropdown Overlay */}
                            {isCollegeDropdownOpen && (
                                <div className="absolute left-0 right-0 z-20 mt-1 max-h-44 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl py-1 divide-y divide-gray-50">
                                    {colleges.length > 0 ? (
                                        colleges.map(college => (
                                            <div
                                                key={college.college_id} // Fix identity key constraint mapping error
                                                onClick={() => handleSelectCollege(college)}
                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                                            >
                                                {college.college_name}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-sm text-gray-400 italic">No colleges registered</div>
                                    )}
                                </div>
                            )}
                            
                            <input type="hidden" name="college_name" value={selectedCollege ? selectedCollege.college_name : ''} />
                            {errors.college_name && <p className={errorStyle}>{errors.college_name}</p>}
                        </div>

                    </div>

                    {/* DESCRIPTION TEXTAREA */}
                    <div className="w-full">
                        <label className={labelStyle}>Program Overview & Objectives</label>
                        <textarea 
                            name="description" 
                            placeholder="Provide a comprehensive breakdown summary of program profiles, core tracks..." 
                            className={`${inputStyle} h-36 resize-none`}
                        />
                        {errors.description && <p className={errorStyle}>{errors.description}</p>}
                    </div>

                </form>

                {/* MODAL ACTIONS FOOTER */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="programForm"
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
                    >
                        Create Program
                    </button>
                </div>

            </div>
        </div>
    );
}