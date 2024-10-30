import React from 'react';
import './IndicatorBar.css';

function IndicatorBar({ level, maxLevel = 10, icon }) {
  const icons = [];
  for (let i = 0; i < maxLevel; i++) {
    icons.push(<span key={i} className="indicator-icon">{i < level ? icon : '⚪️'}</span>);
  }

  return <div className="indicator-bar">{icons}</div>;
}

export default IndicatorBar;
