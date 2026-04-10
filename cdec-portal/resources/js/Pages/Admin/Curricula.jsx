import { useState } from 'react';
import { FaSearch, FaEllipsisV, FaChevronDown } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';
import AdminLayout from '../Layouts/AdminLayout';
import ModalCurricula from '../Modal/ModalCurricula';

// Add Button Icon
const AddCurriculaIcon = () => (
  <div className="relative flex items-center justify-center w-6 h-6 rounded-full shadow-sm bg-gradient-to-br from-orange-400 to-orange-600">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
    <div className="absolute -top-1 -right-1 bg-white rounded-full w-3 h-3 flex items-center justify-center border-[1px] border-orange-500">
      <span className="text-[10px] font-black text-orange-600 leading-none">+</span>
    </div>
  </div>
);

export default function Curricula({ programs = [], courses = [], curricula = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Year level filter
  const [yearLevel, setYearLevel] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Display in dropdown
  const yearLevels = ['All', 'I', 'II', 'III', 'IV'];

  // Map dropdown value to actual database level
  const yearLevelMap = {
    I: 'First Year',
    II: 'Second Year',
    III: 'Third Year',
    IV: 'Fourth Year',
  };

  // Filter curricula based on search and year level
  const filteredCurricula = curricula.filter(item => {
    const matchesSearch =
      item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.program.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear =
      yearLevel === 'All' || item.level === yearLevelMap[yearLevel];

    return matchesSearch && matchesYear;
  });

  // Convert level for table display (optional, matches dropdown)
  const displayLevel = (level) => {
    for (const key in yearLevelMap) {
      if (yearLevelMap[key] === level) return key;
    }
    return level; // fallback
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="pt-[3%] bg-white p-6">
          <div className="flex justify-between items-end mt-2">
            <div>
              <h2 className="text-4xl font-black text-gray-800 tracking-tight">Curricula</h2>
              <p className="text-gray-500 text-sm mt-1">Manage all curriculum structures.</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-center">

              {/* Search */}
              <div className="relative w-[300px]">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search program or course..."
                  className="w-full h-10 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 pl-10 shadow-sm"
                />
              </div>
              
              <button onClick={() => setSearchQuery('')} className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <FiRefreshCw className={`text-lg ${searchQuery ? 'animate-spin' : ''}`} />
              </button>

              {/* Year Level Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 h-10 bg-white border-2 border-orange-500 text-gray-700 rounded-xl hover:bg-orange-50 transition-all shadow-sm font-medium"
                >
                  <span>{yearLevel}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-1 w-full bg-white border rounded shadow z-20">
                    {yearLevels.map(level => (
                      <div
                        key={level}
                        onClick={() => { setYearLevel(level); setIsDropdownOpen(false); }}
                        className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 shadow-sm font-bold"
              >
                <AddCurriculaIcon />
                <span>Add Curricula</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 mt-4 overflow-hidden flex flex-col">
          <div className="overflow-x-auto overflow-y-auto bg-white">
            <table className="w-full text-left">
              <thead className="bg-white sticky top-0 z-10">
                <tr className="border-b border-gray-100">
                  <th className="p-4 w-10">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-600" />
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">PROGRAM</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">COURSE</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">ACADEMIC YEAR</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">TERM</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">LEVEL</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">TYPE</th>
                  <th className="p-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCurricula.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="p-4">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-600" />
                    </td>
                    <td className="p-4 font-bold text-gray-700">{item.program}</td>
                    <td className="p-4 text-gray-600">{item.course}</td>
                    <td className="p-4 text-center text-gray-500">{item.academicYear}</td>
                    <td className="p-4 text-center text-gray-500">{item.term}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{displayLevel(item.level)}</span>
                    </td>
                    <td className="p-4 text-center font-bold text-orange-600">{item.type}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-orange-600">
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalCurricula
            setIsModalOpen={setIsModalOpen}
            programs={programs}
            courses={courses}
          />
        )}
      </div>
    </AdminLayout>
  );
}