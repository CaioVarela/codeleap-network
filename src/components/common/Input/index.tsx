import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  labelClassName = '',
  inputClassName = '',
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const widthStyle = fullWidth ? 'w-full' : '';
  const errorStyle = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-blue-500';

  return (
    <div className={`mb-4 ${widthStyle}`}>
      {label && (
        <label
          htmlFor={props.id}
          className={`block pb-2 text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        className={`border bg-white px-4 py-2.5 ${errorStyle} rounded-md focus:ring-2 focus:outline-none ${className} ${inputClassName}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
