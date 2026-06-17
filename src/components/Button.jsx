import React from 'react';
import { cn } from '../utils/cn'; 

const Button = ({ 
  children,       
  text,          
  onClick, 
  type = "button", 
  className,
  variant = "primary", 
  ...props       
}) => {
  
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-blue-700 rounded-[5px]',
    secondary: 'bg-green-100 text-gray-900 hover:bg-gray-200 rounded-[5px]',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-[5px]',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={cn('custom-btn', baseStyles, variants[variant], className)}
      style={{ padding: '10px 20px', ...props.style }} 
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;
