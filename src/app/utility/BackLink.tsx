'use client';

import React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const BackLink: React.FC<ButtonProps> = ({ children, className = '', href }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <a href={href || '#'} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default BackLink;