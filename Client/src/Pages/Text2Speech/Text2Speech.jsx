import React, { useState } from 'react';
import './Text2Speech.css';

export default function MyForm() {
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleReadClick = () => {
    console.log('Reading text:', text);
  };

  const handleDownloadClick = () => {
    console.log('Downloading text:', text);
  };

  return (
    <div className="my-form">
      <textarea
        id="bigInput"
        value={text}
        onChange={handleInputChange}
        rows={5}
        cols={40}
        placeholder="Введите ваш текст здесь"
      />
      <select name="options" id="options" onChange={handleInputChange}>
        <option value="1">Hello</option>
        <option value="2">Hello2</option>
      </select>
      <button onClick={handleReadClick}>Read</button>
      <button onClick={handleDownloadClick}>Download</button>
    </div>
  );
}
