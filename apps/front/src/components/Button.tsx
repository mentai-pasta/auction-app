import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false,
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = {
        small: 'btn-sm',
        medium: 'btn-md',
        large: 'btn-lg',
    }[size];

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;