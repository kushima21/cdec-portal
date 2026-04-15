import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';

export default function ModalSchedule({ setIsModalOpen, users, curriculla, resources }) {

    // ================= STATES =================
    const [showCurriculum, setShowCurriculum] = useState(false);
    const [showRoom, setShowRoom] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showDays, setShowDays] = useState(false);
    const [showDuration, setShowDuration] = useState(false);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availableSlot, setAvailableSlot] = useState('');

    const [searchCurriculum, setSearchCurriculum] = useState('');
    const [searchUser, setSearchUser] = useState('');

    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState('');

    // ================= IDS + LABELS =================
    const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
    const [selectedCurriculumLabel, setSelectedCurriculumLabel] = useState('');

    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [selectedRoomLabel, setSelectedRoomLabel] = useState('');

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedUserLabel, setSelectedUserLabel] = useState('');

    const daysList = [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
    ];

const submitHandler = (e) => {
    e.preventDefault();

    router.post('/schedule/store', {
        curricula_id: selectedCurriculumId,
        room_id: selectedRoomId,
        instructor_id: selectedUserId,
        days: selectedDays,
        start_time: startTime,
        end_time: endTime,
        duration: selectedDuration,
        available_slot: availableSlot,
    }, {
        onSuccess: () => {
            // ✅ AUTO CLOSE MODAL
            setIsModalOpen(false);

            // (optional) reset form
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
        }
    });
};

    return (
        <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">

            {/* OUTSIDE CLICK */}
            <div
                onClick={() => setIsModalOpen(false)}
                className="w-full h-full flex justify-center items-center overflow-y-auto pt-10 pb-8"
            >

                {/* MODAL */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-[50%] bg-white rounded-xl shadow-4xl p-5 flex flex-col"
                >

                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Create New Schedule
                            </h3>
                            <p className="text-sm text-gray-500">
                                Fill in the details below.
                            </p>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={submitHandler} className="w-full flex flex-col gap-6 pt-5">

                        <div>
                            <h2 className="text-xl font-bold">Schedule Details</h2>
                            <p className="text-sm text-gray-500">
                                Enter the required information of schedule.
                            </p>
                        </div>

                        {/* ================= CURRICULUM ================= */}
                        <label>Curriculum</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchCurriculum || selectedCurriculumLabel}
                                onChange={(e) => {
                                    setSearchCurriculum(e.target.value);
                                    setShowCurriculum(true);
                                }}
                                onClick={() => setShowCurriculum(true)}
                                className="border p-2 rounded-md w-full"
                                placeholder="Search curriculum..."
                            />

                            {showCurriculum && (
                                <div className="absolute z-10 w-full bg-white border rounded-md max-h-60 overflow-y-auto shadow">
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
                                            className="p-3 hover:bg-orange-100 cursor-pointer"
                                        >
                                            {item.course_no} - {item.descriptive_title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ================= FIELDS ================= */}
                        <div className="w-full flex gap-12">

                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-3">

                                <label>Start Time</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="border p-2 rounded-md w-full"
                                />

                                {/* ROOM */}
                                <label>Room</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={selectedRoomLabel}
                                        readOnly
                                        onClick={() => setShowRoom(!showRoom)}
                                        className="border p-2 rounded-md w-full cursor-pointer"
                                        placeholder="Select room"
                                    />

                                    {showRoom && (
                                        <div className="absolute z-10 w-full bg-white border rounded-md max-h-40 overflow-y-auto shadow">
                                            {resources?.map((room) => (
                                                <div
                                                    key={room.resources_id}
                                                    onClick={() => {
                                                        setSelectedRoomId(room.resources_id);
                                                        setSelectedRoomLabel(room.room_name);
                                                        setShowRoom(false);
                                                    }}
                                                    className="p-2 hover:bg-orange-100 cursor-pointer"
                                                >
                                                    {room.room_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <label>Duration</label>
                                <div className="relative">
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedDuration}
                                    onClick={() => setShowDuration(!showDuration)}
                                    className="border p-2 rounded-md w-full cursor-pointer"
                                />

                                {showDuration && (
                                    <div className="absolute z-10 bg-white border rounded-md shadow">
                                        {["Whole Semester", "Summer"].map((item) => (
                                            <div
                                                key={item}
                                                onClick={() => {
                                                    setSelectedDuration(item);
                                                    setShowDuration(false);
                                                }}
                                                className="p-2 hover:bg-orange-100 cursor-pointer"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 flex flex-col gap-3">

                                <label>End Time</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="border p-2 rounded-md"
                                />

                                {/* DAYS */}
                                <label>Days</label>
                                <div className="relative">
                                    <input
                                    type="text"
                                    name="days"
                                    readOnly
                                    value={selectedDays.join(', ')}
                                    onClick={() => setShowDays(!showDays)}
                                    className="border w-full p-2 rounded-md cursor-pointer"
                                />

                                    {showDays && (
                                        <div className="absolute w-full z-10 bg-white border rounded-md shadow">
                                            {daysList.map((day) => (
                                                <div
                                                    key={day}
                                                    onClick={() => {
                                                        if (selectedDays.includes(day)) {
                                                            setSelectedDays(selectedDays.filter(d => d !== day));
                                                        } else {
                                                            setSelectedDays([...selectedDays, day]);
                                                        }
                                                    }}
                                                    className="p-2 hover:bg-orange-100 cursor-pointer"
                                                >
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <label>Available Slot</label>
                                <input
                                    type="number"
                                    value={availableSlot}
                                    onChange={(e) => setAvailableSlot(e.target.value)}
                                    className="border p-2 rounded-md"
                                />
                            </div>
                        </div>

                        {/* ================= INSTRUCTOR ================= */}
                        <label>Instructor</label>
                        <div className="relative">
                            <input
    type="text"
    value={searchUser || selectedUserLabel}
    onChange={(e) => {
        setSearchUser(e.target.value);
        setShowUser(true);
    }}
    onClick={() => setShowUser(true)}
    className="border p-2 rounded-md w-full"
    placeholder="Search instructor..."
/>

{showUser && (
    <div className="absolute z-10 w-full bg-white border rounded-md max-h-40 overflow-y-auto shadow">
        {users?.filter((user) =>
            user.full_name.toLowerCase().includes(searchUser.toLowerCase())
        ).map((user) => (
            <div
                key={user.id}
                onClick={() => {
                    setSelectedUserId(user.id);
                    setSelectedUserLabel(user.full_name);
                    setSearchUser('');
                    setShowUser(false);
                }}
                className="p-2 hover:bg-orange-100 cursor-pointer"
            >
                {user.full_name}
            </div>
        ))}
    </div>
)}
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="w-full h-[45px] bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            Create Schedule
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}