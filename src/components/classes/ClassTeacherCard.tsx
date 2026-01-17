import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getClassTeacher } from '../../api/classes';
import type { TeacherRecord } from '../../types/Teacher';
import { useNavigate } from 'react-router-dom';
import RemoveTeacherFromClassModal from '../modals/RemoveTeacherFromClassModal';
import EmptyMessage from '../cards/EmptyMessage';
import BasicContainer from '../ui/BasicContainer';
import BasicInfoCard from '../cards/BasicInfoCard';

interface ClassTeacherCardProps {
  id: number;
}

export default function ClassTeacherCard({ id }: ClassTeacherCardProps) {
  const [isRemovingTeacher, setIsRemovingTeacher] = useState(false);
  const {
    data: teacher
  } = useQuery<TeacherRecord>({
    queryKey: ['class-teacher', id],
    queryFn: () => getClassTeacher(id!),
    enabled: !!id,
  });

  const navigate = useNavigate(); // React Router replacement
  function handleRedirect() {
    if (teacher) navigate(`/teachers/${teacher.teacherId}`);
  }
  console.log('isremovingteacher', isRemovingTeacher);
  return (
    <>
      {teacher ? (
        <BasicInfoCard
          type="teacher"
          isForm={false}
          id={teacher.teacherId}
          toggle={() => handleRedirect()}
        />
      ) : (
        <BasicContainer title="Teacher Details">
          <div className="h-full flex align-center">
            <EmptyMessage message="No teacher assigned" />
          </div>
        </BasicContainer>
      )}

      {isRemovingTeacher && teacher && (
        <RemoveTeacherFromClassModal
          classId={id}
          teacherId={teacher.teacherId}
          isOpen={isRemovingTeacher}
          onClose={() => setIsRemovingTeacher(false)}
        />
      )}
    </>
  );
}
