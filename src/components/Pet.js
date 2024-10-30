import React, { useState, useEffect } from 'react';
import pico from '../images/pixil-layer-Layer 1.png';
import picoSad from '../images/pixil-layer-Sad.png';
import picoHungry from '../images/pixil-layer-hungry.png';
import picoHappy from '../images/pixil-layer-Layer 2.png';
import IndicatorBar from './IndicatorBar';
import './Pet.css';

function Pet(props) {
  // const [hunger, setHunger] = useState(50);
  // const [happiness, setHappiness] = useState(50);
  // const [emotion, setEmotion] = useState(pico);
  const [frameIndex, setFrameIndex] = useState(0);

  const getEmotion = () => {
    if (props.hunger >= 90) {return picoHungry;};
    if (props.happiness <= 10)  {return picoSad;}
    return picoHappy;
  };

  // Game loop - decrease happiness and increase hunger over time
  useEffect(() => {
    const interval = setInterval(() => {
      // setHunger(hunger => Math.min(100, hunger + 1));  // Hunger increases
      // setHappiness(happiness => Math.max(0, happiness - 1)); // Happiness decreases
      setFrameIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 300);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  

  // Handle feeding the Pet
  // const feedPet = () => {
  //   setHunger(hunger => Math.max(0, hunger - 10));
  // };

  // Handle playing with the Pet
  // const playPet = () => {
  //   setHappiness(happiness => Math.min(100, happiness + 10));
  // };

  // Render the pet's emotion based on hunger and happiness


  return (
    <div className='pet-container'>
      {/* <p>Hunger:</p> */}
      <IndicatorBar level={Math.round((100 - props.hunger)/20)} maxLevel={5} icon="🍔" />
      {/* <p>Happiness:</p> */}
      <IndicatorBar level={Math.round(props.happiness/20)} maxLevel={5} icon="😀" />
      <div>
        <img src={frameIndex? pico: getEmotion()} className = "pico" alt="logo" style={{height: "20vmin", pointerEvents: "none", imageRendering: "pixelated"}}/>
      </div>
      <IndicatorBar level={props.poopCount} maxLevel={3} icon="💩" />
    </div>
  );
}

export default Pet;
