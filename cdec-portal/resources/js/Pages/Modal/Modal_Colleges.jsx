import { router } from '@inertiajs/react';
import { FaTimes, FaSearch, FaCloudUploadAlt, FaBuilding } from 'react-icons/fa';
import { useState } from 'react';

export default function ModalColleges({ setIsModalOpen, users }) {
  const [search, setSearch] = useState('');
  const [selectedDean, setSelectedDean] = useState('');
  const [previewImage, setPreviewImage] = useState("/system-images/cdec-logo.png");
  const [errors, setErrors] = useState({});

  // FILTER USERS
  const filteredUsers = users?.filter(user =>
    (user.firstname + ' ' + user.lastname).toLowerCase().includes(search.toLowerCase())
  ) || [];

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

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const form = new FormData(e.target);
    form.set('associate_dean', selectedDean);

    if (!form.get('college_logo')?.name) {
      form.set('college_logo', previewImage);
    }

    router.post('/colleges/store', form, {
      forceFormData: true,
      onSuccess: () => setIsModalOpen(false),
      onError: (err) => setErrors(err),
    });
  };

  // Tailwind Shared Style Tokens
  const inputStyle = "mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";
  const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600";
  const errorStyle = "text-xs font-medium text-red-600 mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <FaBuilding className="text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Add New College Department</h3>
              <p className="text-xs text-gray-500 mt-0.5">Register a new academic department or administrative unit college profile.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="rounded-xl p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* FORM CONTENT CONTAINER */}
        <form onSubmit={handleSubmit} id="collegeForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* TOP STRUCTURAL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: LOGO MANAGEMENT (4/12 width) */}
            <div className="md:col-span-4 flex flex-col space-y-3">
              <span className={labelStyle}>College Logo</span>
              
              <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-4 h-[180px] transition-all hover:border-blue-400 hover:bg-blue-50/20">
                <img 
                  src={previewImage} 
                  alt="College Logo Preview" 
                  className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105" 
                />
                
                {previewImage !== "/system-images/cdec-logo.png" && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-sm transition-all hover:bg-red-200 text-xs"
                    title="Remove Logo"
                  >
                    ✕
                  </button>
                )}
              </div>

              <label className="flex items-center justify-center gap-2 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50">
                <FaCloudUploadAlt className="text-base text-gray-500" />
                <span>Upload Logo File</span>
                <input
                  name="college_logo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {errors.college_logo && <p className={errorStyle}>{errors.college_logo}</p>}
            </div>

            {/* RIGHT COLUMN: CORE DETAILS (8/12 width) */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="sm:col-span-1">
                <label className={labelStyle}>Abbreviation / Code</label>
                <input
                  type="text"
                  name="abbreviation"
                  placeholder="e.g., CCS, CBA, COE"
                  className={inputStyle}
                  required
                />
                {errors.abbreviation && <p className={errorStyle}>{errors.abbreviation}</p>}
              </div>

              <div className="sm:col-span-1">
                <label className={labelStyle}>Official Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="e.g., ccs@cdek.edu.ph" 
                  className={inputStyle} 
                  required
                />
                {errors.email && <p className={errorStyle}>{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelStyle}>College Full Name</label>
                <input 
                  type="text" 
                  name="college_name" 
                  placeholder="e.g., College of Computer Studies" 
                  className={inputStyle} 
                  required
                />
                {errors.college_name && <p className={errorStyle}>{errors.college_name}</p>}
              </div>

              {/* ASSOCIATE DEAN MANAGEMENT WITH FLOATING SEARCH */}
              <div className="sm:col-span-2 relative">
                <label className={labelStyle}>Associate Dean Assignment</label>
                
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaSearch className="text-xs" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search personnel directory by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`${inputStyle} pl-9`}
                  />
                </div>

                {/* Search Results Overlay Dropdown */}
                {search.trim() !== '' && (
                  <div className="absolute left-0 right-0 z-20 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl py-1 divide-y divide-gray-50">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <div
                          key={user.user_id}
                          onClick={() => {
                            setSelectedDean(`${user.firstname} ${user.lastname}`);
                            setSearch('');
                          }}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                        >
                          {user.firstname} {user.lastname}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-400 italic">No directory results found</div>
                    )}
                  </div>
                )}

                {/* Selected Assignment Pill Token */}
                {selectedDean && (
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50/50 px-3 py-2 text-sm text-blue-800">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span className="font-medium">Assigned: {selectedDean}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedDean('')}
                      className="text-blue-400 hover:text-red-500 font-semibold text-xs px-1"
                      title="Clear Assignment"
                    >
                      Clear
                    </button>
                  </div>
                )}
                {errors.associate_dean && <p className={errorStyle}>{errors.associate_dean}</p>}

                {/* Hidden Fields matching operational requirements */}
                <input type="hidden" name="associate_dean" value={selectedDean} />
                <input type="hidden" name="colleges_status" value="Active" />
              </div>

            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="w-full">
            <label className={labelStyle}>Department Description / Objective</label>
            <textarea
              name="descriptive"
              placeholder="Enter detailed information overview, college goals, vision statement or scope..."
              className={`${inputStyle} h-36 resize-none`}
            />
            {errors.descriptive && <p className={errorStyle}>{errors.descriptive}</p>}
          </div>

        </form>

        {/* STICKY ACTION FOOTER */}
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
            form="collegeForm"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
          >
            Create Department
          </button>
        </div>

      </div>
    </div>
  );
}