import React, { useState, useEffect } from 'react';
import { Student, StudentValidationErrors, validateStudent } from '../types/Student';

interface AddOrUpdateStudentComponentProps {
  student?: Student;
  onSave: (student: Student) => void;
  onCancel: () => void;
}

const AddOrUpdateStudentComponent: React.FC<AddOrUpdateStudentComponentProps> = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Student>({
    id: student?.id || 0,
    name: student?.name || '',
    age: student?.age || 0,
    email: student?.email || '',
    enrolled: student?.enrolled || false,
  });

  const [errors, setErrors] = useState<StudentValidationErrors>({});

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStudent(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors if validation passes
    onSave(formData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {student ? 'Update Student' : 'Add Student'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Age Field */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Enrolled Field */}
        <div>
          <label htmlFor="enrolled" className="block text-sm font-medium text-gray-700 mb-1">
            Enrolled:
          </label>
          <input
            type="checkbox"
            id="enrolled"
            name="enrolled"
            checked={formData.enrolled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                enrolled: e.target.checked,
              }))
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {student ? 'Update' : 'Add'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrUpdateStudentComponent;