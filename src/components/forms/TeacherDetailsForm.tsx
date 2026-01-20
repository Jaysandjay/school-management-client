import React, { useState, useMemo } from 'react';
import FormContainer from './formComponents/FormContainer';
import FormInput from './formComponents/FormInput';
import SuccessModal from '../modals/ui/SuccessModal';
import PrimaryButton from '../ui/PrimaryButton';
import type { Teacher } from '../../types/Teacher';

interface TeacherDetailsFormProps {
  title: string;
  onSubmit: (teacher: Teacher) => Promise<void>;
  successMessage: (teacher: Teacher) => string;
  currentTeacher?: Teacher;
  toggle?: () => void;
}

const TeacherDetailsForm: React.FC<TeacherDetailsFormProps> = ({
  title,
  onSubmit,
  successMessage,
  currentTeacher,
  toggle,
}) => {
  const [firstName, setFirstName] = useState(currentTeacher?.firstName || '');
  const [lastName, setLastName] = useState(currentTeacher?.lastName || '');
  const [phone, setPhone] = useState(currentTeacher?.phone || '');
  const [email, setEmail] = useState(currentTeacher?.email || '');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const successMsg = useMemo(
    () =>
      successMessage({
        firstName,
        lastName,
        phone,
        email,
      }),
    [firstName, lastName, phone, email, successMessage]
  );

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teacher: Teacher = { firstName, lastName, phone, email };
    try {
      await onSubmit(teacher);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

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

      {isSuccessModalOpen && (
        <SuccessModal
          title="Teacher Added"
          message={successMsg}
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            clearInputs();
          }}
        />
      )}

      {toggle && (
        <PrimaryButton color="bg-red-600" title="Cancel" onclick={toggle} />
      )}
    </FormContainer>
  );
};

export default React.memo(TeacherDetailsForm);
