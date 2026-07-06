import { router } from '@inertiajs/react';
import { FaTimes, FaBuilding } from 'react-icons/fa';  
import { useState } from 'react';

export default function ModalBuilding({ setIsModalOpen, addBuilding }) {
    const floorOptions = ["Ground", "1st", "2nd", "3rd", "4th", "5th"];
    
    const [form, setForm] = useState({
        building_name: '',
        floors: [],
        description: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'floors') {
            if (!value) return; // Ignore default fallback selection
            setForm(prev => ({
                ...prev,
                floors: prev.floors.includes(value) ? prev.floors : [...prev.floors, value]
            }));
            // Clear validation error if selection alters
            setErrors(prev => ({ ...prev, floors: null }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const removeFloor = (floor) => {
        setForm(prev => ({ ...prev, floors: prev.floors.filter(f => f !== floor) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        router.post('/building/store', form, {
            onSuccess: (page) => {
                // Safely update parent context mapping if data properties exist
                if (page.props && page.props.building) {
                    addBuilding(page.props.building);
                }
                setIsModalOpen(false);
            },
            onError: (err) => setErrors(err),
        });
    };

    // Shared Design System Styling Classes
    const inputStyle = "mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";
    const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600";
    const errorStyle = "text-xs font-medium text-red-600 mt-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">
                
                {/* MODAL HEADER */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <FaBuilding className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Create New Building</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Register structural facilities, level footprints, and resource metadata locations.</p>
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

                {/* FORM CONTROLLER BODY */}
                <form onSubmit={handleSubmit} id="buildingForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* LEFT COLUMN: INTERACTIVE CONTROLS */}
                        <div className="flex flex-col gap-4">
                            
                            {/* BUILDING NAME */}
                            <div>
                                <label className={labelStyle}>Facility / Building Name</label>
                                <input 
                                    type="text" 
                                    name="building_name" 
                                    value={form.building_name}
                                    onChange={handleChange}
                                    placeholder="e.g., Engineering Hall, Science Bloc" 
                                    className={inputStyle}
                                    required
                                />
                                {errors.building_name && <p className={errorStyle}>{errors.building_name}</p>}
                            </div>

                            {/* FLOORS MULTI-SELECT */}
                            <div>
                                <label className={labelStyle}>Map Floor Options</label>
                                <select
                                    name="floors"
                                    value=""
                                    onChange={handleChange}
                                    className={inputStyle}
                                >
                                    <option value="">-- Choose Level to Append --</option>
                                    {floorOptions.map((floor, index) => (
                                        <option key={index} value={floor}>{floor} Level</option>
                                    ))}
                                </select>
                                {errors.floors && <p className={errorStyle}>{errors.floors}</p>}

                                {/* DYNAMIC CHIPS BOX */}
                                <div className="mt-3 flex flex-wrap gap-2 rounded-lg border border-dashed border-gray-200 p-3 bg-gray-50/50 min-h-[50px]">
                                    {form.floors.length > 0 ? (
                                        form.floors.map((f, idx) => (
                                            <span 
                                                key={idx} 
                                                className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 pl-3 pr-2 py-1 text-xs font-semibold text-blue-700 border border-blue-200/60 shadow-sm transition-all animate-scale-up"
                                            >
                                                {f} Floor
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeFloor(f)}
                                                    className="inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-100 hover:text-blue-900 transition-colors focus:outline-none"
                                                >
                                                    <FaTimes className="w-2.5 h-2.5" />
                                                </button>
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400 italic self-center">No assigned levels chosen yet.</p>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: DESCRIPTION MEMO */}
                        <div className="flex flex-col">
                            <label className={labelStyle}>Structural Overview / Description</label>
                            <textarea 
                                name="description" 
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Detail functional operations, campus zone markers, department hubs or accessibility descriptions..." 
                                className={`${inputStyle} flex-1 min-h-[180px] md:min-h-full resize-none`}
                            />
                            {errors.description && <p className={errorStyle}>{errors.description}</p>}
                        </div>

                    </div>

                </form>

                {/* MODAL FOOTER ACTION STRIP */}
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
                        form="buildingForm"
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
                    >
                        Create Building
                    </button>
                </div>

            </div>
        </div>
    );
}