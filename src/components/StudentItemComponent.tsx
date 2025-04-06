import { Student } from '../types/Student';

interface StudentItemProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentItemComponent: React.FC<StudentItemProps> = ({ student, onEdit, onDelete }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${student.name}?`);
    if (confirmDelete) {
      onDelete(student.id);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">{student.name}</td>
      <td className="border border-gray-300 px-4 py-2">{student.age}</td>
      <td className="border border-gray-300 px-4 py-2">{student.email}</td>
      <td className="border border-gray-300 px-4 py-2">
        {student.enrolled ? (
          <span className="text-green-600 font-semibold">Enrolled</span>
        ) : (
          <span className="text-red-600 font-semibold">Not Enrolled</span>
        )}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <button
          onClick={() => onEdit(student)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudentItemComponent;