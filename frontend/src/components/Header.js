import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "./studentSlice";
import { Tooltip } from "react-tooltip"; // Correct named import for Tooltip

const Header = ({ onSearch }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Add Student Form Component
  const AddStudentForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
      name: "",
      cohort: "",
      courses: "",
      status: true,
      lastlogin: "",
      datejoin: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      // e.preventDefault();
      const formattedDate = new Date().toISOString().split("T")[0];
      const payload = {
        ...formData,
        courses: formData.courses.split(","),
        datejoin: formattedDate,
        lastlogin: formattedDate,
      };

      dispatch(addStudent(payload));
      alert("Student added successfully!");
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Cohort</label>
          <input
            type="text"
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Courses (comma-separated)
          </label>
          <input
            type="text"
            name="courses"
            value={formData.courses}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value === "true",
              }))
            }
            className="w-full border px-4 py-2 rounded"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>
        </div>
      </form>
    );
  };

  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-96">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="Search your course"
            className="bg-gray-100 focus:outline-none ml-2 w-full"
            onChange={handleSearch}
          />
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center gap-9">
          {/* Notification Icons */}
          <div className="flex gap-10">
            <img
              className="w-6 h-6"
              src="../help (1).png"
              alt="Help"
              data-tooltip-id="help-tooltip"
              data-tooltip-content="Help"
            />
            <img
              className="w-6 h-6"
              src="../message.png"
              alt="Messages"
              data-tooltip-id="message-tooltip"
              data-tooltip-content="Messages"
            />
            <img
              className="w-6 h-6"
              src="../settings (1).png"
              alt="Settings"
              data-tooltip-id="settings-tooltip"
              data-tooltip-content="Settings"
            />
            <img
              className="w-6 h-6"
              src="../Notification.png"
              alt="Notifications"
              data-tooltip-id="notification-tooltip"
              data-tooltip-content="Notifications"
            />

            {/* Tooltip instances */}
            <Tooltip id="help-tooltip" place="top" effect="solid" />
            <Tooltip id="message-tooltip" place="top" effect="solid" />
            <Tooltip id="settings-tooltip" place="top" effect="solid" />
            <Tooltip id="notification-tooltip" place="top" effect="solid" />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <img
              src="../Avatar Image.png"
              alt="User"
              className="w-10 h-10 rounded-lg"
            />
            <span className="font-semibold text-gray-700">
              Adeline H. Dancy
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center my-6">
      <div className="flex gap-4">
            <select className="border rounded px-4 py-2">
              <option>AY 2024-25</option>
            </select>
            <select className="border rounded px-4 py-2">
              <option>CBSE 9</option>
            </select>
          </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add new Student
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <AddStudentForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
