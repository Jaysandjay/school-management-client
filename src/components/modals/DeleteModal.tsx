import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { deleteStudent } from '../../api/students';
import { deleteTeacher } from '../../api/teachers';
import { deleteGuardian } from '../../api/guardians';
import { deleteClass } from '../../api/classes';

import BasicModalContainer from './ui/BasicModalContainer';
import PrimaryButton from '../ui/PrimaryButton';

interface DeleteModalProps {
  id: number;
  type: 'student' | 'teacher' | 'guardian' | 'class';
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteModal({
  id,
  type,
  isOpen,
  onClose,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function getMutation(id: number) {
    switch (type) {
      case 'student':
        return deleteStudent(id);
      case 'teacher':
        return deleteTeacher(id);
      case 'guardian':
        return deleteGuardian(id);
      case 'class':
        return deleteClass(id);
    }
  }

  const mutation = useMutation({
    mutationFn: (id: number) => getMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [type === 'class' ? type + 'es' : type + 's'],
      });
    },
  });

  async function remove(id: number) {
    try {
      await mutation.mutateAsync(id);
      setIsDeleting(true);
    } catch (err) {
      console.error(err);
    }
  }

  if (!isOpen) return null;

  return (
    <BasicModalContainer>
      {isDeleting ? (
        <h2>{type} has been removed</h2>
      ) : (
        <h2>Are you sure you want to remove this {type}?</h2>
      )}

      <div>
        {isDeleting ? (
          <PrimaryButton
            title="Close"
            color="bg-slate-500"
            onclick={() => {
              onClose();
              navigate(type === 'class' ? `/${type}es` : `/${type}s`);
              setIsDeleting(false);
            }}
          />
        ) : (
          <>
            <PrimaryButton
              title="Cancel"
              color="bg-slate-500"
              onclick={onClose}
            />
            <PrimaryButton
              title="Remove"
              color="bg-red-600"
              onclick={() => remove(id)}
            />
          </>
        )}
      </div>
    </BasicModalContainer>
  );
}
