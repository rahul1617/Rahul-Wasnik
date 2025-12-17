
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'neo';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-widest transition-all duration-300 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden font-display active:scale-95 group uppercase text-[10px]";
  
  const variants = {
    primary: "bg-[#70CFFF] text-black hover:bg-white shadow-[0_4px_15px_rgba(112,207,255,0.2)] rounded-full",
    secondary: "bg-white text-black hover:bg-[#70CFFF] rounded-full",
    outline: "bg-transparent text-slate-400 border border-white/5 hover:border-white/20 hover:text-white rounded-full",
    ghost: "text-slate-500 hover:text-white hover:bg-white/5 rounded-full",
    glass: "bg-white/5 backdrop-blur-md border border-white/5 text-slate-300 hover:bg-white/10 rounded-xl",
    neo: "bg-black/60 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white rounded-full shadow-lg"
  };

  const sizes = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-10 py-4 text-xs",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="relative flex items-center gap-2 z-10">
        {isLoading && (
          <svg className="animate-spin h-3.5 w-3.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};

export default Button;
