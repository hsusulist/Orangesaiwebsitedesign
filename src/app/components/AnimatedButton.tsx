import { motion } from 'motion/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClickSound?: () => void;
}

export function AnimatedButton({ 
  children, 
  variant = 'secondary', 
  onClickSound,
  className = '',
  onClick,
  ...props 
}: AnimatedButtonProps) {
  const baseClasses = 'transition-all duration-200';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90',
    secondary: 'border border-gray-300 hover:bg-gray-50',
    ghost: 'hover:bg-gray-100',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClickSound) {
      onClickSound();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
