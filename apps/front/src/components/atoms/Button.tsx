import React from "react";

interface ButtonProps {
    btnType?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    label?: string;
    disabled?: boolean;
    size?: string;
    onClick?: () => void;
    rounded?: boolean;
}

/**
 * daisyUI使用のButton
 * 
 * @example
 * export default function Home() {
 *     return (
 *         <>
 *             <Button label="Login" disabled />
 *         </>
 *     );
 * }
 */
export const Button: React.FC<ButtonProps> = ({
    btnType = "primary",
    label = "Button",
    onClick,
    size = "medium",
    disabled = false,
}) => {
    const sizeClasses = size ? `btn-${size}` : "btn-lg";
    const disabledClasses = disabled ? "disable" : "enable";

    return (
        <button
            className={`btn btn-${btnType} ${sizeClasses} ${disabledClasses}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};