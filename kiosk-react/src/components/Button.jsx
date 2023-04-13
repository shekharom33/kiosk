import React from "react";

const Button = ({ className, onClick, disabled, type, children }) => {
  if (disabled) {
    return (
      <button
        className={`bg-blue-500 cursor-not-allowed text-white font-bold py-2 px-4 rounded ${className}`}
        onClick={onClick}
        disabled={true}
        type={type}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
