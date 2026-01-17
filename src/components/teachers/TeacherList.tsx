'use client';

import { useQuery } from '@tanstack/react-query';
import Table from '../ui/Table';
import { fetchTeachers } from '../../api/teachers';
import type { TeacherRecord } from '../../types/Teacher';
import { getClassTeacher } from '../../api/classes';
import EmptyMessage from '../cards/EmptyMessage';
import { useState } from 'react';
import AssignTeacherToClassModal from '../modals/AssignTeacherToClassModal';
import PrimaryButton from '../ui/PrimaryButton';
import RemoveTeacherFromClassModal from '../modals/RemoveTeacherFromClassModal';

interface TeacherListProps {
  id?: number;
  height?: string;
}

export default function TeacherList({ id, height }: TeacherListProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRecord | null>(
    null,
  );
  const [isAssiginingTeacher, setIsAssigningTeacher] = useState(false);
  const [isRemovingTeacher, setIsRemovingTeacher] = useState(false);

  const { data, isLoading, isError } = useQuery<TeacherRecord[]>({
    queryKey: id ? ['class-teachers', id] : ['teachers'],
    queryFn: () => fetchTeachers(),
    enabled: !!id,
  });
  const { data: assignedTeacher } = useQuery<TeacherRecord>({
    queryKey: ['class-teacher', id],
    queryFn: () => getClassTeacher(id!),
    enabled: !!id,
  });
  const columns = [
    { key: 'teacherId', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ] as const;

  return (
    <div className="flex flex-col min-h-0">
      {isError && <p>Error..</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <Table
          columns={columns}
          rows={data}
          urls="/teachers"
          idField="teacherId"
          addButtonColor="bg-green-600"
          addButtonOnClick={
            id
              ? (row) => {
                  setSelectedTeacher(row);
                  setIsAssigningTeacher(true);
                }
              : undefined
          }
          addButtonTitle="Assign"
          maxHeight={height}
        />
      ) : (
        <EmptyMessage message="No available Teachers" />
      )}
      {assignedTeacher && (
        <div className="flex justify-end mt-5">
          <PrimaryButton
            title="Remove Assigned Teacher"
            color="bg-red-600"
            onclick={() => setIsRemovingTeacher(true)}
          />
        </div>
      )}

      {isRemovingTeacher && assignedTeacher && id && (
        <RemoveTeacherFromClassModal
          teacherId={assignedTeacher.teacherId}
          classId={id}
          isOpen={isRemovingTeacher}
          onClose={() => setIsRemovingTeacher(false)}
        />
      )}
      {isAssiginingTeacher && selectedTeacher && id && (
        <AssignTeacherToClassModal
          teacherId={selectedTeacher.teacherId}
          classId={id}
          isOpen={isAssiginingTeacher}
          onClose={() => setIsAssigningTeacher(false)}
        />
      )}
    </div>
  );
}
