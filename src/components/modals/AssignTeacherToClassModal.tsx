import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { assignClassTeacher, getClass } from '../../api/classes';
import { getTeacher } from '../../api/teachers';

import type { CourseRecord } from '../../types/Course';
import type { TeacherRecord } from '../../types/Teacher';

import BasicModalContainer from './ui/BasicModalContainer';
import PrimaryButton from '../ui/PrimaryButton';

interface AssignTeacherToClassModalProps {
  classId: number;
  teacherId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface AssignVariables {
  classId: number;
  teacherId: number;
}

export default function AssignTeacherToClassModal({
  classId,
  teacherId,
  isOpen,
  onClose,
}: AssignTeacherToClassModalProps) {
  const [isSuccessfullyAssigned, setIsSuccessfullyAssigned] = useState(false);
  const queryClient = useQueryClient();

  const { data: teacher } = useQuery<TeacherRecord>({
    queryKey: ['teacher', teacherId],
    queryFn: () => getTeacher(teacherId),
    enabled: !!teacherId,
  });

  const { data: course } = useQuery<CourseRecord>({
    queryKey: ['class', classId],
    queryFn: () => getClass(classId),
    enabled: !!classId,
  });

  const mutation = useMutation({
    mutationFn: ({ classId, teacherId }: AssignVariables) =>
      assignClassTeacher(classId, teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-teacher', classId] });
      queryClient.invalidateQueries({
        queryKey: ['teacher-classes', teacherId],
      });
      queryClient.invalidateQueries({ queryKey: ['classes', 'unassigned'] });
    },
  });

  async function AssignTeacher() {
    try {
      await mutation.mutateAsync({ classId: classId, teacherId: teacherId });
      setIsSuccessfullyAssigned(true);
    } catch (err) {
      console.error(err);
    }
  }

  if (!isOpen) return null;

  return (
    <BasicModalContainer>
      {teacher ? (
        <>
          {isSuccessfullyAssigned ? (
            <h2>Successfully assigned!</h2>
          ) : (
            <h2>
              Are you sure you want to assign {teacher?.firstName}{' '}
              {teacher?.lastName} to {course?.className}
            </h2>
          )}

          <div>
            {isSuccessfullyAssigned ? (
              <PrimaryButton
                title="Close"
                color="bg-slate-500"
                onclick={() => {
                  onClose();
                  setIsSuccessfullyAssigned(false);
                }}
              />
            ) : (
              <>
                <PrimaryButton
                  title="Cancel"
                  color="bg-slate-500"
                  onclick={onClose}
                />
                <PrimaryButton
                  title="Assign"
                  color="bg-green-600"
                  onclick={AssignTeacher}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <h1>Error, Teacher not found</h1>
      )}
    </BasicModalContainer>
  );
}
