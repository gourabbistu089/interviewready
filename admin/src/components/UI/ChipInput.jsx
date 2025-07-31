import React, { useState } from 'react';

const ChipInput = () => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = inputValue.trim();
      if (value && !chips.includes(value)) {
        setChips([...chips, value]);
        setInputValue('');
      }
    }
    if (e.key === 'Backspace' && inputValue === '' && chips.length) {
      e.preventDefault();
      removeChip(chips.length - 1);
    }
  };

  const removeChip = (index) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap border p-2 rounded">
      {chips.map((chip, index) => (
        <div
          key={index}
          className="flex items-center px-2 py-1 m-1 bg-blue-200 rounded-full"
        >
          <span>{chip}</span>
          <button
            className="ml-2 text-blue-800"
            onClick={() => removeChip(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        className="flex-grow p-1 outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
      />
    </div>
  );
};

export default ChipInput;
