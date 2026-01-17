'use client';
import FormContainer from './formComponents/FormContainer';
import FormInput from './formComponents/FormInput';
import { useState } from 'react';
import SuccessModal from '../modals/ui/SuccessModal';
import type { Teacher } from '../../types/Teacher';
import PrimaryButton from '../ui/PrimaryButton';

interface TeacherDetailsFormProps {
  title: string;
  onSubmit: (teacher: Teacher) => Promise<void>;
  successMessage: (teacher: Teacher) => string;
  currentTeacher?: Teacher;
  toggle?: (values: any) => any;
}

export default function TeacherDetailsForm({
  title,
  onSubmit,
  successMessage,
  currentTeacher,
  toggle,
}: TeacherDetailsFormProps) {
  const [firstName, setFirstName] = useState(
    currentTeacher ? currentTeacher.firstName : '',
  );
  const [lastName, setLastName] = useState(
    currentTeacher ? currentTeacher.lastName : '',
  );
  const [phone, setPhone] = useState(
    currentTeacher ? currentTeacher.phone : '',
  );
  const [email, setEmail] = useState(
    currentTeacher ? currentTeacher.email : '',
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  function clearInputs() {
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const teacher: Teacher = {
      firstName,
      lastName,
      phone,
      email,
    };
    try {
      await onSubmit(teacher);
      console.log('Teacher Added', teacher);
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
        label="Phone"
        name="phone"
        type="tel"
        placeholder="123-1234-1234"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <SuccessModal
        title="Teacher Added"
        message={successMessage({
          firstName,
          lastName,
          phone,
          email,
        })}
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          clearInputs();
        }}
      />
      {toggle && (
        <PrimaryButton color="bg-red-600" title="Cancel" onclick={toggle} />
      )}
    </FormContainer>
  );
}
