import PageTitle from '../../components/ui/PageTitle';
import EmptyMessage from '../../components/cards/EmptyMessage';
import Table from '../../components/ui/Table';
import { fetchStudents } from '../../api/students';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

export default function StudentsRecords() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

    const columns = [
    { key: 'studentId', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'gradeLevel', label: 'Grade Level' },
  ] as const;
    if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="flex flex-col h-full">
      <PageTitle title="Student Records" />

      {isError && <p>Error..</p>}
            {data.length != 0 ? (
              <Table
                columns={columns}
                rows={data}
                urls="/students"
                idField="studentId"
              />
            ) : (
              <EmptyMessage message="No guardians" />
            )}
    </div>
  );
}
