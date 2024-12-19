import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import "./App.css";

const App = () => {
 
  const [showModal, setShowModal] = useState(false);
 
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        {/* <Header onSearch={handleSearch} /> */}

        {/* Filters */}
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

        {/* Student Table */}
        <StudentTable />

        {/* Add Student Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <AddStudentForm onClose={() => setShowModal(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      courses: formData.courses.split(","),
      datejoin: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    console.log("Sending payload:", payload); // Debugging log

    try {
      const response = await fetch("http://localhost:4000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response from server:", errorResponse);
        throw new Error("Failed to add student");
      }

      alert("Student added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
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

export default App;
