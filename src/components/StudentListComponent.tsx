import { useState, useEffect } from "react";
import { Student } from "../types/Student";
import StudentItemComponent from "./StudentItemComponent";
import AddOrUpdateStudentComponent from "./AddOrUpdateStudentComponent";
import { fetchStudents, saveStudent, deleteStudent } from "../utils/StudentApi";

function StudentListComponent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const abortController = new AbortController();

  // Fetch students from the API
  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents(abortController.signal);
      setStudents(data);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add or update a student
  const handleSave = async (student: Student) => {
    try {
      await saveStudent(student);
      loadStudents(); // Refresh the student list
      setIsFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a student
  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      loadStudents(); // Refresh the student list
    } catch (error) {
      console.error(error);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setIsFormVisible(false);
  };

  // Add a new student
  const handleAdd = () => {
    setSelectedStudent(null);
    setIsFormVisible(true);
  };

  // Edit an existing student
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsFormVisible(true);
  };

  // Fetch students on component mount
  useEffect(() => {
    loadStudents();

    // Cleanup: Abort fetch on component unmount
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Student List</h2>
        {!isFormVisible && (
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Student
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : isFormVisible ? (
        <AddOrUpdateStudentComponent
          student={selectedStudent || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentItemComponent
                key={student.id}
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentListComponent;