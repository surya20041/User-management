import React from 'react';

const Button = ({ name, size, className, onclick }) => (
    <button
        type="button"
        className={`btn ${size} ${className}`}
        onClick={onclick}
    >
        {name}
    </button>
);

export default Button;
