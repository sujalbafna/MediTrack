import React from 'react';

interface NumericInputProps {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  step?: number;
  required?: boolean;
  label: string;
}

export function NumericInput({
  name,
  value,
  onChange,
  min = 0,
  step = 1,
  required = false,
  label
}: NumericInputProps) {
  // Ensure value is always a valid number string
  const displayValue = isNaN(value) ? '' : value.toString();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        name={name}
        value={displayValue}
        onChange={onChange}
        min={min}
        step={step}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}