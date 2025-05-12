const CustomCheckboxGroup = ({ options, value, onChange }) => {
  const handleCheckboxChange = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option.value} className='flex items-center gap-2 mb-2'>
          <input
            type='checkbox'
            className='form-checkbox'
            checked={value === option.value}
            onChange={() => handleCheckboxChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomCheckboxGroup;
