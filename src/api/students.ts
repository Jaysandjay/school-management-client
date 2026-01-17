import type { Address } from '../types/Address';
import type { Student } from '../types/Student';
import type { StudentGuardian } from '../types/StudentGuardian';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchStudents() {
  console.log('Fetching students....');
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) throw new Error('Failed to fetch students');
  const data = await res.json();
  const students = data.map((student: any) => ({
    ...student,
    dateOfBirth: student.dateOfBirth
      ? new Date(student.dateOfBirth).toISOString().slice(0, 10)
      : null,
  }));

  console.log('fetchStudents', students);
  return students;
}

export async function addStudent(student: Student) {
  console.log('Adding Student....');
  const res = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error('Error adding Student');
  console.log('Student Added', student);
}

export async function getStudent(id: number) {
  console.log('Getting Student...');
  const res = await fetch(`${API_URL}/students/${id}`);
  if (!res.ok) throw new Error('Error getting Student');
  const student = await res.json();
  student.dateOfBirth = new Date(student.dateOfBirth)
    .toISOString()
    .slice(0, 10);
  console.log('getStudent', student);
  return student;
}

export async function updateStudent(id: number, student: Student) {
  console.log('Updating Student...');
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error('Error updating student');
  console.log('Student Updated', student);
}

export async function getStudentClasses(id: number) {
  console.log('Getting Enrollments');
  const res = await fetch(`${API_URL}/students/${id}/classes`);
  if (!res.ok) throw new Error('Error getting students classes');
  const classes = await res.json();
  console.log('getStudentEnrollments', classes);
  return classes;
}

export async function getAvailableStudentClasses(id: number) {
  console.log(`Getting available classes for student ${id}...`);
  const res = await fetch(`${API_URL}/students/${id}/classes/available`);
  if (!res.ok) throw new Error('Error getting student available classes');
  const classes = await res.json();
  console.log('getAvailableStudentClasses', classes);
  return classes;
}

export async function unenrollStudent(studentId: number, classId: number) {
  console.log('Unenrolling from class...');
  const res = await fetch(`${API_URL}/students/${studentId}/enrollment`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ classId: classId }),
  });
  if (!res.ok) throw new Error('Error unenrolling class');
  console.log(`Student ${studentId} unenrolled from class ${classId}`);
}

export async function enrollStudent(studentId: number, classId: number) {
  console.log('Enrolling class...');
  const res = await fetch(`${API_URL}/students/${studentId}/enrollment`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ classId: classId }),
  });
  if (!res.ok) throw new Error('Error unenrolling class');
  console.log(`Student ${studentId} unenrolled from class ${classId}`);
}

export async function getStudentAddress(id: number) {
  console.log('Getting Address');
  const res = await fetch(`${API_URL}/students/${id}/address`);
  if (!res.ok) throw new Error('Error getting address');
  const address = await res.json();
  console.log('getStudentAddress', address);
  return address;
}

export async function addStudentAddress(id: number, address: Address) {
  console.log(`Creating Address...`);
  const res = await fetch(`${API_URL}/students/${id}/address`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address),
  });
  if (!res.ok) throw new Error('Error adding address');
  console.log('Address added', address);
}

export async function updateStudentAddress(id: number, address: Address) {
  console.log('Updating Student...');
  const res = await fetch(`${API_URL}/students/${id}/address`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address),
  });
  if (!res.ok) throw new Error('Error updating address');
  console.log('Address Updated', address);
}

export async function getStudentGuardians(id: number) {
  console.log("Getting Student's Guardian...");
  const res = await fetch(`${API_URL}/students/${id}/guardian`);
  if (!res.ok) throw new Error("Error getting student's guardians");
  const data = await res.json();
  console.log('getStudentGuardians', data);
  return data;
}

export async function getAvailableStudentGuardians(studentId: number) {
  console.log(`Getting available guardians for student ${studentId}...`);
  const res = await fetch(
    `${API_URL}/students/${studentId}/guardian/available`,
  );
  if (!res.ok) throw new Error('Error getting student available guardians');
  const guardians = await res.json();
  return guardians;
}

export async function assignStudentGuardian(
  studentGuardianInfo: StudentGuardian,
) {
  const { studentId, guardianId, relationship } = studentGuardianInfo;
  console.log('Assigning Guardian...');
  const res = await fetch(`${API_URL}/students/${studentId}/guardian`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      guardianId: guardianId,
      relationship: relationship,
    }),
  });
  if (!res.ok) throw new Error('Error assigining Guardian');
  console.log(
    `Guardian ${guardianId} assigned to student ${studentId} with relationship: ${relationship}`,
  );
}

export async function removeStudentGuardian(
  studentId: number,
  guardianId: number,
) {
  console.log('Removing Guardian.....');
  const res = await fetch(`${API_URL}/students/${studentId}/guardian`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({ guardianId: guardianId }),
  });
  if (!res.ok) throw new Error('Error removing guardian from student');
  console.log(`Guardian ${guardianId} removed from student ${studentId}`);
}

export async function getStudentGrades(id: number) {
  console.log('Getting student grades...');
  const res = await fetch(`${API_URL}/students/${id}/grades`);
  if (!res.ok) throw new Error('Error getting student grades');
  const grades = await res.json();
  console.log(`Student Grades`, grades);
  return grades;
}

export async function updateStudentGrade(
  studentId: number,
  classId: number,
  grade: number,
) {
  console.log('Updating grade...');
  console.log(grade, typeof grade);
  const res = await fetch(`${API_URL}/students/${studentId}/grade`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ classId: classId, grade: grade }),
  });
  console.log(res);
  if (!res.ok) throw new Error('Error updating grade');
  console.log(
    `Student ${studentId} grade updated to ${grade} in class ${classId}`,
  );
}

export async function deleteStudent(id: number) {
  console.log('Deleting student...');
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting student');
  console.log('Student deleted');
}
