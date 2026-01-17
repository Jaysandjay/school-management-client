import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  addStudentAddress,
  getStudentAddress,
  updateStudentAddress,
} from '../../api/students';

import {
  addTeacherAddress,
  getTeacherAddress,
  updateTeacherAddress,
} from '../../api/teachers';

import {
  addGuardianAddress,
  getGuardianAddress,
  updateGuardianAddress,
} from '../../api/guardians';

import LoadingSpinner from '../ui/LoadingSpinner';
import InfoCard from '../ui/infoCard';
import AddressForm from '../forms/AddressForm';

import type { Address } from '../../types/Address';

interface AddressCardProps {
  id: number;
  personType: 'student' | 'guardian' | 'teacher';
}

export default function AddressCard({ id, personType }: AddressCardProps) {
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const queryClient = useQueryClient();

  function getAddress() {
    switch (personType) {
      case 'student':
        return getStudentAddress(id);
      case 'teacher':
        return getTeacherAddress(id);
      case 'guardian':
        return getGuardianAddress(id);
    }
  }

  const {
    data: address,
    isLoading,
    isError,
    error,
  } = useQuery<Address | null>({
    queryKey: [personType + '-address', id],
    queryFn: getAddress,
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (updatedAddress: Address) => {
      switch (personType) {
        case 'student':
          return address
            ? updateStudentAddress(id, updatedAddress)
            : addStudentAddress(id, updatedAddress);
        case 'guardian':
          return address
            ? updateGuardianAddress(id, updatedAddress)
            : addGuardianAddress(id, updatedAddress);
        case 'teacher':
          return address
            ? updateTeacherAddress(id, updatedAddress)
            : addTeacherAddress(id, updatedAddress);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [personType + '-address', id],
      });
      setIsEditingDetails(false);
    },
  });
  if (isError) return <p>Error: {(error as Error).message}</p>;

  const basicInfo = {
    'Street:': address ? address.street : '',
    'City:': address ? address.city : '',
    'Province: ': address ? address.province : '',
    'Postal Code: ': address ? address.postalCode : '',
  };

  function toggleEdit() {
    setIsEditingDetails(!isEditingDetails);
  }
  console.log('Address', address);

  return (
    <>
      {isEditingDetails ? (
        <AddressForm
          currentAddress={address}
          onSubmit={async (updatedAddress) => {
            await mutation.mutateAsync(updatedAddress);
          }}
          toggle={toggleEdit}
        />
      ) : address ? (
        <InfoCard
          title="Address"
          data={basicInfo}
          toggle={toggleEdit}
          isLoading={isLoading}
        />
      ) : (
        <InfoCard
          title="Address"
          toggle={toggleEdit}
          emptyMessage="No saved address"
        />
      )}
      {mutation.isPending && <LoadingSpinner />}
    </>
  );
}
