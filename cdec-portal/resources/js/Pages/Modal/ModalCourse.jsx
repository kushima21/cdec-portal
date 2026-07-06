import { router } from '@inertiajs/react';
import { FaTimes, FaBookOpen } from 'react-icons/fa';  
import { useState } from 'react';

export default function ModalCourse({ setIsModalOpen }) {
  const [lecture, setLecture] = useState('');
  const [lab, setLab] = useState('');
  const [errors, setErrors] = useState({});
  
  // Calculate total units dynamically for the frontend display
  const total = (Number(lecture) || 0) + (Number(lab) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const formData = new FormData(e.target);
    const lectureUnits = Number(formData.get('lecture_units') || 0);
    const labUnits = Number(formData.get('lab_units') || 0);

    // Ensure the programmatic value matches the calculated total
    formData.set('total_units', lectureUnits + labUnits);

    router.post(route('courses.store'), formData, {
      onSuccess: () => setIsModalOpen(false),
      onError: (err) => setErrors(err),
    });
  };

  // Shared Design System Styling Classes
  const inputStyle = "mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20";
  const labelStyle = "text-xs font-semibold uppercase tracking-wider text-gray-600";
  const errorStyle = "text-xs font-medium text-red-600 mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-all">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <FaBookOpen className="text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Create New Course</h3>
              <p className="text-xs text-gray-500 mt-0.5">Register a brand new curriculum subject listing into the system database.</p>
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

        {/* FORM SCROLLABLE CONTAINER */}
        <form onSubmit={handleSubmit} id="courseForm" className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* COURSE CODE */}
            <div className="col-span-1">
              <label className={labelStyle}>Course Code</label>
              <input 
                type="text" 
                name="course_code" 
                placeholder="e.g., COSC 101" 
                className={inputStyle}
                required
              />
              {errors.course_code && <p className={errorStyle}>{errors.course_code}</p>}
            </div>

            {/* COURSE NUMBER */}
            <div className="col-span-1">
              <label className={labelStyle}>Course No.</label>
              <input 
                type="number" 
                name="course_no" 
                placeholder="e.g., 1" 
                className={inputStyle}
                required
              />
              {errors.course_no && <p className={errorStyle}>{errors.course_no}</p>}
            </div>

            {/* DESCRIPTIVE TITLE */}
            <div className="md:col-span-2">
              <label className={labelStyle}>Descriptive Title</label>
              <input 
                type="text" 
                name="descriptive_title" 
                placeholder="e.g., Introduction to Computer Science & Programming 1" 
                className={inputStyle}
                required
              />
              {errors.descriptive_title && <p className={errorStyle}>{errors.descriptive_title}</p>}
            </div>

            {/* LECTURE UNIT */}
            <div className="col-span-1">
              <label className={labelStyle}>Lecture Units</label>
              <input 
                type="number" 
                name="lecture_units" 
                min="0"
                value={lecture}
                onChange={(e) => setLecture(e.target.value)}
                placeholder="0" 
                className={inputStyle}
              />
              {errors.lecture_units && <p className={errorStyle}>{errors.lecture_units}</p>}
            </div>

            {/* LABORATORY UNIT */}
            <div className="col-span-1">
              <label className={labelStyle}>Laboratory Units</label>
              <input 
                type="number" 
                name="lab_units" 
                min="0"
                value={lab}
                onChange={(e) => setLab(e.target.value)}
                placeholder="0" 
                className={inputStyle}
              />
              {errors.lab_units && <p className={errorStyle}>{errors.lab_units}</p>}
            </div>

          </div>

          {/* TOTAL UNITS (HIGHLIGHTED SUMMARY CARD) */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 flex items-center justify-between mt-2">
            <div>
              <h4 className="text-sm font-bold text-blue-900">Calculated Academic Credit</h4>
              <p className="text-xs text-blue-600">Summation of both active lecture and lab assignments.</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">Total Units</span>
              <input 
                type="number" 
                name="total_units" 
                value={total}
                readOnly
                className="w-20 text-center font-bold bg-white text-blue-900 border border-blue-300 rounded-lg py-1 text-lg focus:outline-none shadow-sm"
              />
            </div>
          </div>
          {errors.total_units && <p className={errorStyle}>{errors.total_units}</p>}

        </form>

        {/* STICKY FOOTER ACTIONS */}
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
            form="courseForm"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:bg-blue-800"
          >
            Create Course
          </button>
        </div>

      </div>
    </div>            
  );
}