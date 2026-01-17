import type { Course } from '../types/Course';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchClasses() {
  console.log('Fetching classes....');
  const res = await fetch(`${API_URL}/classes`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  const classes = await res.json();
  console.log('Classes', classes);
  return classes;
}

export async function getClass(id: number) {
  console.log('Getting class...');
  const res = await fetch(`${API_URL}/classes/${id}`);
  if (!res.ok) throw new Error('Error getting class');
  const course = await res.json();
  return course;
}

export async function getUnassignedClasses() {
  console.log('Getting Unassigned classes...');
  const res = await fetch(`${API_URL}/classes/unassigned`);
  if (!res.ok) throw new Error('Error getting class');
  const courses = await res.json();
  return courses;
}

export async function addclass(course: Course) {
  console.log('Adding Class....');
  const res = await fetch(`${API_URL}/classes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error('Error adding Course');
  console.log('Course Added', course);
}

export async function updateClass(id: number, course: Course) {
  console.log('Updating Class...');
  const res = await fetch(`${API_URL}/classes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error('Error updating Class');
  console.log('Class Updated', course);
}

export async function getClassTeacher(id: number) {
  console.log('Getting class teacher...');
  const res = await fetch(`${API_URL}/classes/${id}/teacher`);
  if (!res.ok) throw new Error('Error getting class teacher');
  const teacher = await res.json();
  console.log('Class teacher', teacher);
  return teacher;
}

export async function assignClassTeacher(classId: number, teacherId: number) {
  console.log('Assigning teacher...');
  const res = await fetch(`${API_URL}/classes/${classId}/teacher`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teacherId }),
  });
  if (!res.ok) throw new Error('Error assigning Teacher');
  console.log('Teacher Assigned', teacherId);
}

export async function removeClassTeacher(id: number) {
  console.log('Removing class Teacher...');
  const res = await fetch(`${API_URL}/classes/${id}/teacher`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Error removing Teacher');
  console.log('Teacher Removed');
}

export async function getClassStudents(id: number) {
  console.log('Getting class students...');
  const res = await fetch(`${API_URL}/classes/${id}/students`);
  if (!res.ok) throw new Error("Error getting class' students");
  const data = await res.json();
  const students = data.map((student: any) => ({
    ...student,
    dateOfBirth: student.dateOfBirth
      ? new Date(student.dateOfBirth).toISOString().slice(0, 10)
      : null,
  }));
  console.log('Class Students', students);
  return students;
}
export async function getClassAvailableStudents(id: number) {
  console.log('Getting class available students...');
  const res = await fetch(`${API_URL}/classes/${id}/students/available`);
  if (!res.ok) throw new Error("Error getting class' students");
  const data = await res.json();
  const students = data.map((student: any) => ({
    ...student,
    dateOfBirth: student.dateOfBirth
      ? new Date(student.dateOfBirth).toISOString().slice(0, 10)
      : null,
  }));
  console.log('Class Students', students);
  return students;
}

export async function getClassGrades(id: number) {
  console.log('Getting class grades...');
  const res = await fetch(`${API_URL}/classes/${id}/grades`);
  if (!res.ok) throw new Error('Error getting class grades');
  const grades = await res.json();
  console.log(`Class Grades`, grades);
  return grades;
}

export async function deleteClass(id: number) {
  console.log('Deleting class...');
  const res = await fetch(`${API_URL}/classes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting class');
  console.log('Class deleted');
}
