import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
