import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';  
import { useState } from 'react';

export default function ModalBuilding({ setIsModalOpen, addBuilding }) {
    const floorOptions = ["1st", "2nd", "3rd", "4th", "5th", "Ground"];
    const [form, setForm] = useState({
        building_name: '',
        floors: [],
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'floors') {
            setForm(prev => ({
                ...prev,
                floors: prev.floors.includes(value) ? prev.floors : [...prev.floors, value]
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const removeFloor = (floor) => {
        setForm(prev => ({ ...prev, floors: prev.floors.filter(f => f !== floor) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/building/store', form, {
            onSuccess: (page) => {
                // Add new building to parent state immediately
                if (page.props && page.props.building) {
                    addBuilding(page.props.building);
                }
                setIsModalOpen(false);
            },
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">
            <div className="w-full h-full justify-center items-center flex overflow-y-auto pt-10 pb-8">
                <div className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col">
                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Create New Building</h3>
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
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 pt-6">
                        <div>
                            <h2 className="text-2xl font-bold">Building Details</h2>
                            <p>Enter the required information to register a new building.</p>
                        </div>

                        <div className="w-full flex flex-row gap-12 pt-4">
                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">Name</label>
                                <input 
                                    type="text" 
                                    name="building_name" 
                                    value={form.building_name}
                                    onChange={handleChange}
                                    placeholder="Building Name" 
                                    className="border rounded-md p-2 w-full" 
                                />

                                <label className="text-lg font-medium">Floors</label>
                                <select
                                    name="floors"
                                    value=""
                                    onChange={handleChange}
                                    className="border rounded-md p-2 w-full"
                                >
                                    <option value="">Select</option>
                                    {floorOptions.map((floor, index) => (
                                        <option key={index} value={floor}>{floor}</option>
                                    ))}
                                </select>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {form.floors.map((f, idx) => (
                                        <span key={idx} className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                                            {f} 
                                            <button type="button" onClick={() => removeFloor(f)}>
                                                <FaTimes className="w-3 h-3 text-orange-600" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-lg font-medium">Description</label>
                                <textarea 
                                    name="description" 
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Building Description" 
                                    className="border rounded-md p-2 w-full h-[200px]" 
                                />
                            </div>
                        </div>

                        <div className='w-full'>
                            <button type='submit' className="w-full h-[50px] bg-slate-400 rounded-md">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}