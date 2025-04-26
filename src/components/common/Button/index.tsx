import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  children: React.ReactNode;
  noAnimation?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
  noAnimation = false,
  ...props
}) => {
  const baseStyle =
    'rounded text-sm max-w-[111px] max-h-[32px] py-2 px-7 font-medium transition-colors focus:outline-none';

  const variantStyles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const buttonClassNames = `${baseStyle} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${className}`;

  // Use a regular button but wrap it with motion div when animation is needed
  if (noAnimation) {
    return (
      <button className={buttonClassNames} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
    >
      <button className={buttonClassNames} disabled={disabled} {...props}>
        {children}
      </button>
    </motion.div>
  );
};

export default Button;
