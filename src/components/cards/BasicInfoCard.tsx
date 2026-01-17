import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getStudent, updateStudent } from '../../api/students';
import type { Student, StudentRecord } from '../../types/Student';

import { getTeacher, updateTeacher } from '../../api/teachers';
import type { Teacher, TeacherRecord } from '../../types/Teacher';

import { getGuardian, updateGuardian } from '../../api/guardians';
import type { Guardian, GuardianRecord } from '../../types/Guardian';

import { getClass, updateClass } from '../../api/classes';
import type { Course, CourseRecord } from '../../types/Course';

import LoadingSpinner from '../ui/LoadingSpinner';
import InfoCard from '../ui/infoCard';

import StudentDetailsForm from '../forms/StudentDetailsForm';
import TeacherDetailsForm from '../forms/TeacherDetailsForm';
import GuardianDetailsForm from '../forms/GuardianDetailsForm';
import ClassDetailsForm from '../forms/ClassDetailsForm';

import type { ReactNode } from 'react';

interface BasicInfoCardProps {
  id: number;
  type: 'student' | 'teacher' | 'guardian' | 'class';
  isForm?: boolean;
  infoCardChildren?: ReactNode;
  toggle?: (values: any) => any;
}

export default function BasicInfoCard({
  toggle,
  id,
  type: type,
  isForm = true,
}: BasicInfoCardProps) {
  const [isEditingDetails, setIsEdtiingDetails] = useState(false);
  const queryClient = useQueryClient();

  function getPerson() {
    switch (type) {
      case 'student':
        return getStudent(id);
      case 'teacher':
        return getTeacher(id);
      case 'guardian':
        return getGuardian(id);
      case 'class':
        return getClass(id);
    }
  }

  const { data, isLoading} = useQuery({
    queryKey: [type, id],
    queryFn: getPerson,
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (updatedData: any) => {
      switch (type) {
        case 'student':
          return updateStudent(id, updatedData as Student);
        case 'teacher':
          return updateTeacher(id, updatedData as Teacher);
        case 'guardian':
          return updateGuardian(id, updatedData as Guardian);
        case 'class':
          return updateClass(id, updatedData as Course);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type, id] });
      queryClient.invalidateQueries({ queryKey: [type + 's'] });
      setIsEdtiingDetails(false);
    },
  });
  let basicInfo: Record<string, any> = {};
  if (data) {
    switch (type) {
      case 'student':
        const student: StudentRecord = data as StudentRecord;
        basicInfo = {
          ID: student.studentId,
          'First Name:': student.firstName,
          'Last Name:': student.lastName,
          'D.O.B: ': student.dateOfBirth,
          'Grade Level: ': student.gradeLevel,
        };
        break;
      case 'guardian':
        const guardian: GuardianRecord = data as GuardianRecord;
        basicInfo = {
          ID: guardian.guardianId,
          'First Name': guardian.firstName,
          'Last Name': guardian.lastName,
          Phone: guardian.phone,
          Email: guardian.email,
        };
        break;
      case 'teacher':
        const teacher: TeacherRecord = data as TeacherRecord;
        basicInfo = {
          ID: teacher.teacherId,
          'First Name': teacher.firstName,
          'Last Name': teacher.lastName,
          Phone: teacher.phone,
          Email: teacher.email,
        };
        break;
      case 'class':
        const course: CourseRecord = data as CourseRecord;
        basicInfo = {
          ID: course.classId,
          'Class Name': course.className,
          'Grade Level': course.gradeLevel,
          'Students Enrolled': course.numStudents,
          Capacity: course.capacity,
        };
    }
  }

  function toggleEdit() {
    setIsEdtiingDetails(!isEditingDetails);
  }

  return (
    <>
      {isForm ? (
        isEditingDetails ? (
          <>
            {type === 'student' && data && (
              <StudentDetailsForm
                title="Edit Student"
                currentStudent={data as StudentRecord}
                onSubmit={async (updated) =>
                  await mutation.mutateAsync(updated)
                }
                successMessage={() => `Details have been edited`}
                toggle={toggleEdit}
              />
            )}
            {type === 'guardian' && data && (
              <GuardianDetailsForm
                title="Edit Guardian"
                currentGuardian={data as GuardianRecord}
                onSubmit={async (updated) =>
                  await mutation.mutateAsync(updated)
                }
                successMessage={() => `Details have been edited`}
                toggle={toggleEdit}
              />
            )}
            {type === 'teacher' && data && (
              <TeacherDetailsForm
                title="Edit Teacher"
                currentTeacher={data as TeacherRecord}
                onSubmit={async (updated) =>
                  await mutation.mutateAsync(updated)
                }
                successMessage={() => `Details have been edited`}
                toggle={toggleEdit}
              />
            )}
            {type === 'class' && data && (
              <ClassDetailsForm
                title="Edit Teacher"
                currentClass={data as CourseRecord}
                onSubmit={async (updated) =>
                  await mutation.mutateAsync(updated)
                }
                successMessage={() => `Details have been edited`}
                toggle={toggleEdit}
              />
            )}
          </>
        ) : (
          <>
            <InfoCard
              title={`${type.charAt(0).toUpperCase() + type.slice(1)} Details`}
              data={basicInfo}
              toggle={toggleEdit}
              isLoading={isLoading}
            />
            {mutation.isPending && <LoadingSpinner />}
          </>
        )
      ) : (
        <>
          <InfoCard
            title={`${type.charAt(0).toUpperCase() + type.slice(1)} Details`}
            toggle={toggle}
            data={basicInfo}
            isLoading={isLoading}
            buttonTitle="View"
          />
          {mutation.isPending && <LoadingSpinner />}
        </>
      )}
    </>
  );
}
