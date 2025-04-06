export type Student = {
    id: number;
    name: string;
    age: number;
    email: string;
    enrolled: boolean;
};

export type StudentValidationErrors = {
    name?: string;
    age?: string;
    email?: string;
};

export const validateStudent = (student: Student): StudentValidationErrors => {
    const errors: StudentValidationErrors = {};

    if (!student.name || student.name.trim() === '') {
        errors.name = 'Name is required.';
    }

    if (student.age <= 0 || isNaN(student.age)) {
        errors.age = 'Age must be a positive number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(student.email)) {
        errors.email = 'Invalid email format.';
    }

    return errors;
};