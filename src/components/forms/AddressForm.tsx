import React, { useCallback, useState } from 'react';
import FormContainer from './formComponents/FormContainer';
import FormInput from './formComponents/FormInput';
import FormDropDownInput from './formComponents/FormDropdownInput';
import SuccessModal from '../modals/ui/SuccessModal';
import PrimaryButton from '../ui/PrimaryButton';
import type { Address } from '../../types/Address';

interface AddressFormProps {
  onSubmit: (address: Address) => Promise<void>;
  currentAddress?: Address | null;
  toggle?: () => void;
}

const AddressForm = React.memo(function AddressForm({
  onSubmit,
  currentAddress,
  toggle,
}: AddressFormProps) {
  const [street, setStreet] = useState(currentAddress?.street ?? '');
  const [city, setCity] = useState(currentAddress?.city ?? '');
  const [province, setProvince] = useState(currentAddress?.province ?? '');
  const [postalCode, setPostalCode] = useState(currentAddress?.postalCode ?? '');
  const [postalError, setPostalError] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const address: Address = {
        street,
        city,
        province,
        postalCode,
      };

      try {
        await onSubmit(address);
        setIsSuccessModalOpen(true);
      } catch (err) {
        console.error(err);
      }
    },
    [street, city, province, postalCode, onSubmit],
  );

  // Postal code change handler
  const handlePostalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostalCode(e.target.value);
      if (postalError) setPostalError(false);
    },
    [postalError],
  );

  return (
    <FormContainer title="Address" submit={handleSubmit}>
      <FormInput
        label="Street"
        name="street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <FormInput
        label="City"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <FormDropDownInput
        label="Province"
        name="province"
        options={[
          { value: 'AB', label: 'AB' },
          { value: 'BC', label: 'BC' },
          { value: 'NB', label: 'NB' },
          { value: 'NL', label: 'NL' },
          { value: 'NS', label: 'NS' },
          { value: 'ON', label: 'ON' },
          { value: 'PE', label: 'PE' },
          { value: 'QC', label: 'QC' },
          { value: 'SK', label: 'SK' },
        ]}
        value={province}
        onChange={(e) => setProvince(e.target.value)}
      />

      <FormInput
        label="Postal Code"
        name="postalCode"
        type="text"
        value={postalCode}
        error={postalError}
        onChange={handlePostalChange}
      />

      {isSuccessModalOpen && (
        <SuccessModal
          title="Address Updated"
          message="The address was saved successfully."
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}

      {toggle && (
        <PrimaryButton
          color="bg-red-600"
          title="Cancel"
          onclick={toggle}
        />
      )}
    </FormContainer>
  );
});

export default AddressForm;
