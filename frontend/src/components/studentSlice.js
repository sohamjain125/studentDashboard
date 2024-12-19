import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../util/supabaseClient";

// Async actions for API calls
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const { data, error } = await supabase.from("students").select("*");
    if (error) throw new Error(error.message);
    return data;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (payload) => {
    const { error } = await supabase.from("students").insert([payload]);
    if (error) throw new Error(error.message);
    return payload;
  }
);
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedData }) => {
    const { error } = await supabase.from("students").update(updatedData).eq("id", id);
    if (error) throw new Error(error.message);
    return { id, updatedData };
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  }
);

// Slice for student state
const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (student) => student.id !== action.payload
        );
      });
  },
});

export default studentSlice.reducer;
