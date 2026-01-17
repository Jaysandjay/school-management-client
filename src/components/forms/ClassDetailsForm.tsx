'use client';
import FormContainer from './formComponents/FormContainer';
import FormDropDownInput from './formComponents/FormDropdownInput';
import FormInput from './formComponents/FormInput';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SuccessModal from '../modals/ui/SuccessModal';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { Course } from '../../types/Course';

interface ClassDetailsFormProps {
  title: string;
  onSubmit: (course: Course) => any;
  successMessage: (course: Course) => string;
  currentClass?: Course;
  toggle?: (values: any) => any;
}

export default function ClassDetailsForm({
  successMessage,
  title,
  onSubmit,
  currentClass,
}: ClassDetailsFormProps) {
  const [className, setClassName] = useState(
    currentClass ? currentClass.className : '',
  );
  const [capacity, setCapacity] = useState(
    currentClass ? currentClass.capacity.toString() : '',
  );
  const [gradeLevel, setGradeLevel] = useState(
    currentClass ? currentClass.gradeLevel : 9,
  );

  const [isCapacityError, setIsCapacityError] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err) => console.error(err),
  });

  function clearInputs() {
    setClassName('');
    setCapacity('');
    setGradeLevel(9);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCapacityError(false);
    const parsedCapacity = parseInt(capacity);
    if (Number.isNaN(parsedCapacity) || parsedCapacity <= 0) {
      console.error('Capacity must be a positive number');
      setIsCapacityError(true);
      return;
    }

    const course: Course = {
      className,
      gradeLevel,
      capacity: parsedCapacity,
    };
    try {
      await mutation.mutateAsync(course);
      console.log(course);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FormContainer title={title} submit={submit}>
      <FormInput
        label="Name"
        name="name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />

      <FormDropDownInput
        label="Grade Level"
        name="gradeLevel"
        options={[
          { value: '9', label: '9' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },
          { value: '12', label: '12' },
        ]}
        value={gradeLevel}
        onChange={(e) => setGradeLevel(parseInt(e.target.value))}
      />

      <FormInput
        label="Capacity"
        name="capacity"
        type="number"
        value={capacity}
        error={isCapacityError}
        onChange={(e) => setCapacity(e.target.value)}
      />
      {isCapacityError && (
        <p className="text-red-600 text-sm">Please insert valid number</p>
      )}
      {mutation.isPending && <LoadingSpinner />}
      {mutation.error && 'Error Adding Class'}
      <SuccessModal
        title="Class Added"
        message={successMessage({
          className,
          gradeLevel,
          capacity: parseInt(capacity),
        })}
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          clearInputs();
        }}
      />
    </FormContainer>
  );
}
