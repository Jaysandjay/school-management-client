'use client';
import { useState } from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import BasicContainer from '../ui/BasicContainer';
import GuardianList from '../guardians/GuardianList';
import StudentGuardiansList from './StudentGuardiansList';

interface AssignedGuardiansToStudentCardProps {
  studentId: number;
}

export default function AssignedGuardiansToStudentCard({
  studentId,
}: AssignedGuardiansToStudentCardProps) {
  const [isViewingAssignableGuardians, setIsViewingAssignableGuardians] =
    useState(false);

  return (
    <div>
      <BasicContainer title="Guardians" width="w-full">
        {isViewingAssignableGuardians ? (
          <GuardianList studentId={studentId} />
        ) : (
          <StudentGuardiansList id={studentId} />
        )}
        <div className="mt-5 w-full flex justify-end">
          {isViewingAssignableGuardians ? (
            <PrimaryButton
              title="Cancel"
              color="bg-red-600"
              onclick={() =>
                setIsViewingAssignableGuardians(!isViewingAssignableGuardians)
              }
            />
          ) : (
            <PrimaryButton
              title="Assign Guardian"
              onclick={() =>
                setIsViewingAssignableGuardians(!isViewingAssignableGuardians)
              }
            />
          )}
        </div>
      </BasicContainer>
    </div>
  );
}
