import { router } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa'; 
import { useState } from 'react';

export default function ModalColleges ({ setIsModalOpen, users }) {

    const [search, setSearch] = useState('');
    const [selectedDean, setSelectedDean] = useState('');
    const [previewImage, setPreviewImage] = useState("/system-images/cdec-logo.png");

    // FILTER USERS
    const filteredUsers = users?.filter(user =>
        (user.firstname + ' ' + user.lastname)
            .toLowerCase()
            .includes(search.toLowerCase())
    ) || [];

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        form.append('associate_dean', selectedDean);

        router.post('/colleges/store', form, {
            forceFormData: true,
            onSuccess: () => setIsModalOpen(false),
        });
    };

    // IMAGE HANDLER
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

    return(
        <div className="w-full h-screen bg-gray-500/50 fixed inset-0 z-50">

            <div className="w-full h-full justify-center flex overflow-y-auto pt-10 pb-8">

                <div className="w-[50%] h-max bg-white rounded-xl shadow-4xl p-5 flex flex-col">

                    {/* HEADER */}
                    <div className="w-full flex items-center justify-between border-b pb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                Add New College
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
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 pt-6">
                        
                        <div>
                            <h2 className="text-2xl font-bold">College Details</h2>
                            <p>Enter the required information to register a college.</p>
                        </div>

                        <div className="w-full flex flex-row gap-12 pt-4">

                            {/* LEFT */}
                            <div className="flex-1 flex flex-col gap-2">

                                <label className="text-lg font-medium">Abbreviation</label>
                                <input 
                                    type="text" 
                                    name="abbreviation" 
                                    placeholder="BSCS" 
                                    className="border rounded-md p-2 w-full" 
                                />

                                {/* IMAGE */}
                                <div className="flex flex-col">
                                    <label className="mb-2 text-lg font-medium">College Logo</label>

                                    <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-3 bg-gray-50">
                                        <div className="relative w-full h-56 bg-black rounded-lg overflow-hidden flex items-center justify-center">

                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center text-sm hover:bg-black"
                                            >✕</button>

                                            <img src={previewImage} className="max-h-full max-w-full object-contain" />
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

                            {/* RIGHT */}
                            <div className="flex-1 flex flex-col gap-2">

                                <label className="text-lg font-medium">Name</label>
                                <input 
                                    type="text" 
                                    name="college_name" 
                                    placeholder="Computer Science" 
                                    className="border rounded-md p-2 w-full" 
                                />

                                <label className="text-lg font-medium">Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="@cdek.edu.ph" 
                                    className="border rounded-md p-2 w-full" 
                                />

                                {/* ASSOCIATE DEAN */}
                                <label className="text-lg font-medium">Associate Dean</label>

                                {/* SEARCH INPUT */}
                                <input
                                    type="text"
                                    placeholder="Search Associate Dean..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border rounded-md p-2 w-full mb-2"
                                />

                                {/* DROPDOWN */}
                                {search.trim() !== '' && (
                                    <div className="border rounded-md max-h-40 overflow-y-auto">
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map(user => (
                                                <div
                                                    key={user.id}
                                                    onClick={() => {
                                                        const fullName = user.firstname + ' ' + user.lastname;
                                                        setSelectedDean(fullName);
                                                        setSearch('');
                                                    }}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    {user.firstname} {user.lastname}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 text-gray-400">No results found</div>
                                        )}
                                    </div>
                                )}

                                {/* SELECTED DISPLAY */}
                                {selectedDean && (
                                    <input
                                        type="text"
                                        value={selectedDean}
                                        readOnly
                                        className="border rounded-md p-2 w-full bg-gray-100"
                                    />
                                )}

                                {/* HIDDEN */}
                                <input
                                    type="hidden"
                                    name="associate_dean"
                                    value={selectedDean}
                                />

                            </div>
                        </div>

                        <div className='w-full'>
                            <label className='text-lg font-medium'>Description</label>
                            <textarea 
                                name="description"
                                placeholder="Enter detailed information about the college..."
                                className='w-full h-[200px] border rounded-md p-2'
                            />
                        </div>

                        <div className='w-full'>
                            <button 
                                type='submit'
                                className="w-full h-[50px] bg-slate-400 rounded-md"
                            >
                                Create
                            </button>
                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}