import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGuardian } from '../../api/guardians';
import type { Guardian } from '../../types/Guardian';

import GuardianDetailsForm from '../../components/forms/GuardianDetailsForm';
import FormNavButtons from '../../components/navigation/FormNavButtons';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function GuardianAdd() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addGuardian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guardians'] });
    },
    onError: (err) => console.error(err),
  });

  return (
    <div className=" flex flex-col items-center w-full">
      <FormNavButtons />

      <GuardianDetailsForm
        title="Add Student"
        onSubmit={async (guardian: Guardian) => {
          await mutation.mutateAsync(guardian);
        }}
        successMessage={(g: Guardian) =>
          `${g.firstName} ${g.lastName} has been registered`
        }
      />
      {mutation.isPending && <LoadingSpinner />}
      {mutation.error && 'Error Adding Guardian'}
    </div>
  );
}
