import React from 'react';
import Pet from './Pet';
import './PetDashboard.css';
function PetConsole({pet, setPet, setPetId, feedPet, playPet, cleanPoop, toggleFeedScreen, feedScreen}) {
  return (
    <div className="tamagotchi-console">
      <h1 className="console-header">Pet Dashboard</h1>
      <div className="console-screen">
        {pet && pet.isAlive && <Pet hunger={pet.hunger} health={pet.health} happiness={pet.happiness} poopCount={pet.poopCount} petType={pet.petType}/>}
        {pet && !pet.isAlive && <h1>Pet died :/...</h1>}
        {!pet && <h1>Loading...</h1>}
      </div>
      <div className="console-buttons">
        <button onClick={() => { toggleFeedScreen(); } }>🍖 <span>Feed</span></button>
        <button onClick={() => { playPet(10); } }>🎾 <span>Play</span></button>
        <button onClick={cleanPoop}>🧼 <span>Clean</span></button>
      </div>      
      {/* <ConsoleButtons onSelect={handleScroll} /> */}
    </div>
  );
}

export default PetConsole;