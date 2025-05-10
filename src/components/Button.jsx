import React from "react";

const Button = ({ text, variant, className, submit, isLoading=false }) => {
    return (
        <button
            disabled={isLoading}
            onClick={submit}
            className={`btn btn-xs sm:btn-sm md:btn-md relative ${variant} ${className}`}
        >
            {text}
            {isLoading && <span className="loading loading-spinner loading-sm absolute right-8"></span>}
        </button>
    );
};

export default Button;
