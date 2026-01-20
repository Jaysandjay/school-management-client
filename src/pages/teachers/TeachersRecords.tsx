
import PageTitle from '../../components/ui/PageTitle';
import { useQuery } from '@tanstack/react-query';
import Table from '../../components/ui/Table';
import { fetchTeachers } from '../../api/teachers';
import EmptyMessage from '../../components/cards/EmptyMessage';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function TeachersRecords() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['teachers'],
    queryFn: fetchTeachers,
  });

  const columns = [
  { key: 'teacherId', label: 'ID' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  ] as const;

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="flex flex-col h-full">
      <PageTitle title="Teacher Records" />
     {isError && <p>Error..</p>}
        {data.length != 0 ? (
          <Table
            columns={columns}
            rows={data}
            urls="/teachers"
            idField="teacherId"
          />
        ) : (
          <EmptyMessage message="No guardians" />
        )}
    </div>
  );
}
