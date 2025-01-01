import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const BackLink: React.FC<ButtonProps> = ({ children, className = '', href = '#' }) => {
  return (
    <Link href={href} className={`${className}`}>
      {children}
    </Link>
  );
};

export default BackLink;