import BasicContainer from '../ui/BasicContainer';
import PrimaryButton from '../ui/PrimaryButton';
import { useState } from 'react';
import StudentEnrolledClassesList from './StudentEnrolledClassesList';

interface StudentEnrollmentsCardProps {
  studentId: number;
}

export default function StudentEnrollmentsCard({
  studentId,
}: StudentEnrollmentsCardProps) {
  const [isViewingAvailableCourses, setIsViewingAvailableCourses] =
    useState(false);

  return (
    <div>
      <BasicContainer title="Enrollments" width="w-full">
        {isViewingAvailableCourses ? (
          <StudentEnrolledClassesList
            studentId={studentId}
            enrolled={false}
            emptyMessage="No available classes"
            maxHeight='max-h-80'
          />
        ) : (
          <StudentEnrolledClassesList
            studentId={studentId}
            enrolled={true}
            checked={true}
            emptyMessage="Not currently enrolled in any classes"
            maxHeight='max-h-80'
          />
        )}
        <div className="mt-5 w-full flex justify-end">
          {isViewingAvailableCourses ? (
            <PrimaryButton
              title="Cancel"
              color="bg-red-600"
              onclick={() => setIsViewingAvailableCourses(false)}
            />
          ) : (
            <PrimaryButton
              title="Add Course"
              onclick={() => setIsViewingAvailableCourses(true)}
            />
          )}
        </div>
      </BasicContainer>
    </div>
  );
}
