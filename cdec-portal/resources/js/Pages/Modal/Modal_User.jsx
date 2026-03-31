import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

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
        "Club Moderator", "Office Administrator", "Enrollment Schedules Manager",
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

    // ================= UI =================
    return (
        <>
            {isModalOpen && (
                <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50 scroll-m-2">
                    <div className="w-full h-full flex justify-center overflow-y-auto pt-10 pb-8">
                        <div className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col">

                            {/* HEADER */}
                            <div className="w-full flex items-center justify-between border-b pb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                        {selectedUser ? 'Edit User' : 'Add New User'}
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
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 pt-5">
                                {/* ================= ACCOUNT DETAILS ================= */}
                                <div>
                                    <h2 className="text-2xl font-bold">Account Details</h2>
                                    <p>This information will be displayed publicly so be careful what you share.</p>

                                    <div className="w-full flex flex-row gap-12 pt-4">
                                        {/* LEFT */}
                                        <div className="flex-1 flex flex-col gap-4">
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Prefix</label>
                                                <select name="prefix" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.prefix || ''}>
                                                    <option></option>
                                                    <option value={'Mr.'}>Mr.</option>
                                                    <option value={'Ms.'}>Ms.</option>
                                                    <option value={'Mrs.'}>Mrs.</option>
                                                    <option value={'Sr.'}>Sr.</option>
                                                    <option value={'Doc.'}>Doc.</option>
                                                    <option value={'Prof.'}>Prof.</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Firstname</label>
                                                <input type="text" name="firstname" placeholder="John Mark" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.firstname || ''} />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Middlename</label>
                                                <input type="text" name="middlename" placeholder="Parba" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.middlename || ''} />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Lastname</label>
                                                <input type="text" name="lastname" placeholder="Hondrada" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.lastname || ''} />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Suffix</label>
                                                <select name="suffix" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.suffix || ''}>
                                                    <option></option>
                                                    <option value={'Jr.'}>Jr.</option>
                                                    <option value={'Sr.'}>Sr.</option>
                                                    <option value={'II.'}>II.</option>
                                                    <option value={'III.'}>III.</option>
                                                    <option value={'IV.'}>IV.</option>
                                                    <option value={'V'}>V</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Academic Suffix</label>
                                                <select name="academic_suffix" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.academic_suffix || ''}>
                                                    <option></option>
                                                    <option value={'LPT'}>LPT</option>
                                                    <option value={'PHD'}>PHD</option>
                                                    <option value={'MSIT'}>MSIT</option>
                                                    <option value={'MSCS'}>MSCS</option>
                                                    <option value={'MBA'}>MBA</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* RIGHT */}
                                        <div className="flex-1 flex flex-col gap-4">
                                            {/* ROLES */}
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Roles</label>
                                                <div className="border rounded-md p-2 w-full min-h-[42px] flex flex-wrap gap-2 items-center">
                                                    {selectedRoles.map(role => (
                                                        <span
                                                            key={role}
                                                            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {role}
                                                            <button type="button" onClick={() => removeRole(role)} className="text-blue-700 hover:text-red-500">✕</button>
                                                        </span>
                                                    ))}
                                                    <select
                                                        name="roles"
                                                        onChange={handleSelectRole}
                                                        className="flex-1 min-w-[180px] outline-none bg-transparent"
                                                    >
                                                        <option value="">Select role</option>
                                                        {availableRoles.map(role => (
                                                            <option key={role} value={role}>{role}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* EMAIL */}
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Email</label>
                                                <input type="text" name="email" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.email || ''} />
                                            </div>

                                            {/* USERNAME */}
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Username</label>
                                                <input type="text" name="username" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.username || ''} />
                                            </div>

                                            {/* PASSWORD */}
                                            <div className="flex flex-col">
                                                <label className="mb-1 text-sm font-medium">Password</label>
                                                <input type="password" name="password" className="border rounded-md p-2 w-full" />
                                            </div>

                                            {/* PROFILE IMAGE */}
                                            <div className="flex flex-col">
                                                <label className="mb-2 text-sm font-medium">Profile Picture</label>
                                                <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-3 bg-gray-50">
                                                    <div className="relative w-full h-56 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveImage}
                                                            className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center text-sm hover:bg-black"
                                                        >✕</button>

                                                        <img src={previewImage} alt="Profile Preview" className="max-h-full max-w-full object-contain" />
                                                    </div>
                                                </div>
                                                <input
                                                    name="profile_picture"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="mt-3 border rounded-md p-2 w-full bg-white"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* PERSONAL INFO */}
                                <div>
                                    <h3 className="text-xl">Personal Information</h3>
                                    <div className="w-full flex flex-row gap-12 p-4">
                                        <div className="flex-1 flex flex-col gap-4">
                                            <input type="date" name="birthdate" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.birthdate || ''} />
                                            <input type="number" name="contact_number" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.contact_number || ''} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-4">
                                            <select name="sex" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.sex || ''}>
                                                <option></option>
                                                <option>MALE</option>
                                                <option>FEMALE</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* EMERGENCY */}
                                <div>
                                    <h3 className="text-xl">Emergency Information</h3>
                                    <div className="w-full flex flex-row gap-12 p-4">
                                        <div className="flex-1 flex flex-col gap-4">
                                            <input type="text" name="fullname" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.fullname || ''} />
                                            <input type="text" name="address" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.address || ''} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-4">
                                            <input type="number" name="emergency_number" className="border rounded-md p-2 w-full" defaultValue={selectedUser?.emergency_number || ''} />
                                        </div>
                                    </div>
                                </div>

                                {/* SUBMIT */}
                                <div className="w-full flex items-center justify-center mt-6">
                                    <button type="submit" className="w-full h-[50px] bg-slate-400">
                                        {selectedUser ? 'Update User' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}