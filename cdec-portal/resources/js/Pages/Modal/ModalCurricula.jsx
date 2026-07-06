import { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FaTimes, FaGraduationCap, FaSearch } from 'react-icons/fa';

export default function ModalCurricula({ setIsModalOpen, programs = [], courses = [] }) {
    // ================= STATE CONFIGURATIONS =================
    const [formData, setFormData] = useState({
        program_id: '',
        academic_year: '',
        academic_period: '',
        academic_level: '',
    });
    const [courseType, setCourseType] = useState("");
    const [courseSearch, setCourseSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [preSearch, setPreSearch] = useState("");
    const [selectedPre, setSelectedPre] = useState([]);
    const [showPreDropdown, setShowPreDropdown] = useState(false);
    const [errors, setErrors] = useState({});

    // ================= REFS =================
    const courseDropdownRef = useRef(null);
    const preDropdownRef = useRef(null);

    // ================= CLICK OUTSIDE DROPDOWN DETECTOR =================
    useEffect(() => {
        function handleClickOutside(event) {
            if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (preDropdownRef.current && !preDropdownRef.current.contains(event.target)) {
                setShowPreDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Options Configuration
    const courseOptions = [
        "General Education", "Core Courses", "Major Courses", 
        "Elective Courses", "Mandated Courses", "Additional Courses", 
        "PATHFIT", "NSTP", "Special Topic"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    // ================= QUERY FILTER ENGINE =================
    const filteredCourses = courses
        ?.filter(course =>
            `${course.course_no} ${course.descriptive_title}`.toLowerCase()
            .includes(courseSearch.toLowerCase())
        ).slice(0, 10);

    const filteredPreCourses = courses
        ?.filter(course =>
            `${course.course_no} ${course.descriptive_title}`.toLowerCase()
            .includes(preSearch.toLowerCase())
        )
        .filter(course => course.course_id !== selectedCourse?.course_id)
        .slice(0, 10);

    // ================= DISPATCH HANDLER =================
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const localErrors = {};
        if (!selectedCourse) localErrors.course_id = "Primary course selection is required.";
        if (!courseType) localErrors.course_type = "Course category type must be designated.";
        if (!formData.program_id) localErrors.program_id = "Target program scope is required.";

        if (Object.keys(localErrors).length > 0) {
            setErrors(localErrors);
            return;
        }

        router.post('/curricula/store', {
            ...formData,
            course_ids: [selectedCourse.course_id],
            course_type: courseType,
            pre_requisites: selectedPre.map(c => c.course_id),
        }, {
            preserveScroll: true,
            onSuccess: () => setIsModalOpen(false),
            onError: (err) => setErrors(err)
        });
    };

    // Shared Styling Tokens
    const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600 block mb-1";
    const textInputStyle = "w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400";
    const dropdownItemStyle = "p-2.5 hover:bg-blue-50 text-sm text-gray-700 cursor-pointer border-b border-gray-100 last:border-0 transition-colors";
    const errorStyle = "text-xs font-medium text-red-600 mt-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all">
            {/* BACKDROP CLOSER */}
            <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

            {/* MAIN MODAL HOUSING */}
            <div className="relative flex max-h-[95vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">
                
                {/* HEADER SECTION */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <FaGraduationCap className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Create New Curricula</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Map courses to degree structures, academic tracking terms, and dependency graphs.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-xl p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all"
                    >
                        <FaTimes className="text-lg" />
                    </button> 
                </div>

                {/* MODAL WORKSPACE FORM */}
                <form onSubmit={handleSubmit} id="curriculaForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <div>
                        <h2 className="text-base font-bold text-gray-800">Curricula Details</h2>
                        <p className="text-xs text-gray-500">Configure institutional timelines and prerequisites rules framework.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* LEFT COLUMN */}
                        <div className="space-y-4">
                            {/* PROGRAM */}
                            <div>
                                <label className={labelStyle}>Program Assignment</label>
                                <select 
                                    name="program_id" 
                                    value={formData.program_id}
                                    onChange={handleInputChange}
                                    className={textInputStyle}
                                >
                                    <option value="">Select Target Degree Program</option>
                                    {programs.map((prog) => (
                                        <option key={prog.program_id} value={prog.program_id}>
                                            {prog.abbreviation} {prog.program_name && `(${prog.program_name})`}
                                        </option>
                                    ))}
                                </select>
                                {errors.program_id && <p className={errorStyle}>{errors.program_id}</p>}
                            </div>

                            {/* ACADEMIC YEAR */}
                            <div>
                                <label className={labelStyle}>Academic Year</label>
                                <input 
                                    type="text" 
                                    name="academic_year" 
                                    value={formData.academic_year}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 2026-2027" 
                                    className={textInputStyle} 
                                />
                                {errors.academic_year && <p className={errorStyle}>{errors.academic_year}</p>}
                            </div>

                            {/* ACADEMIC PERIOD */}
                            <div>
                                <label className={labelStyle}>Academic Period</label>
                                <select 
                                    name="academic_period" 
                                    value={formData.academic_period}
                                    onChange={handleInputChange}
                                    className={textInputStyle}
                                >
                                    <option value="">Select Phase Term</option>
                                    <option value="First Semester">First Semester</option>
                                    <option value="Second Semester">Second Semester</option>
                                    <option value="Summer">Summer</option>
                                </select>
                                {errors.academic_period && <p className={errorStyle}>{errors.academic_period}</p>}
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-4">
                            {/* ACADEMIC LEVEL */}
                            <div>
                                <label className={labelStyle}>Academic Standing Level</label>
                                <select 
                                    name="academic_level" 
                                    value={formData.academic_level}
                                    onChange={handleInputChange}
                                    className={textInputStyle}
                                >
                                    <option value="">Select Year Standing</option>
                                    <option value="First Year">First Year</option>
                                    <option value="Second Year">Second Year</option>
                                    <option value="Third Year">Third Year</option>
                                    <option value="Fourth Year">Fourth Year</option>
                                </select> 
                                {errors.academic_level && <p className={errorStyle}>{errors.academic_level}</p>}
                            </div>

                            {/* COURSE SEARCH DROPDOWN */}
                            <div className="relative" ref={courseDropdownRef}>
                                <label className={labelStyle}>Core Course Target</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className={`${textInputStyle} pr-9`}
                                        placeholder="Type course code or description..."
                                        value={selectedCourse ? `${selectedCourse.course_no} - ${selectedCourse.descriptive_title}` : courseSearch}
                                        onChange={(e) => { 
                                            setCourseSearch(e.target.value); 
                                            setSelectedCourse(null); 
                                            setShowDropdown(true); 
                                        }}
                                        onFocus={() => setShowDropdown(true)}
                                    />
                                    <FaSearch className="absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none" />
                                </div>
                                {errors.course_id && <p className={errorStyle}>{errors.course_id}</p>}

                                {showDropdown && (
                                    <div className="absolute z-50 bg-white border border-gray-200 w-full max-h-56 overflow-y-auto rounded-lg shadow-xl mt-1">
                                        {filteredCourses.length > 0 ? (
                                            filteredCourses.map(course => (
                                                <div
                                                    key={course.course_id}
                                                    className={`${dropdownItemStyle} ${selectedCourse?.course_id === course.course_id ? 'bg-blue-50 font-medium text-blue-600' : ''}`}
                                                    onClick={() => { 
                                                        setSelectedCourse(course); 
                                                        setShowDropdown(false); 
                                                        setErrors(prev => ({...prev, course_id: null}));
                                                    }}
                                                >
                                                    <span className="font-semibold text-blue-600">{course.course_no}</span> — {course.descriptive_title}
                                                </div>
                                            ))
                                        ) : <div className="p-3 text-xs text-gray-400 text-center">No active system courses match search</div>}
                                    </div>
                                )}
                            </div>

                            {/* MULTI-SELECT PRE-REQUISITES */}
                            <div className="relative" ref={preDropdownRef}>
                                <label className={labelStyle}>Pre-Requisites Tree</label>
                                <div className="flex flex-wrap items-center border border-gray-300 rounded-lg bg-gray-50 p-1.5 w-full gap-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                                    {selectedPre.map(course => (
                                        <div key={course.course_id} className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1">
                                            {course.course_no}
                                            <button 
                                                type="button" 
                                                className="hover:text-red-500 font-bold ml-0.5 text-sm" 
                                                onClick={() => setSelectedPre(prev => prev.filter(c => c.course_id !== course.course_id))}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        className="flex-1 outline-none min-w-[140px] bg-transparent text-sm p-1"
                                        placeholder={selectedPre.length > 0 ? "" : "Search dependency blocks..."}
                                        value={preSearch}
                                        onChange={(e) => { setPreSearch(e.target.value); setShowPreDropdown(true); }}
                                        onFocus={() => setShowPreDropdown(true)}
                                    />
                                </div>

                                {showPreDropdown && (
                                    <div className="absolute z-50 bg-white border border-gray-200 w-full max-h-56 overflow-y-auto rounded-lg shadow-xl mt-1">
                                        {filteredPreCourses.length > 0 ? (
                                            filteredPreCourses.map(course => {
                                                if (selectedPre.some(c => c.course_id === course.course_id)) return null;
                                                return (
                                                    <div
                                                        key={course.course_id}
                                                        className={dropdownItemStyle}
                                                        onClick={() => { 
                                                            setSelectedPre(prev => [...prev, course]); 
                                                            setPreSearch(""); 
                                                        }}
                                                    >
                                                        <span className="font-semibold text-gray-900">{course.course_no}</span> - {course.descriptive_title}
                                                    </div>
                                                );
                                            })
                                        ) : <div className="p-3 text-xs text-gray-400 text-center">No structural dependencies available</div>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* COURSE TYPE FIELD - SINGLE ROW GRID BLOCK */}
                    <div className="w-full pt-2">
                        <label className={labelStyle}>Course Structure Track Classification</label>
                        <select 
                            name="course_type"
                            className={textInputStyle}
                            value={courseType}
                            onChange={(e) => {
                                setCourseType(e.target.value);
                                if (errors.course_type) setErrors(prev => ({...prev, course_type: null}));
                            }}
                        >
                            <option value="">Select Curricular Track Classification</option>
                            {courseOptions.map((opt, idx) => (
                                <option key={idx} value={opt}>{opt}</option>
                            ))}
                        </select>
                        {errors.course_type && <p className={errorStyle}>{errors.course_type}</p>}
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
                        form="curriculaForm"
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
                    >
                        Create Curricula
                    </button>
                </div>

            </div>
        </div>
    );
}