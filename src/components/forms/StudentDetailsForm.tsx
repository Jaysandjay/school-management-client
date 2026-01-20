'use client';
import type { Student } from '../../types/Student';
import FormContainer from './formComponents/FormContainer';
import FormDropDownInput from './formComponents/FormDropdownInput';
import FormInput from './formComponents/FormInput';
import { useState } from 'react';
import SuccessModal from '../modals/ui/SuccessModal';
import PrimaryButton from '../ui/PrimaryButton';

interface StudentDetailsFormProps {
  title: string;
  onSubmit: (student: Student) => Promise<void>;
  successMessage: (student: Student) => string;
  currentStudent?: Student;
  toggle?: (values: any) => any;
}

export default function StudentDetailsForm({
  title,
  onSubmit,
  successMessage,
  currentStudent,
  toggle,
}: StudentDetailsFormProps) {
  const [firstName, setFirstName] = useState(
    currentStudent ? currentStudent.firstName : '',
  );
  const [lastName, setLastName] = useState(
    currentStudent ? currentStudent.lastName : '',
  );
  const [dateOfBirth, setDob] = useState(
    currentStudent ? currentStudent.dateOfBirth : '',
  );
  const [gradeLevel, setGradeLevel] = useState(
    currentStudent ? parseInt(currentStudent.dateOfBirth) : 9,
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  function clearInputs() {
    setFirstName('');
    setLastName('');
    setDob('');
    setGradeLevel(9);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const student: Student = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gradeLevel,
    };
    try {
      await onSubmit(student);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FormContainer title={title} submit={submit}>
      <FormInput
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <FormInput
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <FormInput
        label="Date of Birth"
        name="dob"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDob(e.target.value)}
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

      {isSuccessModalOpen && (
        <SuccessModal
          title="Success"
          message={successMessage({
            firstName,
            lastName,
            dateOfBirth,
            gradeLevel,
          })}
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            clearInputs();
          }}
        />

      )}
      {toggle && (
        <PrimaryButton title="Cancel" color="bg-red-600" onclick={toggle} />
      )}
    </FormContainer>
  );
}
