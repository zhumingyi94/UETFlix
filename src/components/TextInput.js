import React from 'react';
import './TextInput.css';

function TextInput({ inputValue, onInputChange }) {
  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="TextInputContainer">
      <input
        type="text"
        className="TextInput"
        placeholder="Type the user_id you would like to get a recommend"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextInput;
