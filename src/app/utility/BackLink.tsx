"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const BackLink: React.FC<ButtonProps> = ({ children, className = '' }) => {
  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.history.back();
  };

  return (
    <a href="#" className={`${className}`} onClick={handleBackClick}>
      {children}
    </a>
  );
};

export default BackLink;