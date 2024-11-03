import React from 'react';
import './ConsoleButtons.css';

function ConsoleButtons({ onScroll, onSelect }) {
  return (
    <div className="console-container">
        <button onClick={() => onSelect('up')} className="console-button">A</button>
        <button onClick={() => onSelect('down')} className="console-button">B</button>
        <button onClick={() => onSelect('select')} className="console-button">C</button>
    </div>
  );
}

export default ConsoleButtons;
