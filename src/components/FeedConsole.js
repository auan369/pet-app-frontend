import React, {useState} from 'react';
import './PetDashboard.css';
import './FeedConsole.css';

function FeedConsole({pet, setPet, setPetId, feedPet, playPet, cleanPoop, toggleFeedScreen, feedScreen}) {
  //select button on screen using the console buttons
  const foodOptions = ['🍙', '🍔', '🍭'];
  const [selectedFoodIndex, setSelectedFoodIndex] = useState(0);
  const onFeed = (food) => {
    if (food === '🍙') {
      feedPet(20);
    } else if (food === '🍔'){
      feedPet(20);
      playPet(10);
    } else if (food === '🍭') {
      feedPet(10);
      playPet(15);
    } else{
      console.log('Invalid food option');
    }
  };

  // Move to the previous food item
  const handleUpPress = () => {
    setSelectedFoodIndex((prevIndex) => 
      prevIndex === 0 ? foodOptions.length - 1 : prevIndex - 1
    );
  };

  // Move to the next food item
  const handleDownPress = () => {
    setSelectedFoodIndex((prevIndex) => 
      prevIndex === foodOptions.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Feed the pet with the selected food
  const handleSelectPress = () => {
    const selectedFood = foodOptions[selectedFoodIndex];
    onFeed(selectedFood); // Trigger feeding action in parent
    toggleFeedScreen(); // Close the feed screen
  };

  return (
    <div className="tamagotchi-console">
      <h1 className="console-header">Pet Dashboard</h1>
      <div className="console-screen">
        {/* {pet && pet.isAlive && !feedScreen && <Pet hunger={pet.hunger} health={pet.health} happiness={pet.happiness} poopCount={pet.poopCount} petType={pet.petType}/>} */}
        {pet && pet.isAlive && (
          <div className="feed-container">
            <h2>Choose Food</h2>
            <p className="food-display">{foodOptions[selectedFoodIndex]}</p>
            
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

export default FeedConsole;