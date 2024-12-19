import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, fetchStudents, updateStudent } from "./studentSlice";

const StudentTable = () => {
  const dispatch = useDispatch();
  const {
    data: students,
    loading,
    error,
  } = useSelector((state) => state.students);

  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (isConfirmed) {
      await dispatch(deleteStudent(id));
      alert("Student deleted successfully!");
  
      // Re-fetch the updated student list
      dispatch(fetchStudents());
    }
  };
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedStudent) {
      await dispatch(updateStudent({ id: selectedStudent.id, updatedData: selectedStudent }));
      alert("Student updated successfully!");
      setIsEditModalOpen(false);
  
      // Re-fetch the updated student list
      dispatch(fetchStudents());
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredStudents = students.filter((student) =>
    student.courses.some((course) =>
      course.toLowerCase().includes(searchQuery)
    )
  );

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Student Name</th>
                <th className="p-4 text-left">Cohort</th>
                <th className="p-4 text-left">Courses</th>
                <th className="p-4 text-left">Date joined</th>
                <th className="p-4 text-left">Last Login</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.cohort}</td>
                    <td className="p-4">{student.courses.join(", ")}</td>
                    <td className="p-4">{student.datejoin}</td>
                    <td className="p-4">{student.lastlogin}</td>
                    <td className="p-4">
                      <span
                        className={`align-middle inline-block w-3 h-3 rounded-full ${
                          student.status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                    </td>
                    <td className="p-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(student)}
                        aria-label={`Edit student ${student.name}`}
                      >
                        Edit
                      </button>
                      <span className="mx-1">|</span>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(student.id)}
                        aria-label={`Delete student ${student.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={selectedStudent.name}
                  onChange={(e) =>
                    setSelectedStudent((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Cohort</label>
                <input
                  type="text"
                  value={selectedStudent.cohort}
                  onChange={(e) =>
                    setSelectedStudent((prev) => ({
                      ...prev,
                      cohort: e.target.value,
                    }))
                  }
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Courses</label>
                <input
                  type="text"
                  value={selectedStudent.courses.join(", ")}
                  onChange={(e) =>
                    setSelectedStudent((prev) => ({
                      ...prev,
                      courses: e.target.value.split(","),
                    }))
                  }
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Status</label>
                <select
                  value={selectedStudent.status}
                  onChange={(e) =>
                    setSelectedStudent((prev) => ({
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
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentTable;
