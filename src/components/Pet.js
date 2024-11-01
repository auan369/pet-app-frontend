import React, { useState, useEffect } from 'react';
import pico from '../images/pico/pixil-layer-Layer 1.png';
import picoSad from '../images/pico/pixil-layer-Sad.png';
import picoHungry from '../images/pico/pixil-layer-hungry.png';
import picoHappy from '../images/pico/pixil-layer-Layer 2.png';
import minnie from '../images/minnie/minnie.png';
import minnieSad from '../images/minnie/minnie-sad.png';
import minnieHungry from '../images/minnie/minnie-hungry.png';
import minnieHappy from '../images/minnie/minnie-happy.png';
import yuri from '../images/yuri/yuri.png';
import yuriSad from '../images/yuri/yuri-sad.png';
import yuriHungry from '../images/yuri/yuri-hungry.png';
import yuriHappy from '../images/yuri/yuri-happy.png';
import IndicatorBar from './IndicatorBar';
import './Pet.css';

const petImages = { "pico": [pico, picoSad, picoHungry, picoHappy], "minnie": [minnie, minnieSad, minnieHungry, minnieHappy], "yuri": [yuri, yuriSad, yuriHungry, yuriHappy] }; 

function Pet(props) {
  // const [hunger, setHunger] = useState(50);
  // const [happiness, setHappiness] = useState(50);
  // const [emotion, setEmotion] = useState(pico);
  const [frameIndex, setFrameIndex] = useState(0);

  const getEmotion = () => {
    if (props.hunger >= 90) {return petImages[props.petType][2];}; //hunger icon
    if (props.happiness <= 10)  {return petImages[props.petType][1];}
    return petImages[props.petType][3];
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
        <img src={frameIndex? petImages[props.petType][0]: getEmotion()} className = "pico" alt="logo" />
      </div>
      <IndicatorBar level={props.poopCount} maxLevel={3} icon="💩" />
    </div>
  );
}

export default Pet;
