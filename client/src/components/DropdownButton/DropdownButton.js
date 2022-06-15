import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: "13px",
    padding: "5px",
    marginBottom: "15px",
    background: "#e0e0e0",
    border: "none",
    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"
  }),
  option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
    ...provided,
    fontSize: "13px",
    backgroundColor: isFocused ? '#e0e0e0' : "white",
    color: isFocused ? 'black' : "black",
  }),
};

function DropdownButton({ onChange, options, value, className }) {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div>
      <Select
        styles={customStyles}
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
      />
    </div>
  );
}

export default DropdownButton;
