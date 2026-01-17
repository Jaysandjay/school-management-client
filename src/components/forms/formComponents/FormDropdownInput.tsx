import React from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value?: string | number;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormDropDownInput({
  label,
  name,
  value = '',
  options,
  onChange,
}: FormSelectProps) {
  return (
    <div className="flex flex-col mb-2">
      <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="px-4 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
