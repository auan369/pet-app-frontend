import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pet from './Pet';
// import { set } from 'mongoose';

function PetDashboard() {
  const [pet, setPet] = useState(null);
  const [petId, setPetId] = useState(null);
  const [hunger, setHunger] = useState(0);
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(50);
  const [poopCount, setPoopCount] = useState(0);

  useEffect(() => {
    fetchPetData();

    // Set up interval to fetch pet data every 5 minutes (300000 ms)
    const interval = setInterval(() => {
      fetchPetData();
    }, 60000); // 1 minutes = 60000 ms

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);

  }, []);

  // useEffect((pet, updatePet) => {
  //   if (pet) updatePet();
  // }, [hunger, happiness, health]);

  const fetchPetData = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pets/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data[0];
      setPet(data);
      setPetId(data._id);  
      setHunger(data.hunger);
      setHealth(data.health);
      setHappiness(data.happiness);
      setPoopCount(data.poopCount);
      console.log("Pet data fetched successfully!");
    } catch (error) {
      alert('Failed to fetch pet data');
    }
  };

  const updatePet = async (hunger, happiness, health,poopCount) => {
    const token = localStorage.getItem('token');
    hunger = Math.max(0, hunger);
    happiness = Math.min(100, happiness);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/pets/${petId}`, {
        hunger:hunger,
        happiness:happiness, 
        health:health,
        poopCount:poopCount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Pet updated successfully!');
      setPet({...pet, hunger, happiness, health, poopCount});
    } catch (error) {
      alert('Failed to update pet');
    }
  };

  const feedPet = (feedAmount) => {
    const newHunger = Math.max(0, (hunger - feedAmount));
    setHunger(newHunger);
    updatePet(newHunger, happiness, health, poopCount);
  };

  const playPet = (playAmount) => {
    // Increase happiness by playAmount and update the pet
    const newHappiness = Math.min(100, (happiness + playAmount));
    setHappiness(newHappiness);
    updatePet(hunger, newHappiness, health, poopCount);
  };

  const cleanPoop = () => {
    // Reset poop count to 0 and update the pet
    setPoopCount(0);
    updatePet(hunger, happiness, health, 0);
  }

  return (
    <div>
      <h2>Pet Dashboard</h2>
      {pet ? pet.isAlive?(
        <div>
          <h3>{pet.petType}</h3>
          <Pet hunger= {pet.hunger} health={pet.health} happiness={pet.happiness} poopCount={pet.poopCount} />
          <p>Hunger: {pet.hunger}</p>
          <input
            type="number"
            placeholder="Hunger"
            value={hunger}
            onChange={(e) => setHunger(e.target.value)}
          />
          <p>Happiness: {pet.happiness}</p>
          <input
            type="number"
            placeholder="Happiness"
            value={happiness}
            onChange={(e) => setHappiness(e.target.value)}
          />
          <p>Health: {pet.health}</p>
          <input
            type="number"
            placeholder="Health"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
          />
          <p>Poop Count: {pet.poopCount}</p>

          <button onClick={() => updatePet(hunger, happiness, health)}>Update Pet</button>

          <button onClick={() => feedPet(10)}>Feed</button>
          <button onClick={() => playPet(10)}>Play</button>
          <button onClick={cleanPoop}>Clean Poop</button>
        </div>
      ): <p>Pet has died...</p> : (
        <p>Loading pet data...</p>
      )}
    </div>
  );
}

export default PetDashboard;
