'use client';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useState } from 'react';
import Table from '../ui/Table';
import type { StudentGuardianView } from '../../types/StudentGuardianView';
import EmptyMessage from '../cards/EmptyMessage';
import { getGuardianStudents } from '../../api/guardians';
import RemoveStudentFromGuardianModal from '../modals/RemoveStudentFromGuardianModal';

interface GuardianStudentListProps {
  id: number;
}

export default function GuardianStudentList({ id }: GuardianStudentListProps) {
  const [isRemovingStudent, setIsRemovingStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentGuardianView | null>(null);

  console.log(selectedStudent);
  const {
    data: studentGuardians = [],
    isLoading,
    isError,
  } = useQuery<StudentGuardianView[]>({
    queryKey: ['guardian-students', id],
    queryFn: () => getGuardianStudents(id),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;

  const studentGuardianscolumns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'relationship', label: 'Relationship' },
  ] as const;

  return (
    <>
      {isError && <p>Error..</p>}
      {studentGuardians.length !== 0 ? (
        <Table
          columns={studentGuardianscolumns}
          rows={studentGuardians}
          urls="/students"
          idField="studentId"
          addButtonOnClick={(row) => {
            setSelectedStudent(row);
            setIsRemovingStudent(true);
          }}
          addButtonColor="bg-red-600"
          addButtonTitle="Remove"
          checked={true}
          searchBar={false}
        />
      ) : (
        <EmptyMessage message="No students assigned" />
      )}
      {selectedStudent && (
        <RemoveStudentFromGuardianModal
          isOpen={isRemovingStudent}
          guardianId={id}
          studentId={selectedStudent.studentId}
          onClose={() => setIsRemovingStudent(false)}
        />
      )}
    </>
  );
}
