import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<FieldValues> | any;
  name: string;
}

const InputComponent: React.FC<InputProps> = ({ control, name, ...rest }) => {
  return (
    <Controller
      control={control as Control<FieldValues>}
      render={({ field: { onChange, onBlur, value } }) => (
        <input
          className="h-10 border border-gray-300 px-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={onChange}
          onBlur={onBlur}
          value={value || ''}
          {...rest}
        />
      )}
      name={name}
      defaultValue=""
    />
  );
};

export default InputComponent;
