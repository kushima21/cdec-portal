import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';

export default function ModalResources({ setIsModalOpen, buildings }) {

    const [form, setForm] = useState({
        room_name: '',
        glossary: '',
        description: '',
        building: '',
        floor: '',
        capacity: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/resources/store', form, {
            onSuccess: () => {
                setIsModalOpen(false);
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

                {/* MODAL CONTENT */}
                <div 
                    onClick={(e) => e.stopPropagation()}
                    className="w-[50%] bg-white rounded-xl shadow-4xl p-5 flex flex-col"
                >

                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Create New Room
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
                    <form 
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-6 pt-5"
                    >

                        {/* TITLE */}
                        <div>
                            <h2 className="text-xl font-bold">Room Details</h2>
                            <p className="text-sm text-gray-500">
                                Enter the required information to register a room.
                            </p>
                        </div>

                        {/* FIELDS */}
                        <div className="w-full flex gap-12">

                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-3">
                                <label>Room Name</label>
                                <input 
                                    type="text"
                                    name="room_name"
                                    value={form.room_name}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md"
                                />

                                <label>Glossary</label>
                                <input
                                    type="text"
                                    name="glossary"
                                    value={form.glossary}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md"
                                />

                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md h-[150px]"
                                />
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 flex flex-col gap-3">

                                <label>Building</label>
                                <select
                                    name="building"
                                    value={form.building}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md"
                                >
                                    <option value="">Select Building</option>

                                    {buildings.map((building) => (
                                        <option key={building.id} value={building.id}>
                                            {building.name}
                                        </option>
                                    ))}
                                </select>

                                <label>Floor</label>
                                <input
                                    type="text"
                                    name="floor"
                                    value={form.floor}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md"
                                />

                                <label>Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={form.capacity}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md"
                                />
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <button 
                            type="submit"
                            className="w-full h-[45px] bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            Create Room
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}