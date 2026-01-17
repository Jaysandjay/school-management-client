import DeleteModal from './modals/DeleteModal';
import PrimaryButton from './ui/PrimaryButton';
import { useState } from 'react';

interface RemoveButtonProps {
  id: number;
  type: 'student' | 'teacher' | 'guardian' | 'class';
}

export default function RemoveButton({ id, type }: RemoveButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <PrimaryButton
        title={`Remove ${type}`}
        color="bg-red-300"
        onclick={() => setIsDeleting(true)}
      />

      {isDeleting && (
        <DeleteModal
          id={id}
          type={type}
          isOpen={isDeleting}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </>
  );
}
