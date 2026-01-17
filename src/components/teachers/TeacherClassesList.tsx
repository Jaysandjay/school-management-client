import { getUnassignedClasses } from '../../api/classes';
import { getTeacherClasses } from '../../api/teachers';
import type { CourseRecord } from '../../types/Course';
import { useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import Table from '../ui/Table';
import AssignTeacherToClassModal from '../modals/AssignTeacherToClassModal';
import RemoveTeacherFromClassModal from '../modals/RemoveTeacherFromClassModal';

interface TeacherClassesListProps {
  id: number;
  emptyMessage: string;
  context: 'assigned' | 'available';
}

export default function TeacherClassesList({
  id,
  emptyMessage,
  context,
}: TeacherClassesListProps) {
  const [isRemovingClass, setIsRemovingClass] = useState(false);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState<CourseRecord | null>(null);

  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery<CourseRecord[]>({
    queryKey:
      context === 'assigned'
        ? ['teacher-classes', id, context]
        : ['classes', 'unassigned'],
    queryFn: () =>
      context === 'assigned' ? getTeacherClasses(id) : getUnassignedClasses(),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;

  const columns = [
    { key: 'classId', label: 'ID' },
    { key: 'className', label: 'Name' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'numStudents', label: 'Students Registered' },
    { key: 'capacity', label: 'Capacity' },
  ] as const;

  return (
    <>
      {isError && <p>Error..</p>}
      {classes.length !== 0 ? (
        <Table
          columns={columns}
          rows={classes}
          urls="/classes"
          idField="classId"
          addButtonOnClick={(row) => {
            setSelectedClass(row);
            context === 'assigned'
              ? setIsRemovingClass(true)
              : setIsAddingClass(true);
          }}
          addButtonColor={
            context === 'assigned' ? 'bg-red-600' : 'bg-green-600'
          }
          addButtonTitle={context === 'assigned' ? 'Remove' : 'Assign'}
          checked={context === 'assigned' ? true : false}
          searchBar={context === 'assigned' ? false : true}
        />
      ) : (
        <div className="w-full flex justify-center h-5 items-center">
          <h3 className="text-red-600">{emptyMessage}</h3>
        </div>
      )}
      {selectedClass && isRemovingClass && (
        <RemoveTeacherFromClassModal
          isOpen={isRemovingClass}
          teacherId={id}
          classId={selectedClass.classId}
          onClose={() => setIsRemovingClass(false)}
        />
      )}
      {selectedClass && isAddingClass && (
        <AssignTeacherToClassModal
          isOpen={isAddingClass}
          teacherId={id}
          classId={selectedClass.classId}
          onClose={() => setIsAddingClass(false)}
        />
      )}
    </>
  );
}
