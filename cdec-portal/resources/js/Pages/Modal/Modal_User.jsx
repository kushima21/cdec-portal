import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaTimes, FaCamera } from 'react-icons/fa';

export default function ModalUser({ isModalOpen, setIsModalOpen, selectedUser }) {
    // ================= STATE =================
    const [previewImage, setPreviewImage] = useState("/system-images/cdec-logo.png");
    const [selectedRoles, setSelectedRoles] = useState([]);

    // ================= EFFECT =================
    useEffect(() => {
        if (selectedUser) {
            setPreviewImage(selectedUser.profile_picture || "/system-images/cdec-logo.png");
            setSelectedRoles(selectedUser.roles || []);
        } else {
            setPreviewImage("/system-images/cdec-logo.png");
            setSelectedRoles([]);
        }
    }, [selectedUser]);

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        // Add selected roles
        selectedRoles.forEach(role => form.append('roles[]', role));

        // Handle default profile picture
        const fileInput = e.target.profile_picture.files[0];
        if (!fileInput) {
            const response = await fetch(previewImage);
            const blob = await response.blob();
            const defaultFile = new File([blob], "default-profile.png", { type: blob.type });
            form.append('profile_picture', defaultFile);
        }

        // ✅ CHECK: CREATE OR UPDATE
        if (selectedUser) {
            router.post(`/users/update/${selectedUser.id}`, form, {
                forceFormData: true,
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/users/store', form, {
                forceFormData: true,
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    // ================= IMAGE HANDLERS =================
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage("/system-images/cdec-logo.png");
    };

    // ================= ROLES =================
    const allRoles = [
        "Top Administrator", "Middle Administrator", "College Faculty",
        "Service Unit Personnel", "Tertiary Student", "College Dean",
        "College Associate Dean", "Account Administrator", "Personnel Administrator",
        "Personnel", "Finance Administrator", "Finance Office", "Suspended User",
        "Curriculum Administrator", "Colleges Administrator", "Course Administrator",
        "Department Administrator", "Program Administrator", "Account Editor",
        "Resources Administrator", "Building Administrator", "College Registrar",
        "Club Moderator", "Office Administrator", "Enrollment Schedules Manager"
    ];

    const handleSelectRole = (e) => {
        const role = e.target.value;
        if (!role) return;
        setSelectedRoles(prev => [...prev, role]);
        e.target.value = "";
    };

    const removeRole = (roleToRemove) => {
        setSelectedRoles(prev => prev.filter(r => r !== roleToRemove));
    };

    const availableRoles = allRoles.filter(r => !selectedRoles.includes(r));

    // Shared input design styles
    const inputStyle = "mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";
    const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600";
    const sectionTitleStyle = "text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4";

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all animate-fade-in">
            <div className="flex max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
                
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {selectedUser ? 'Edit User Profile' : 'Register New User'}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Fill out the required information sections below to manage account access.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-xl p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>

                {/* FORM CONTENT CONTAINER */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                    
                    {/* SECTION 1: ACCOUNT CREDENTIALS & AVATAR */}
                    <div>
                        <h4 className={sectionTitleStyle}>Account & Identity</h4>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            
                            {/* Profile Picture Box */}
                            <div className="flex flex-col items-center w-full md:w-1/4 space-y-3 shrink-0">
                                <span className={labelStyle}>Profile Picture</span>
                                <div className="group relative h-36 w-36 overflow-hidden rounded-full border-4 border-gray-100 bg-gray-100 shadow-md transition-all hover:border-blue-100">
                                    <img 
                                        src={previewImage} 
                                        alt="Profile Preview" 
                                        className="h-full w-full object-cover" 
                                    />
                                    <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 text-white text-xs gap-1">
                                        <FaCamera className="text-lg" />
                                        <span>Upload photo</span>
                                        <input
                                            name="profile_picture"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {previewImage !== "/system-images/cdec-logo.png" && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="text-xs font-medium text-red-500 hover:text-red-700 hover:underline transition-all"
                                    >
                                        Remove Photo
                                    </button>
                                )}
                            </div>

                            {/* Essential Credentials Inputs */}
                            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className={labelStyle}>Assigned System Roles</label>
                                    <div className="mt-1 flex min-h-[42px] w-full flex-wrap gap-1.5 rounded-lg border border-gray-300 bg-gray-50 p-2 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20">
                                        {selectedRoles.map(role => (
                                            <span
                                                key={role}
                                                className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-2.5 py-0.5 rounded-md text-xs font-medium"
                                            >
                                                {role}
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeRole(role)} 
                                                    className="text-blue-400 hover:text-red-500 font-bold ml-1"
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                        <select
                                            onChange={handleSelectRole}
                                            className="flex-1 min-w-[140px] bg-transparent text-sm outline-none cursor-pointer text-gray-500"
                                        >
                                            <option value="">+ Choose access role</option>
                                            {availableRoles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelStyle}>School ID Number</label>
                                    <input type="text" name="username" placeholder="e.g., 2026-0001" className={inputStyle} defaultValue={selectedUser?.school_id || ''} required />
                                </div>

                                <div>
                                    <label className={labelStyle}>Email Address</label>
                                    <input type="email" name="email" placeholder="username@domain.com" className={inputStyle} defaultValue={selectedUser?.email || ''} required />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelStyle}>Password</label>
                                    <input type="password" name="password" placeholder={selectedUser ? "•••••••• (Leave blank to keep current)" : "Create user password"} className={inputStyle} />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SECTION 2: PERSONAL INFORMATION */}
                    <div>
                        <h4 className={sectionTitleStyle}>Personal Details</h4>
                        
                        {/* Name Matrix */}
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                            <div className="col-span-1">
                                <label className={labelStyle}>Prefix</label>
                                <select name="prefix" className={inputStyle} defaultValue={selectedUser?.prefix || ''}>
                                    <option value=""></option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Sr.">Sr.</option>
                                    <option value="Doc.">Doc.</option>
                                    <option value="Prof.">Prof.</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className={labelStyle}>First Name</label>
                                <input type="text" name="firstname" placeholder="John Mark" className={inputStyle} defaultValue={selectedUser?.firstname || ''} required />
                            </div>
                            <div className="col-span-1 sm:col-span-1">
                                <label className={labelStyle}>Middle Name</label>
                                <input type="text" name="middlename" placeholder="Parba" className={inputStyle} defaultValue={selectedUser?.middlename || ''} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className={labelStyle}>Last Name</label>
                                <input type="text" name="lastname" placeholder="Hondrada" className={inputStyle} defaultValue={selectedUser?.lastname || ''} required />
                            </div>
                            <div className="col-span-1">
                                <label className={labelStyle}>Suffix</label>
                                <select name="suffix" className={inputStyle} defaultValue={selectedUser?.suffix || ''}>
                                    <option value=""></option>
                                    <option value="Jr.">Jr.</option>
                                    <option value="Sr.">Sr.</option>
                                    <option value="II.">II.</option>
                                    <option value="III.">III.</option>
                                    <option value="IV.">IV.</option>
                                    <option value="V">V</option>
                                </select>
                            </div>
                        </div>

                        {/* Additional Metadata */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className={labelStyle}>Academic Suffix</label>
                                <select name="academic_suffix" className={inputStyle} defaultValue={selectedUser?.academic_suffix || ''}>
                                    <option value=""></option>
                                    <option value="LPT">LPT</option>
                                    <option value="PHD">PHD</option>
                                    <option value="MSIT">MSIT</option>
                                    <option value="MSCS">MSCS</option>
                                    <option value="MBA">MBA</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle}>Birthdate</label>
                                <input type="date" name="birthdate" className={inputStyle} defaultValue={selectedUser?.birthdate || ''} />
                            </div>
                            <div>
                                <label className={labelStyle}>Gender</label>
                                <select name="sex" className={inputStyle} defaultValue={selectedUser?.sex || ''}>
                                    <option value=""></option>
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                </select>
                            </div>
                            <div className="sm:col-span-3">
                                <label className={labelStyle}>Contact Number</label>
                                <input type="text" name="contact_number" placeholder="e.g., 09123456789" className={inputStyle} defaultValue={selectedUser?.contact_number || ''} />
                            </div>

                            {/* USER MAIN RESIDENTIAL ADDRESS (Fixed Missing Column Bug) */}
                            <div className="sm:col-span-3">
                                <label className={labelStyle}>User Permanent Address</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder="House no., Street, Barangay, City, Province" 
                                    className={inputStyle} 
                                    defaultValue={selectedUser?.address || ''} 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: EMERGENCY INFORMATION */}
                    <div>
                        <h4 className={sectionTitleStyle}>Emergency Contact</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Contact Fullname</label>
                                <input 
                                    type="text" 
                                    name="emergency_fullname" 
                                    placeholder="Guardian or relative name" 
                                    className={inputStyle} 
                                    defaultValue={selectedUser?.emergency_fullname || ''} 
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Emergency Contact Number</label>
                                <input 
                                    type="text" 
                                    name="emergency_number" 
                                    placeholder="e.g., 09123456789" 
                                    className={inputStyle} 
                                    defaultValue={selectedUser?.emergency_number || ''} 
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelStyle}>Emergency Home Address</label>
                                <input 
                                    type="text" 
                                    name="emergency_address" 
                                    placeholder="House no., Street, Barangay, City, Province" 
                                    className={inputStyle} 
                                    defaultValue={selectedUser?.emergency_address || ''} 
                                />
                            </div>
                        </div>
                    </div>

                </form>

                {/* MODAL STICKY FOOTER */}
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
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('form').requestSubmit();
                        }}
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
                    >
                        {selectedUser ? 'Save Profile Changes' : 'Register User'}
                    </button>
                </div>

            </div>
        </div>
    );
}