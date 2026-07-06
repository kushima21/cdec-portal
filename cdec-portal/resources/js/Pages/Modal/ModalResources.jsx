import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaTimes, FaDoorOpen } from 'react-icons/fa';

export default function ModalResources({ setIsModalOpen, buildings = [] }) {
    // ================= STATE CONFIGURATIONS =================
    const [form, setForm] = useState({
        room_name: '',
        glossary: '',
        description: '',
        building: '',
        floor: '',
        capacity: ''
    });
    const [errors, setErrors] = useState({});

    // ================= HANDLERS =================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        router.post('/resources/store', form, {
            onSuccess: () => {
                setIsModalOpen(false);
                setForm({
                    room_name: '',
                    glossary: '',
                    description: '',
                    building: '',
                    floor: '',
                    capacity: ''
                });
            },
            onError: (err) => setErrors(err)
        });
    };

    // Shared Modern UI Style Tokens
    const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600 block mb-1";
    const textInputStyle = "w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400";
    const errorStyle = "text-xs font-medium text-red-600 mt-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all">
            {/* BACKDROP INTERCEPTOR */}
            <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

            {/* MAIN MODAL HOUSING */}
            <div className="relative flex max-h-[95vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">
                
                {/* HEADER SECTION */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <FaDoorOpen className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Create New Room</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Register structural locations, inventory spaces, and assign base limits.</p>
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

                {/* MODAL WORKSPACE FORM */}
                <form onSubmit={handleSubmit} id="resourceForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-gray-800">Room Details</h2>
                        <p className="text-xs text-gray-500">Enter physical location references and environmental properties.</p>
                    </div>

                    {/* 2-COLUMN STRUCTURE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* LEFT COLUMN */}
                        <div className="space-y-4">
                            {/* ROOM NAME */}
                            <div>
                                <label className={labelStyle}>Room Designation / Name</label>
                                <input 
                                    type="text"
                                    name="room_name"
                                    value={form.room_name}
                                    onChange={handleChange}
                                    placeholder="e.g., Room 302, Lab A"
                                    className={textInputStyle}
                                />
                                {errors.room_name && <p className={errorStyle}>{errors.room_name}</p>}
                            </div>

                            {/* GLOSSARY / CODE */}
                            <div>
                                <label className={labelStyle}>Glossary Key / Short Code</label>
                                <input
                                    type="text"
                                    name="glossary"
                                    value={form.glossary}
                                    onChange={handleChange}
                                    placeholder="e.g., COMP-LAB"
                                    className={textInputStyle}
                                />
                                {errors.glossary && <p className={errorStyle}>{errors.glossary}</p>}
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className={labelStyle}>Space Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe architectural features or primary operational purposes..."
                                    className={`${textInputStyle} h-[116px] resize-none`}
                                />
                                {errors.description && <p className={errorStyle}>{errors.description}</p>}
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-4">
                            {/* BUILDING SELECTION */}
                            <div>
                                <label className={labelStyle}>Assigned Complex / Building</label>
                                <select
                                    name="building"
                                    value={form.building}
                                    onChange={handleChange}
                                    className={textInputStyle}
                                >
                                    <option value="" disabled>Select target structural block...</option>
                                    {buildings.map((building) => (
                                        <option key={building.id} value={building.id}>
                                            {building.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.building && <p className={errorStyle}>{errors.building}</p>}
                            </div>

                            {/* FLOOR LEVEL */}
                            <div>
                                <label className={labelStyle}>Floor Level Placement</label>
                                <input
                                    type="text"
                                    name="floor"
                                    value={form.floor}
                                    onChange={handleChange}
                                    placeholder="e.g., 3rd Floor"
                                    className={textInputStyle}
                                />
                                {errors.floor && <p className={errorStyle}>{errors.floor}</p>}
                            </div>

                            {/* SEATING CAPACITY */}
                            <div>
                                <label className={labelStyle}>Maximum Occupancy / Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={form.capacity}
                                    onChange={handleChange}
                                    placeholder="e.g., 45"
                                    className={textInputStyle}
                                />
                                {errors.capacity && <p className={errorStyle}>{errors.capacity}</p>}
                            </div>
                        </div>
                    </div>
                </form>

                {/* MODAL RUNTIME FOOTER */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        form="resourceForm"
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
                    >
                        Create Room
                    </button>
                </div>

            </div>
        </div>
    );
}