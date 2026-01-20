import { useQuery } from '@tanstack/react-query';
import { fetchGuardians } from '../../api/guardians';

import Table from '../../components/ui/Table';
import PageTitle from '../../components/ui/PageTitle';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyMessage from '../../components/cards/EmptyMessage';

export default function GuardiansRecords() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['guardians'],
    queryFn: fetchGuardians,
  });
  const columns = [
    { key: 'guardianId', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col h-full">
      <PageTitle title="Guardian Records" />
      {isError && <p>Error..</p>}
      {data.length != 0 ? (
        <Table
          columns={columns}
          rows={data}
          urls="/guardians"
          idField="guardianId"
        />
      ) : (
        <EmptyMessage message="No guardians" />
      )}
    </div>
  );
}
