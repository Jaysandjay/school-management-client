import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getStudent, updateStudent } from '../../api/students';
import type { Student, StudentRecord } from '../../types/Student';

import LoadingSpinner from '../ui/LoadingSpinner';
import InfoCard from '../ui/infoCard';
import StudentDetailsForm from '../forms/StudentDetailsForm';

interface StudentBasicInfoProps {
  id: number;
}

export default function StudentBasicInfo({ id }: StudentBasicInfoProps) {
  const [isEditingDetails, setIsEdtiingDetails] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<StudentRecord>({
    queryKey: ['student', id],
    queryFn: () => getStudent(Number(id)),
    enabled: !!id,
  });
  const mutation = useMutation({
    mutationFn: (updatedStudent: Student) =>
      updateStudent(Number(id), updatedStudent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', id] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setIsEdtiingDetails(false);
    },
  });

  const student: StudentRecord = data as StudentRecord;

  const basicInfo = {
    'First Name:': student.firstName,
    'Last Name:': student.lastName,
    'D.O.B: ': student.dateOfBirth,
    'Grade Level: ': student.gradeLevel,
  };

  function toggleEdit() {
    setIsEdtiingDetails(!isEditingDetails);
  }

  return (
    <>
      {isEditingDetails ? (
        <StudentDetailsForm
          title="Edit Student"
          currentStudent={student}
          onSubmit={async (updatedStudent) => {
            await mutation.mutateAsync(updatedStudent);
          }}
          successMessage={() => `Details have been edited`}
          toggle={toggleEdit}
        />
      ) : (
        <InfoCard
          title="Details"
          data={basicInfo}
          toggle={toggleEdit}
          isLoading={isLoading}
        />
      )}
      {mutation.isPending && <LoadingSpinner />}
    </>
  );
}
