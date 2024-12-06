import React from "react";

interface ButtonProps {
    btnType?: "btn-primary" | "btn-secondary" | "btn-success" | "btn-neutral" | "btn-warning" | "btn-info" | "btn-ghost" | "btn-accent";
    label?: string;
    disabled?: boolean;
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
    disabled = false,
}) => {

    return (
        <button
            className={`btn ${btnType}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};