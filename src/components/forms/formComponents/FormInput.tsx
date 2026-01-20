import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  value?: string;
  type?: string;
  pattern?: string;
  placeholder?: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  pattern,
  label,
  name,
  value = '',
  type = 'text',
  placeholder = '',
  error = false,
  onChange,
}: FormInputProps)=>{
  return (
    <div className="flex flex-col mb-2">
      <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...(pattern ? { pattern } : {})}
        // required={true}
        className={`border px-4 py-2 rounded text-sm ${
          error
            ? 'border-red-600'
            : 'border-slate-300'
        }`}
      />
    </div>
  );
}
export default React.memo(FormInput);
