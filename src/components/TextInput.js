import React from 'react';
import './TextInput.css';

function TextInput({inputValue, onInputChange}) {
    const handleChange = (e) => {
        onInputChange(e.target.value);
    };

    return (
        <div className="TextInputContainer">
            <input type="text" class="TextInput" placeholder="Type the genre you like" value={inputValue} onChange={handleChange}></input>
        </div>
    );
}

export default TextInput;