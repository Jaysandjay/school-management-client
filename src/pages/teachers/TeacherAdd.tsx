import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTeacher } from '../../api/teachers';
import type { Teacher } from '../../types/Teacher';

import TeacherDetailsForm from '../../components/forms/TeacherDetailsForm';
import FormNavButtons from '../../components/navigation/FormNavButtons';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function TeacherAdd() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
    onError: (err) => console.error('Error adding teacher', err),
  });

  return (
    <div className="flex-col flex items-center">
      <FormNavButtons />
      <TeacherDetailsForm
        title="Add Teacher"
        onSubmit={async (teacher: Teacher) => {
          await mutation.mutateAsync(teacher);
        }}
        successMessage={(t) =>
          `${t.firstName} ${t.lastName} has been registered`
        }
      />
      {mutation.isPending && <LoadingSpinner />}
      {mutation.error && 'Error Adding teacher'}
    </div>
  );
}
