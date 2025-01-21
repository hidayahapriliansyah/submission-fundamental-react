import React, { useState } from 'react';

function Navbar({ onInputSearch }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
    onInputSearch(e.target.value);
  };

  const handleClick = (e) => {
    setInput('');
    onInputSearch('');
  };

  return (
    <div className='note-app__header'>
      <h1>Catata Catat</h1>
      <div className='note-search'>
        <input
          type='text'
          placeholder='Cari catata ...'
          value={input}
          onChange={handleChange}
        />
        <button className='note-search_clear' title='Hapus cari' onClick={handleClick}>✖</button>
      </div>
    </div>
  );
}

export default Navbar;
