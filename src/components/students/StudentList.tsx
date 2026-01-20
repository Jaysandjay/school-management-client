import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchStudents } from '../../api/students';
import { getAvailableGuardianStudents } from '../../api/guardians';
import { getClassAvailableStudents, getClassStudents } from '../../api/classes';
import type { StudentRecord } from '../../types/Student';

import Table from '../ui/Table';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyMessage from '../cards/EmptyMessage';
import AssignStudentToGuardianModal from '../modals/AssignStudentToGuardianModal';
import EnrollStudentModal from '../modals/EnrollStudentModal';
import UnenrollStudentModal from '../modals/UnenrollStudentModal';

interface StudentListProps {
  id?: number;
  context?: 'guardian' | 'enrollment-assignable' | 'enrollment-assigned';
  searchBar?: boolean;
  emptyMessage?: string;
  buttonTitle?: string;
  buttonColor?: string;
}

export default function StudentList({
  buttonTitle = 'Add',
  buttonColor = 'bg-green-600',
  searchBar = true,
  id,
  context,
  emptyMessage,
}: StudentListProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(
    null,
  );
  const [isAssigningStudentToGuardian, setIsAssigningStudentToGuardian] =
    useState(false);
  const [isAssiginingStudentToClass, setIsAssigningStudentToClass] =
    useState(false);
  const [isRemovingStudentFromClass, setIsRemovingStudentFromClass] =
    useState(false);
  const showActionButton = Boolean(id && context);

  function getQueryKey() {
    if (id && context) {
      switch (context) {
        case 'guardian':
          return ['guardian-students'];
        case 'enrollment-assignable':
          return ['class-students', id, 'available'];
        case 'enrollment-assigned':
          return ['class-students', id, 'enrolled'];
        default:
          return ['students'];
      }
    }
    return ['students'];
  }

  function handleMethod(student: StudentRecord) {
    if (!id || !context) return;
    setSelectedStudent(student);
    switch (context) {
      case 'guardian':
        return setIsAssigningStudentToGuardian(true);
      case 'enrollment-assignable':
        return setIsAssigningStudentToClass(true);
      case 'enrollment-assigned':
        return setIsRemovingStudentFromClass(true);
    }
  }

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<StudentRecord[]>({
    queryKey: getQueryKey(),
    queryFn: () => {
      if (!id || !context) return fetchStudents();
      switch (context) {
        case 'guardian':
          return getAvailableGuardianStudents(id);
        case 'enrollment-assignable':
          return getClassAvailableStudents(id);
        case 'enrollment-assigned':
          return getClassStudents(id);
        default:
          return fetchStudents();
      }
    },
  });

  const columns = [
    { key: 'studentId', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'gradeLevel', label: 'Grade Level' },
  ] as const;

  return (
    <div className='h-full min-h-0 flex-1'>
      {isError && <p>Error..</p>}
      {isLoading ? (
        <LoadingSpinner />
      ) : data.length !== 0 ? (
        <Table
          columns={columns}
          rows={data}
          urls="/students"
          idField="studentId"
          searchBar={searchBar}
          maxHeight="max-h-100"
          addButtonOnClick={
            showActionButton ? (row) => handleMethod(row) : undefined
          }
          addButtonTitle={buttonTitle}
          addButtonColor={buttonColor}
        />
      ) : (
        <EmptyMessage message={emptyMessage ? emptyMessage : 'No students'} />
      )}
      {id && selectedStudent && context === 'guardian' && id && (
        <AssignStudentToGuardianModal
          guardianId={id}
          student={selectedStudent}
          isOpen={isAssigningStudentToGuardian}
          onClose={() => setIsAssigningStudentToGuardian(false)}
        />
      )}
      {id && isAssiginingStudentToClass && selectedStudent && (
        <EnrollStudentModal
          classId={id}
          studentId={selectedStudent.studentId}
          isOpen={isAssiginingStudentToClass}
          onClose={() => setIsAssigningStudentToClass(false)}
          type="class"
        />
      )}
      {id && isRemovingStudentFromClass && selectedStudent && (
        <UnenrollStudentModal
          classId={id}
          studentId={selectedStudent.studentId}
          isOpen={isRemovingStudentFromClass}
          onClose={() => setIsRemovingStudentFromClass(false)}
          type="class"
        />
      )}
    </div>
  );
}
