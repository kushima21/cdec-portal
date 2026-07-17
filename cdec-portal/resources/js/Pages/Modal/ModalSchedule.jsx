import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaTimes, FaCalendarAlt, FaCheck } from 'react-icons/fa';

export default function ModalSchedule({ setIsModalOpen, users, curriculla, resources, academicTerms }) {
    // ================= VISIBILITY CONTROLS =================
    const [showCurriculum, setShowCurriculum] = useState(false);
    const [showRoom, setShowRoom] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showDays, setShowDays] = useState(false);
    const [showDuration, setShowDuration] = useState(false);
    const [showAcademicTerm, setShowAcademicTerm] = useState(false);

    // ================= FORM DATA STATES =================
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availableSlot, setAvailableSlot] = useState('');
    const [searchCurriculum, setSearchCurriculum] = useState('');
    const [searchUser, setSearchUser] = useState('');
    const [searchAcademicTerm, setSearchAcademicTerm] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState('');

    // ================= ASSIGNED DATA IDENTIFIERS =================
    const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
    const [selectedCurriculumLabel, setSelectedCurriculumLabel] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [selectedRoomLabel, setSelectedRoomLabel] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserLabel, setSelectedUserLabel] = useState('');
    const [selectedAcademicId, setSelectedAcademicId] = useState('');
    const [selectedAcademicLabel, setSelectedAcademicLabel] = useState('');

    // ================= FEEDBACK AND DATA LOOKUPS =================
    const [errors, setErrors] = useState({});
    
    const daysList = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    const toggleDaySelection = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
        setErrors(prev => ({ ...prev, days: null }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors({});

        router.post('/schedule/store', {
            academic_id: selectedAcademicId,
            curricula_id: selectedCurriculumId,
            resources_id: selectedRoomId, 
            instructor_id: selectedUserId,
            days: selectedDays,
            start_time: startTime,
            end_time: endTime,
            duration: selectedDuration,
            available_slot: availableSlot,
        }, {
            onSuccess: () => {
                setIsModalOpen(false);
                // Reset State Mapping
                setSelectedCurriculumId('');
                setSelectedCurriculumLabel('');
                setSelectedRoomId('');
                setSelectedRoomLabel('');
                setSelectedUserId('');
                setSelectedUserLabel('');
                setSelectedDays([]);
                setStartTime('');
                setEndTime('');
                setSelectedDuration('');
                setAvailableSlot('');
                setSearchCurriculum('');
                setSearchUser('');
                setSelectedAcademicId('');
                setSelectedAcademicLabel('');
                setSearchAcademicTerm('');
            },
            onError: (err) => setErrors(err)
        });
    };

    // Shared Tailwind UI Classes
    const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600 block mb-1";
    const inputStyle = "w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer";
    const textInputStyle = "w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";
    const dropdownContainerStyle = "absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-48 overflow-y-auto py-1";
    const errorStyle = "text-xs font-medium text-red-600 mt-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all">
            {/* BACKDROP CLOSURE INTERCEPTOR */}
            <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

            {/* MAIN MODAL HOUSING */}
            <div className="relative flex max-h-[95vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">
                
                {/* HEADER SECTION */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <FaCalendarAlt className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Create New Schedule</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Map curriculum timelines, assign structural rooms, and outline instructor blocks.</p>
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
                <form onSubmit={submitHandler} id="scheduleForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                    
                    {/* ================= SECTION: ACADEMIC TERM ================= */}
                    <div className="relative">
                        <label className={labelStyle}>
                            Assigned Academic Term
                        </label>
                        <input
                            type="text"
                            value={searchAcademicTerm || selectedAcademicLabel}
                            onChange={(e) => {
                                setSearchAcademicTerm(e.target.value);
                                setShowAcademicTerm(true);
                            }}
                            onFocus={() => setShowAcademicTerm(true)}
                            placeholder="Search academic term..."
                            className={textInputStyle}
                        />

                        {errors.academic_id && (
                            <p className={errorStyle}>{errors.academic_id}</p>
                        )}

                        {showAcademicTerm && (
                            <div className={dropdownContainerStyle}>
                                {academicTerms
                                    ?.filter(term =>
                                        `${term.academic_year} ${term.academic_period}`
                                            .toLowerCase()
                                            .includes(searchAcademicTerm.toLowerCase())
                                    )
                                    .map(term => (
                                        <div
                                            key={term.academic_id}
                                            onClick={() => {
                                                setSelectedAcademicId(term.academic_id);
                                                setSelectedAcademicLabel(
                                                    `${term.academic_year} • ${term.academic_period}`
                                                );
                                                setSearchAcademicTerm('');
                                                setShowAcademicTerm(false);
                                            }}
                                            className="cursor-pointer px-4 py-3 hover:bg-blue-50"
                                        >
                                            <div className="font-semibold">
                                                {term.academic_year}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {term.academic_period}
                                            </div>
                                        </div>
                                    ))}

                                {academicTerms?.filter(term =>
                                    `${term.academic_year} ${term.academic_period}`
                                        .toLowerCase()
                                        .includes(searchAcademicTerm.toLowerCase())
                                ).length === 0 && (
                                    <div className="px-4 py-3 text-gray-500">
                                        No Academic Term Found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ================= SECTION: CURRICULUM ================= */}
                    <div className="relative">
                        <label className={`${labelStyle} mt-2`}>
                            Assigned Curriculum
                        </label>
                        <input
                            type="text"
                            value={searchCurriculum || selectedCurriculumLabel}
                            onChange={(e) => {
                                setSearchCurriculum(e.target.value);
                                setShowCurriculum(true);
                            }}
                            onFocus={() => setShowCurriculum(true)}
                            className={textInputStyle}
                            placeholder="Type to search curriculum profiles..."
                        />
                        {errors.curricula_id && <p className={errorStyle}>{errors.curricula_id}</p>}

                        {showCurriculum && (
                            <div className={dropdownContainerStyle}>
                                {curriculla?.filter((item) =>
                                    `${item.course_no} ${item.descriptive_title} ${item.academic_year}`
                                        .toLowerCase()
                                        .includes(searchCurriculum.toLowerCase())
                                ).map((item) => (
                                    <div
                                        key={item.curricula_id}
                                        onClick={() => {
                                            setSelectedCurriculumId(item.curricula_id);
                                            setSelectedCurriculumLabel(`${item.course_no} - ${item.descriptive_title}`);
                                            setSearchCurriculum('');
                                            setShowCurriculum(false);
                                        }}
                                        className="px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                                    >
                                        <span className="font-semibold">{item.course_no}</span> — {item.descriptive_title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ================= 2-COLUMN FIELD STRUCTURES ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* LEFT FORM COLUMN */}
                        <div className="space-y-4">
                            {/* START TIME */}
                            <div>
                                <label className={labelStyle}>Start Time</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className={textInputStyle}
                                />
                                {errors.start_time && <p className={errorStyle}>{errors.start_time}</p>}
                            </div>

                            {/* ROOM HOUSING */}
                            <div className="relative">
                                <label className={labelStyle}>Classroom / Facility Resource</label>
                                <div 
                                    onClick={() => setShowRoom(!showRoom)} 
                                    className={inputStyle}
                                >
                                    {selectedRoomLabel || <span className="text-gray-400">Select assigned room Location</span>}
                                </div>
                                {errors.resources_id && <p className={errorStyle}>{errors.resources_id}</p>}

                                {showRoom && (
                                    <div className={dropdownContainerStyle}>
                                        {resources?.map((room) => (
                                            <div
                                                key={room.resources_id}
                                                onClick={() => {
                                                    setSelectedRoomId(room.resources_id);
                                                    setSelectedRoomLabel(room.room_name);
                                                    setShowRoom(false);
                                                }}
                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                                            >
                                                {room.room_name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* DURATION TYPE */}
                            <div className="relative">
                                <label className={labelStyle}>Term Duration</label>
                                <div 
                                    onClick={() => setShowDuration(!showDuration)} 
                                    className={inputStyle}
                                >
                                    {selectedDuration || <span className="text-gray-400">Select calendar term span</span>}
                                </div>
                                {errors.duration && <p className={errorStyle}>{errors.duration}</p>}

                                {showDuration && (
                                    <div className={dropdownContainerStyle}>
                                        {["Whole Semester", "Summer"].map((item) => (
                                            <div
                                                key={item}
                                                onClick={() => {
                                                    setSelectedDuration(item);
                                                    setShowDuration(false);
                                                }}
                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT FORM COLUMN */}
                        <div className="space-y-4">
                            {/* END TIME */}
                            <div>
                                <label className={labelStyle}>End Time</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className={textInputStyle}
                                />
                                {errors.end_time && <p className={errorStyle}>{errors.end_time}</p>}
                            </div>

                            {/* MODERNIZED MULTIPLE DAYS SELECTOR BOX */}
                            <div className="relative">
                                <label className={labelStyle}>Target Days Schedule</label>
                                <div 
                                    onClick={() => setShowDays(!showDays)} 
                                    className={inputStyle}
                                >
                                    <span className={selectedDays.length === 0 ? "text-gray-400" : "text-gray-900 font-medium"}>
                                        {selectedDays.length === 0 
                                            ? "Choose continuous days" 
                                            : `Selected (${selectedDays.length}) Days`
                                        }
                                    </span>
                                </div>
                                {errors.days && <p className={errorStyle}>{errors.days}</p>}

                                {showDays && (
                                    <div className="absolute z-30 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-xl p-1.5 space-y-0.5">
                                        {daysList.map((day) => {
                                            const isChecked = selectedDays.includes(day);
                                            return (
                                                <div
                                                    key={day}
                                                    onClick={() => toggleDaySelection(day)}
                                                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                                                        isChecked 
                                                            ? "bg-blue-50 text-blue-700 font-semibold" 
                                                            : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <span>{day}</span>
                                                    {isChecked && <FaCheck className="text-xs text-blue-600" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* REACTIVE ACTIVE SELECTION INDICATOR PILLS */}
                                <div className="mt-2 flex flex-wrap gap-1.5 min-h-[34px] p-2 rounded-lg border border-dashed border-gray-200 bg-gray-50/50">
                                    {selectedDays.length > 0 ? (
                                        selectedDays.map((day) => (
                                            <span 
                                                key={day} 
                                                className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 border border-blue-200"
                                            >
                                                {day.substring(0, 3)}
                                                <button 
                                                    type="button" 
                                                    onClick={() => toggleDaySelection(day)}
                                                    className="text-blue-400 hover:text-blue-900 focus:outline-none"
                                                >
                                                    <FaTimes className="w-2 h-2" />
                                                </button>
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-400 italic self-center pl-1">No execution days defined.</span>
                                    )}
                                </div>
                            </div>

                            {/* AVAILABLE SEAT SLOTS */}
                            <div>
                                <label className={labelStyle}>Available Allocation Slots</label>
                                <input
                                    type="number"
                                    value={availableSlot}
                                    onChange={(e) => setAvailableSlot(e.target.value)}
                                    placeholder="e.g., 40"
                                    className={textInputStyle}
                                />
                                {errors.available_slot && <p className={errorStyle}>{errors.available_slot}</p>}
                            </div>
                        </div>
                    </div>

                    {/* ================= SECTION: INSTRUCTOR ASSIGNMENT DROPDOWN ================= */}
                    <div className="relative">
                        <label className={labelStyle}>
                            Lead Instructor
                        </label>
                        <input
                            type="text"
                            value={searchUser || selectedUserLabel}
                            onChange={(e) => {
                                setSearchUser(e.target.value);
                                setShowUser(true);
                            }}
                            onFocus={() => setShowUser(true)}
                            className={textInputStyle}
                            placeholder="Search instructor..."
                        />
                        {errors.instructor_id && <p className={errorStyle}>{errors.instructor_id}</p>}

                        {showUser && (
                            <div className={dropdownContainerStyle}>
                                {users
                                    ?.filter((user) =>
                                        user.full_name
                                            ?.toLowerCase()
                                            .includes(searchUser.toLowerCase())
                                    )
                                    .map((user) => (
                                        <div
                                            key={user.user_id}
                                            onClick={() => {
                                                setSelectedUserId(user.user_id);
                                                setSelectedUserLabel(user.full_name);
                                                setSearchUser('');
                                                setShowUser(false);
                                            }}
                                            className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                                        >
                                            <div className="font-semibold">
                                                {user.full_name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {user.school_id}
                                            </div>
                                        </div>
                                    ))}

                                {users?.filter((user) =>
                                    user.full_name
                                        ?.toLowerCase()
                                        .includes(searchUser.toLowerCase())
                                ).length === 0 && (
                                    <div className="px-4 py-3 text-gray-500">
                                        No instructor found.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </form>

                {/* MODAL BOUNDARY RUNTIME FOOTER */}
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
                        form="scheduleForm"
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
                    >
                        Create Schedule
                    </button>
                </div>

            </div>
        </div>
    );
}