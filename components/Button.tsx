import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
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
  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden rounded-full font-display";
  
  const variants = {
    // Sky Blue Primary
    primary: "bg-[#38BDF8] text-black hover:bg-[#0EA5E9] shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] border border-[#38BDF8]",
    // Dark Grey Secondary
    secondary: "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border border-white/10 hover:border-white/30",
    // Outline with Sky Blue
    outline: "bg-transparent text-white border border-white/20 hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#38BDF8]/5",
    // Ghost
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    // Glass with Neon Glow
    glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:text-white"
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="relative flex items-center gap-2 z-10">
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </span>
    </button>
  );
};

export default Button;