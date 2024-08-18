import React from "react";

const InputBox = ({ labelFor, type, value, onchange }) => {
  return (
    <div className="form-group">
      <label htmlFor={labelFor}>{labelFor}</label>
      <input
        type={type}
        className="form-control"
        id={labelFor}
        value={value}
        onChange={onchange}
      />
    </div>
  );
};

export default InputBox;
