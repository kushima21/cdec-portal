import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaTimes, FaBuilding } from 'react-icons/fa';

export default function ModalDepartment({ setIsModalOpen }) {
    // ================= STATE CONFIGURATIONS =================
    const [data, setData] = useState({
        abbreviation: '',
        department_name: '',
        description: '',
        college: '',
        department_dean: '',
        chair_person: ''
    });

    const [errors, setErrors] = useState({});

    // ================= HANDLERS =================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors({});

        router.post('/department/store', data, {
            onSuccess: () => {
                setIsModalOpen(false);
                setData({
                    abbreviation: '',
                    department_name: '',
                    description: '',
                    college: '',
                    department_dean: '',
                    chair_person: ''
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
                            <FaBuilding className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Add New Department</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Register an organizational department structure and appoint its administrative leadership.</p>
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
                <form onSubmit={submitHandler} id="departmentForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                    
                    <div>
                        <h2 className="text-base font-bold text-gray-800">Department Details</h2>
                        <p className="text-xs text-gray-500">Enter organizational naming keys and assign leadership chairs.</p>
                    </div>

                    {/* 2-COLUMN FIELD STRUCTURES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* LEFT FORM COLUMN */}
                        <div className="space-y-4">
                            {/* ABBREVIATION */}
                            <div>
                                <label className={labelStyle}>Abbreviation / Code</label>
                                <input 
                                    type="text" 
                                    name="abbreviation" 
                                    value={data.abbreviation}
                                    onChange={handleInputChange}
                                    placeholder="e.g., BSCS" 
                                    className={textInputStyle} 
                                />
                                {errors.abbreviation && <p className={errorStyle}>{errors.abbreviation}</p>}
                            </div>

                            {/* NAME */}
                            <div>
                                <label className={labelStyle}>Official Department Name</label>
                                <input
                                    type="text"
                                    name="department_name"
                                    value={data.department_name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Department of Computer Science"
                                    className={textInputStyle}
                                />
                                {errors.department_name && <p className={errorStyle}>{errors.department_name}</p>}
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className={labelStyle}>Functional Description</label>
                                <textarea
                                    name="description"
                                    value={data.description}
                                    onChange={handleInputChange}
                                    placeholder="Provide department objectives and scope details..."
                                    className={`${textInputStyle} h-[116px] resize-none`}
                                />
                                {errors.description && <p className={errorStyle}>{errors.description}</p>}
                            </div>
                        </div>

                        {/* RIGHT FORM COLUMN */}
                        <div className="space-y-4">
                            {/* COLLEGE AFFILIATION */}
                            <div>
                                <label className={labelStyle}>Parent College Affiliation</label>
                                <select 
                                    name="college" 
                                    value={data.college}
                                    onChange={handleInputChange}
                                    className={textInputStyle}
                                >
                                    <option value="" disabled>Select parent entity...</option>
                                    <option value="Education">Education</option>
                                    <option value="Criminology">Criminology</option>
                                    <option value="Business Administration">Business Administration</option>
                                </select>
                                {errors.college && <p className={errorStyle}>{errors.college}</p>}
                            </div>

                            {/* DEPARTMENT DEAN */}
                            <div>
                                <label className={labelStyle}>Appointed Department Dean</label>
                                <select 
                                    name="department_dean" 
                                    value={data.department_dean}
                                    onChange={handleInputChange}
                                    className={textInputStyle}
                                >
                                    <option value="" disabled>Select primary dean officer...</option>
                                    <option value="BSBA - FM">BSBA - FM</option>
                                    <option value="Criminology">Criminology</option>
                                    <option value="Business Administration">Business Administration</option>
                                </select>
                                {errors.department_dean && <p className={errorStyle}>{errors.department_dean}</p>}
                            </div>

                            {/* CHAIR PERSON */}
                            <div>
                                <label className={labelStyle}>Active Chairperson</label>
                                <select 
                                    name="chair_person"
                                    value={data.chair_person}
                                    onChange={handleInputChange}
                                    className={textInputStyle}
                                >
                                    <option value="" disabled>Select executive chairperson...</option>
                                    <option value="Education">Education</option>
                                    <option value="Criminology">Criminology</option>
                                    <option value="Business Administration">Business Administration</option>
                                </select>
                                {errors.chair_person && <p className={errorStyle}>{errors.chair_person}</p>}
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
                        form="departmentForm"
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
                    >
                        Create Department
                    </button>
                </div>

            </div>
        </div>
    );
}