"use client";

import React from "react";

const BackLink = () => {
  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.history.back();
  };

  return (
    <a href="#" className="post-header-volver" onClick={handleBackClick}>
      <div className="icono"></div>
    </a>
  );
};

export default BackLink;