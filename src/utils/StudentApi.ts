import { Student } from "../types/Student";

const API_URL = "https://localhost:7009/api/Students"; 

// Fetch all students
export const fetchStudents = async (signal: AbortSignal): Promise<Student[]> => {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
};

// Add or update a student
export const saveStudent = async (student: Student): Promise<void> => {
  const method = student.id === 0 ? "POST" : "PUT";
  const url = student.id === 0 ? API_URL : `${API_URL}/${student.id}`;
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error("Failed to save student");
  }
};

// Delete a student
export const deleteStudent = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
};