import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getGuardian } from '../../api/guardians';
import type { GuardianRecord } from '../../types/Guardian';
import PageTitle from '../../components/ui/PageTitle';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import AddressCard from '../../components/cards/AddressCard';
import BasicInfoCard from '../../components/cards/BasicInfoCard';
import AssignedStudentsToGuardianCard from '../../components/guardians/AssignedStudentsToGuardianCard';
import RemoveButton from '../../components/RemoveButton';

export default function GuardianDetails() {
  const params = useParams();
  const id = Number(params?.id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['guardian', id],
    queryFn: () => getGuardian(id),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <p>No student found</p>;

  const guardian: GuardianRecord = data as GuardianRecord;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between w-full mb-2 items-center">
        <PageTitle
          title={`Guardian: ${guardian.firstName} ${guardian.lastName}`}
        />
        <RemoveButton id={id} type="guardian" />
      </div>
      <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
        <div className="w-full flex justify-around gap-1">
          <BasicInfoCard id={id} type="guardian" />
          <AddressCard id={id} personType="guardian" />
        </div>
        <AssignedStudentsToGuardianCard id={id} />
      </main>
    </div>
  );
}
