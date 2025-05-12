import React, { useState } from 'react';

interface CheckboxGroupProps {
  options: { label: string; value: string }[];
  label?: string;
  value: string;
  onChange: (value: { label: string; value: string }) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  label,
  value,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleOptionChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    setSelectedValue(selectedOption.value);
    onChange(selectedOption);
  };

  return (
    <div className='flex flex-col'>
      {label && (
        <div className='mb-2 text-gray-800 text-sm font-medium'>{label} *</div>
      )}
      <div className='flex flex-col gap-2'>
        {options.map((option) => (
          <label
            key={option.value}
            className='flex items-center gap-2 cursor-pointer p-2 rounded border border-gray-300 hover:bg-gray-100'
          >
            <input
              type='radio'
              name='checkbox-group'
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleOptionChange(option)}
              className='w-4 h-4 text-blue-600 focus:ring-blue-500'
            />
            <span className='text-gray-700 text-sm'>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
