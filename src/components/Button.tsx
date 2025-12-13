import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    isLoading = false, 
    variant = 'primary',
    className = '',
    onClick,
    disabled,
    ...props 
}) => {
    const handleRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading || disabled) return;
        
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading || disabled) return;
        onClick?.(e);
    };

    const baseClasses = "relative border-2 rounded-full font-semibold overflow-hidden group transition-all duration-500 ease-out disabled:opacity-60 disabled:cursor-not-allowed text-sm";
    
    const variantClasses = {
        primary: "border-[#F37021] text-[#F37021] hover:text-slate-900 dark:hover:text-foreground disabled:hover:text-[#F37021]",
        secondary: "border-primary text-primary hover:text-slate-900 dark:hover:text-foreground disabled:hover:text-primary",
        outline: "border-border text-foreground hover:bg-muted disabled:hover:bg-transparent"
    };

    const rippleColors = {
        primary: 'bg-[#F37021]',
        secondary: 'bg-primary',
        outline: 'bg-border'
    };

    const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <button
            className={finalClassName}
            onMouseMove={handleRippleEffect}
            onClick={handleClick}
            disabled={isLoading || disabled}
            {...props}
        >
            {!isLoading && (variant === 'primary' || variant === 'secondary') && (
                <span 
                    className={`absolute top-[var(--y)] left-[var(--x)] -translate-x-1/2 -translate-y-1/2 w-0 h-0 ${rippleColors[variant]} rounded-full group-hover:w-[500px] group-hover:h-[500px] transition-all duration-500 ease-out`}
                />
            )}
            <div className="relative z-10 h-full w-full flex items-center justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                        <span className="loading-dot"></span>
                        <span className="loading-dot" style={{ animationDelay: '0.2s' }}></span>
                        <span className="loading-dot" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                ) : (
                    <span>{children}</span>
                )}
            </div>
        </button>
    );
};

export default Button;

