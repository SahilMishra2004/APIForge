// Navbar.js
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ selectedProject, projects, dropdownOpen, setDropdownOpen, setSelectedProject, setIsCreatingProject, setSelectedEndpoint }) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-lg py-2 px-6 flex justify-between items-center z-999">
      <div className="text-xl font-bold text-green-600">BackendBuddy.</div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-green-600 text-white px-4 py-2 rounded flex justify-between items-center w-48"
        >
          {/* Check if selectedProject is not null before accessing name */}
          {selectedProject ? selectedProject.project_name : 'Select a Project'}
          <span className="ml-2">&#x25BC;</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-1 p-2 bg-white rounded shadow-lg z-10 w-64">
            <ul className="max-h-48 overflow-auto">
              {projects.map((project, index) => (
                <Link to='/'
                  key={index}>
                  <li
                    className="p-2 hover:bg-green-200 cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setSelectedEndpoint(project.endpoints[0])
                      setDropdownOpen(false);
                    }}
                  >
                    {project.project_name}
                  </li>
                </Link>
              ))}
            </ul>
            <button
              className="bg-green-600 text-white w-full p-2 rounded"
              onClick={() => {
                setIsCreatingProject(true);
                setDropdownOpen(false);
              }}
            >
              New Project
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
