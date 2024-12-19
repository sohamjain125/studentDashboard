import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, fetchStudents } from "./studentSlice";

const StudentTable = () => {
  const dispatch = useDispatch();
  const {
    data: students,
    loading,
    error,
  } = useSelector((state) => state.students);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (isConfirmed) {
      dispatch(deleteStudent(id));
      alert("Student deleted successfully!");
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
    </>
  );
};

export default StudentTable;
