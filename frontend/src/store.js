import { create } from "zustand";

const useStudentStore = create((set) => ({
  students: [],
  fetchStudents: async () => {
    const res = await fetch("http://localhost:5000/students");
    const data = await res.json();
    set({ students: data });
  },
  addStudent: async (newStudent) => {
    const res = await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    const data = await res.json();
    set((state) => ({ students: [...state.students, data] }));
  },
  updateStudent: async (id, updatedStudent) => {
    const res = await fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    });
    const data = await res.json();
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? data : student
      ),
    }));
  },
  deleteStudent: async (id) => {
    await fetch(`http://localhost:5000/students/${id}`, { method: "DELETE" });
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    }));
  },
}));

export default useStudentStore;