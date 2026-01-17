import BasicContainer from '../ui/BasicContainer';
import { useState } from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import TeacherClassesList from './TeacherClassesList';

interface TeacherClassesCardProps {
  id: number;
}

export default function TeacherClassesCard({ id }: TeacherClassesCardProps) {
  const [isViewingAvailableClasses, setIdViewingAvailableClasses] =
    useState(false);

  return (
    <div>
      <BasicContainer title="Classes" width="w-full">
        {isViewingAvailableClasses ? (
          <TeacherClassesList
            id={id}
            context="available"
            emptyMessage="No assigned classes"
          />
        ) : (
          <TeacherClassesList
            id={id}
            context="assigned"
            emptyMessage="No assignable classes"
          />
        )}

        <div className="mt-5 w-full flex justify-end">
          {isViewingAvailableClasses ? (
            <PrimaryButton
              title="Cancel"
              color="bg-red-600"
              onclick={() =>
                setIdViewingAvailableClasses(!isViewingAvailableClasses)
              }
            />
          ) : (
            <PrimaryButton
              title="Assign Class"
              onclick={() =>
                setIdViewingAvailableClasses(!isViewingAvailableClasses)
              }
            />
          )}
        </div>
      </BasicContainer>
    </div>
  );
}
