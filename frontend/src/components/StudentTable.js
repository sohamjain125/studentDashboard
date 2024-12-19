import React, { useEffect, useState } from "react";
import Header from "./Header";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetches the list of students from the API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students.");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Deletes a student and refreshes the list
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete student.");
      }
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  // Filters students based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredStudents = students.filter((student) =>
    student.courses.some((course) =>
      course.toLowerCase().includes(searchQuery)
    )
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      {/* Include the Header with search functionality */}
      <Header onSearch={handleSearch} />
      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
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
            {loading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.cohort}</td>
                  <td className="p-4">
                    {student.courses.map((course, index) => (
                      <div key={index} className="flex items-center">
                        <img
                          src={"../image.png"}
                          alt={course}
                          className="w-6 h-6 mr-2"
                        />
                        <span>{course}</span>
                      </div>
                    ))}
                  </td>
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
                      onClick={() => deleteStudent(student.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentTable;
