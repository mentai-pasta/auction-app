import Link from "next/link";
import React from "react";

interface ButtonProps {
    btnType?: "btn-primary" | "btn-secondary" | "btn-success" | "btn-neutral" | "btn-warning" | "btn-info" | "btn-ghost" | "btn-accent";
    asLink?: boolean;
    href?: string;
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
 *             <Button btnType='btn-warning' label="runcaaat" onClick={() => console.log('RunCat')} />
 *             <Button asLink href='#' label='これはLink継承のButtonコンポーネントです' btnType='btn-info' onClick={handleClick}/>
 *         </>
 *     );
 * }
 */
export const Button: React.FC<ButtonProps> = ({
    btnType = "primary",
    label = "Button",
    onClick,
    disabled = false,
    asLink = false,
    href = ''
}) => {
    if (asLink) {
        return (
            <Link 
                href={href}
                onClick={onClick}
                aria-disabled={disabled}
                className={`btn ${btnType}`}
            >
                {label}
            </Link>
        );
    }

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