import { useState } from "react";
import { Student } from "../types/Student";
import StudentItemComponent from "./StudentItemComponent";
import AddOrUpdateStudentComponent from "./AddOrUpdateStudentComponent";

const initialStudents: Student[] = [
  { id: 1, name: "Bob", age: 16, email: "Bob@react.edu", enrolled: false },
  { id: 2, name: "Alice", age: 18, email: "Alice@react.edu", enrolled: true },
];

function StudentListComponent() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAdd = () => {
    setSelectedStudent(null); // Clear selected student for adding a new one
    setIsFormVisible(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student); // Set the student to be edited
    setIsFormVisible(true);
  };

  const handleSave = (student: Student) => {
    if (student.id === 0) {
      // Add new student
      const newStudent = { ...student, id: students.length + 1 };
      setStudents((prev) => [...prev, newStudent]);
    } else {
      // Update existing student
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? student : s))
      );
    }
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Student List</h2>
        {!isFormVisible && (<button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Student
        </button>)}
      </div>

      {isFormVisible ? (
        <AddOrUpdateStudentComponent
          student={selectedStudent || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Age
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
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