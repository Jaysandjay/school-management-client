import FormContainer from './formComponents/FormContainer';
import FormInput from './formComponents/FormInput';
import { useState } from 'react';
import SuccessModal from '../modals/ui/SuccessModal';
import PrimaryButton from '../ui/PrimaryButton';
import type { Address } from '../../types/Address';
import FormDropDownInput from './formComponents/FormDropdownInput';
interface AddressFormProps {
  onSubmit: (address: Address) => Promise<void>;
  currentAddress?: Address | null;
  toggle: (values: any) => any;
}

export default function AddressForm({
  onSubmit,
  currentAddress,
  toggle,
}: AddressFormProps) {
  const [street, setStreet] = useState(
    currentAddress ? currentAddress.street : '',
  );
  const [city, setCity] = useState(currentAddress ? currentAddress.city : '');
  const [province, setProvince] = useState(
    currentAddress ? currentAddress.province : '',
  );
  const [postalCode, setPostalCode] = useState(
    currentAddress ? currentAddress.postalCode : '',
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [postalError, setPostalError] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const address: Address = {
      street,
      city,
      province,
      postalCode,
    };
    try {
      await onSubmit(address);
      console.log('Address Added', address);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <FormContainer title="Address" submit={submit}>
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
        error={postalError}
        value={postalCode}
        onChange={(e) => {
          setPostalCode(e.target.value)
          setPostalError(false)
        }}
      />

      <SuccessModal
        title="Teacher Added"
        message="Address Updated"
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
        }}
      />
      {toggle && (
        <PrimaryButton color="bg-red-600" title="Cancel" onclick={toggle} />
      )}
    </FormContainer>
  );
}
