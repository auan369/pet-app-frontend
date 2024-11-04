import React, {useState} from 'react';
import './PetDashboard.css';
import './PlayConsole.css';

function PlayConsole({pet, setPet, setPetId, feedPet, playPet, cleanPoop, togglePlayScreen, feedScreen}) {
  //select button on screen using the console buttons
  const playOptions = ['⚽', '🎳', '🚶'];
  const [selectedplayIndex, setSelectedplayIndex] = useState(0);
  const onPlay = (play) => {
    if (play === '⚽') {
      feedPet(-10);
      playPet(20);
    } else if (play === '🎳'){
      feedPet(-5);
      playPet(10);
    } else if (play === '🚶') {
      feedPet(-10);
      playPet(30);
    } else{
      console.log('Invalid play option');
    }
  };

  // Move to the previous play item
  const handleUpPress = () => {
    setSelectedplayIndex((prevIndex) => 
      prevIndex === 0 ? playOptions.length - 1 : prevIndex - 1
    );
  };

  // Move to the next play item
  const handleDownPress = () => {
    setSelectedplayIndex((prevIndex) => 
      prevIndex === playOptions.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Feed the pet with the selected play
  const handleSelectPress = () => {
    const selectedplay = playOptions[selectedplayIndex];
    onPlay(selectedplay); // Trigger feeding action in parent
    togglePlayScreen(); // Close the feed screen
  };

  return (
    <div className="tamagotchi-console">
      <h1 className="console-header">Pet Dashboard</h1>
      <div className="console-screen">
        {/* {pet && pet.isAlive && !feedScreen && <Pet hunger={pet.hunger} health={pet.health} happiness={pet.happiness} poopCount={pet.poopCount} petType={pet.petType}/>} */}
        {pet && pet.isAlive && (
          <div className="play-container">
            <h2>Choose play</h2>
            <p className="play-display">{playOptions[selectedplayIndex]}</p>
            
          </div>
        )}
        {pet && !pet.isAlive && <h1>Pet died :/...</h1>}
        {!pet && <h1>Loading...</h1>}
      </div>
      <div className="console-buttons">
        <button onClick={handleUpPress}>🔼 <span>Up</span></button>
        <button onClick={handleDownPress}>🔽 <span>Down</span></button>
        <button onClick={handleSelectPress}>✅ <span>Select</span></button>
      </div>
    </div>
  );
}

export default PlayConsole;