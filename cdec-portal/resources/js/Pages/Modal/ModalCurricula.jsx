import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

export default function ModalCurricula({ setIsModalOpen, programs, courses }) {
    // ---------- STATES ----------
    const [courseType, setCourseType] = useState("");
    const [courseSearch, setCourseSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [preSearch, setPreSearch] = useState("");
    const [selectedPre, setSelectedPre] = useState([]);
    const [showPreDropdown, setShowPreDropdown] = useState(false);

    // ---------- REFS ----------
    const courseDropdownRef = useRef(null);
    const preDropdownRef = useRef(null);

    // ---------- CLOSE DROPDOWNS WHEN CLICKING OUTSIDE ----------
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

    // ---------- COURSE TYPE OPTIONS ----------
    const courseOptions = [
        "General Education",
        "General Education (Mandated Course)",
        "Physical Education",
        "Professional Education (Foundation / Theories and Concepts)",
        "Professional Education (Methods and Strategies)",
        "Professional Education (Experiential Learning)",
        "Professional Education (Special Topics)",
        "General Education (Core Courses)",
        "Mandated Courses",
        "Religious Studies",
        "Mandated Filipino and Literature Courses",
        "NSTP",
        "Professional Courses (Core Courses)",
        "Student Formation Course",
        "Major / Specialization Courses",
        "Professional Courses (Major Courses)",
        "General Education (Elective Courses)",
        "General Education (Mandated Courses)",
        "Major / Specialization Courses (Professional Courses)",
        "Filipino Courses",
        "Elective Courses",
        "Other Courses",
        "Literature Courses",
        "Major / Specialization Courses (Core Common Courses)",
        "Methods and Strategies",
        "Experiential Learning",
        "Special Topic"
    ];

    const displayedOptions = courseType
        ? courseOptions.filter(opt => opt !== courseType).concat(courseType)
        : courseOptions;

    // ---------- FILTER COURSES FOR SINGLE SELECT ----------
    const filteredCourses = courses
        ?.filter(course =>
            `${course.course_no} ${course.descriptive_title}`.toLowerCase()
            .includes(courseSearch.toLowerCase())
        )
        .slice(0, 10);

    // ---------- FILTER COURSES FOR PRE-REQUISITES MULTI-SELECT ----------
    const filteredPreCourses = courses
        ?.filter(course =>
            `${course.course_no} ${course.descriptive_title}`.toLowerCase()
            .includes(preSearch.toLowerCase())
        )
        .filter(course => course.course_id !== selectedCourse?.course_id)
        .slice(0, 10);

    // ---------- SUBMIT FORM ----------
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCourse) {
            alert("Please select a course");
            return;
        }
        if (!courseType) {
            alert("Please select a course type");
            return;
        }

        router.post('/curricula/store', {
            program_id: e.target.program_id.value,
            course_ids: [selectedCourse.course_id],
            academic_year: e.target.academic_year.value,
            academic_period: e.target.academic_period.value,
            academic_level: e.target.academic_level.value,
            course_type: courseType,
            pre_requisites: selectedPre.map(c => c.course_id),
        }, {
            preserveScroll: true,
            onSuccess: () => setIsModalOpen(false)
        });
    };

    return (
        <div className='w-full h-screen bg-gray-500/50 fixed inset-0 z-50'>
            <div className='w-full h-full justify-center items-center flex overflow-y-auto pt-10 pb-8'>
                <div className='w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col'>

                    {/* ---------- HEADER ---------- */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Create New Curricula
                            </h3>
                            <p>Fill in the required information to register a course.</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                        >
                            <FaTimes className="text-xl" />
                        </button>                 
                    </div>

                    {/* ---------- FORM ---------- */}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 pt-6">

                        {/* ---------- SECTION TITLE ---------- */}
                        <div>
                            <h2 className="text-2xl font-bold">Curricula Details</h2>
                            <p>Enter the required information to register a course.</p>
                        </div>

                        {/* ---------- TWO COLUMN SECTION ---------- */}
                        <div className="w-full flex flex-row gap-12 pt-4">

                            {/* LEFT COLUMN */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">Program</label>
                                <select name="program_id" className="border rounded-md p-2 w-full">
                                    <option value=""></option>
                                    {programs.map((prog) => (
                                        <option key={prog.program_id} value={prog.program_id}>
                                            {prog.abbreviation} {prog.program_name && `(${prog.program_name})`}
                                        </option>
                                    ))}
                                </select>

                                <label className="text-lg font-medium">Academic Year</label>
                                <input type="text" name="academic_year" placeholder="2026-2027" className="border rounded-md p-2 w-full" />

                                <label className="text-lg font-medium">Academic Period</label>
                                <select name="academic_period" className="border rounded-md p-2 w-full">
                                    <option value=""></option>
                                    <option value="First Semester">First Semester</option>
                                    <option value="Second Semester">Second Semester</option>
                                    <option value="Summer">Summer</option>
                                </select>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">Academic Level</label>
                                <select name="academic_level" className="border rounded-md p-2 w-full">
                                    <option value=""></option>
                                    <option value="First Year">First Year</option>
                                    <option value="Second Year">Second Year</option>
                                    <option value="Third Year">Third Year</option>
                                    <option value="Fourth Year">Fourth Year</option>
                                </select>   

                                {/* COURSE NO */}
                                <label className="text-lg font-medium">Course No</label>
                                <div className="relative w-full" ref={courseDropdownRef}>
                                    <input
                                        type="text"
                                        className="border rounded-md p-2 w-full"
                                        placeholder="Select or search course..."
                                        value={selectedCourse ? `${selectedCourse.course_no} - ${selectedCourse.descriptive_title}` : courseSearch}
                                        onChange={(e) => { setCourseSearch(e.target.value); setSelectedCourse(null); setShowDropdown(true); }}
                                        onFocus={() => setShowDropdown(true)}
                                    />
                                    {showDropdown && (
                                        <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto rounded-md shadow-md mt-1">
                                            {filteredCourses.length > 0 ? (
                                                <>
                                                    {filteredCourses
                                                        .filter(c => !selectedCourse || c.course_id !== selectedCourse.course_id)
                                                        .map(course => (
                                                        <div
                                                            key={course.course_id}
                                                            className="p-2 hover:bg-orange-100 cursor-pointer"
                                                            onClick={() => { setSelectedCourse(course); setShowDropdown(false); }}
                                                        >
                                                            {course.course_no} - {course.descriptive_title}
                                                        </div>
                                                    ))}
                                                    {selectedCourse && (
                                                        <div className="p-2 bg-orange-50 cursor-pointer">
                                                            {selectedCourse.course_no} - {selectedCourse.descriptive_title} (Selected)
                                                        </div>
                                                    )}
                                                </>
                                            ) : <div className="p-2 text-gray-400">No results found</div>}
                                        </div>
                                    )}
                                </div>

                                {/* PRE-REQUISITES */}
                                <label className="text-lg font-medium">Pre Requisites</label>
                                <div className="relative w-full" ref={preDropdownRef}>
                                    <div className="flex flex-wrap items-center border rounded-md p-2 w-full gap-2">
                                        {selectedPre.map(course => (
                                            <div key={course.course_id} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                                                {course.course_no}
                                                <span className="cursor-pointer font-bold" onClick={() =>
                                                    setSelectedPre(prev => prev.filter(c => c.course_id !== course.course_id))
                                                }>×</span>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            className="flex-1 outline-none min-w-[120px]"
                                            placeholder="Search Pre Requisites..."
                                            value={preSearch}
                                            onChange={(e) => { setPreSearch(e.target.value); setShowPreDropdown(true); }}
                                            onFocus={() => setShowPreDropdown(true)}
                                        />
                                    </div>
                                    {showPreDropdown && (
                                        <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto rounded-md shadow-md mt-1">
                                            {filteredPreCourses.length > 0 ? filteredPreCourses.map(course => {
                                                if (selectedPre.some(c => c.course_id === course.course_id)) return null;
                                                return (
                                                    <div
                                                        key={course.course_id}
                                                        className="p-2 hover:bg-orange-100 cursor-pointer"
                                                        onClick={() => { setSelectedPre(prev => [...prev, course]); setPreSearch(""); setShowPreDropdown(true); }}
                                                    >
                                                        {course.course_no} - {course.descriptive_title}
                                                    </div>
                                                )
                                            }) : <div className="p-2 text-gray-400">No results found</div>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* COURSE TYPE */}
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-lg font-medium">Course Type</label>
                            <select 
                                name="course_type"
                                className="border rounded-md p-2 w-full"
                                value={courseType}
                                onChange={(e) => setCourseType(e.target.value)}
                            >
                                <option value="">Select Course Type</option>
                                {displayedOptions.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        <div className='w-full'>
                            <button type='submit' className="w-full h-[50px] bg-slate-400 hover:bg-slate-500 text-white font-bold rounded-md transition-colors">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}