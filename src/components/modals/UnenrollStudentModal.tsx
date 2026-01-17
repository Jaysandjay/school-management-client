import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getStudent, unenrollStudent } from '../../api/students';
import { getClass } from '../../api/classes';

import type { CourseRecord } from '../../types/Course';
import type { StudentRecord } from '../../types/Student';

import BasicModalContainer from './ui/BasicModalContainer';
import PrimaryButton from '../ui/PrimaryButton';

interface UnenrollStudentModalProps {
  classId: number;
  studentId: number;
  isOpen: boolean;
  onClose: () => void;
  type: 'student' | 'class';
}

interface UnenrollVariables {
  studentId: number;
  classId: number;
}

export default function UnenrollStudentModal({
  type,
  classId,
  studentId,
  isOpen,
  onClose,
}: UnenrollStudentModalProps) {
  const [isSuccessfullyRemoved, setIsSuccessfullyRemoved] = useState(false);

  const queryClient = useQueryClient();

  const { data: course } = useQuery<CourseRecord>({
    queryKey: ['class', classId],
    queryFn: () => getClass(classId),
    enabled: !!classId,
  });

  const { data: student } = useQuery<StudentRecord>({
    queryKey: ['student', classId],
    queryFn: () => getStudent(studentId),
    enabled: !!studentId,
  });

  const mutation = useMutation({
    mutationFn: ({ studentId, classId }: UnenrollVariables) =>
      unenrollStudent(studentId, classId),
    onSuccess: () => {
      switch (type) {
        case 'student':
          {
            (queryClient.invalidateQueries({
              queryKey: ['student-classes', studentId, 'enrolled'],
            }),
              queryClient.invalidateQueries({
                queryKey: ['student-classes', studentId, 'available'],
              }));
          }
          break;
        case 'class':
          {
            (queryClient.invalidateQueries({
              queryKey: ['class-students', classId, 'enrolled'],
            }),
              queryClient.invalidateQueries({
                queryKey: ['class-students', classId, 'available'],
              }));
          }
          break;
      }
    },
  });

  async function unenroll() {
    try {
      await mutation.mutateAsync({ studentId: studentId, classId: classId });
      setIsSuccessfullyRemoved(true);
    } catch (err) {
      console.error(err);
    }
  }

  if (!isOpen) return null;

  return (
    <BasicModalContainer>
      {course ? (
        <>
          {isSuccessfullyRemoved ? (
            <h2>Successfully unenrolled</h2>
          ) : (
            <h2>
              Are you sure you want to unenroll {student?.firstName}{' '}
              {student?.lastName} from {course.className}
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
                  color="bg-red-600"
                  onclick={unenroll}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <div>
          <h1>Error, not found</h1>
          <PrimaryButton
            title="Cancel"
            color="bg-slate-500"
            onclick={onClose}
          />
        </div>
      )}
    </BasicModalContainer>
  );
}
