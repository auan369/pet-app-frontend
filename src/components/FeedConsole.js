import React from 'react';
import Pet from './Pet';
import Feed from './Feed';
import './PetDashboard.css';
function FeedConsole({pet, setPet, setPetId, feedPet, playPet, cleanPoop, toggleFeedScreen, feedScreen}) {
  return (
    <div className="tamagotchi-console">
      <h1 className="console-header">Pet Dashboard</h1>
      <div className="console-screen">
        {/* {pet && pet.isAlive && !feedScreen && <Pet hunger={pet.hunger} health={pet.health} happiness={pet.happiness} poopCount={pet.poopCount} petType={pet.petType}/>} */}
        {pet && pet.isAlive && feedScreen && <Feed toggleFeedScreen={toggleFeedScreen} feedPet={feedPet} playPet={playPet} />}
        {pet && !pet.isAlive && <h1>Pet died :/...</h1>}
        {!pet && <h1>Loading...</h1>}
      </div>
      <div className="console-buttons">
        <button onClick={() => { toggleFeedScreen(); } }>🍖 <span>Feed</span></button>
        <button onClick={() => { playPet(10); } }>🎾 <span>Play</span></button>
        <button onClick={cleanPoop}>🧼 <span>Clean</span></button>
      </div>
    </div>
  );
}

export default FeedConsole;