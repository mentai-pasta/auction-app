import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className: string;
}

export const Card = ({ children, className }: Readonly<CardProps>) => {
  return (
    <div className={`card bg-base-100 shadow-xl ${className ?? ''}`}>
      <div className="card-body flex flex-col gap-5">{children}</div>
    </div>
  );
};
