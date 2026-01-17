import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getClass, removeClassTeacher } from '../../api/classes';
import { getTeacher } from '../../api/teachers';

import type { CourseRecord } from '../../types/Course';
import type { TeacherRecord } from '../../types/Teacher';

import BasicModalContainer from './ui/BasicModalContainer';
import PrimaryButton from '../ui/PrimaryButton';

interface RemoveTeacherFromClassModalProps {
  teacherId: number;
  classId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface AssignVariables {
  classId: number;
}

export default function RemoveTeacherFromClassModal({
  classId,
  teacherId,
  isOpen,
  onClose,
}: RemoveTeacherFromClassModalProps) {
  const [isSuccessfullyRemoved, setIsSuccessfullyRemoved] = useState(false);
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
    mutationFn: ({ classId }: AssignVariables) => removeClassTeacher(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['class-teacher', classId] });
      queryClient.invalidateQueries({
        queryKey: ['teacher-classes', teacherId],
      });
    },
  });

  async function AssignTeacher() {
    try {
      await mutation.mutateAsync({ classId });
      setIsSuccessfullyRemoved(true);
    } catch (err) {
      console.error(err);
    }
  }

  if (!isOpen) return null;

  return (
    <BasicModalContainer>
      {teacher ? (
        <>
          {isSuccessfullyRemoved ? (
            <h2>Successfully Removed!</h2>
          ) : (
            <h2>
              Are you sure you want to remove {teacher?.firstName}{' '}
              {teacher?.lastName} from {course?.className}?
            </h2>
          )}

          <div>
            {isSuccessfullyRemoved ? (
              <PrimaryButton
                title="Close"
                color="bg-slate-500"
                onclick={() => {
                  onClose();
                  setIsSuccessfullyRemoved(false);
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
                  title="Remove"
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
