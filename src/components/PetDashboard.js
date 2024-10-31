import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pet from './Pet';
import './PetDashboard.css';
//import routes
import { useNavigate } from 'react-router-dom';

function PetDashboard() {
  const [pet, setPet] = useState(null);
  const [petId, setPetId] = useState(null);
  const [hunger, setHunger] = useState(0);
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(50);
  const [poopCount, setPoopCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPetData();

    // Set up interval to fetch pet data every 5 minutes (300000 ms)
    const interval = setInterval(() => {
      fetchPetData();
    }, 30000); // 0.5 minutes = 30000 ms

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
      // console.log('Failed to fetch pet data', error.response.status);
      alert('Failed to fetch pet data');
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
      }
      
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
    <input type="button" value="Logout" onClick={() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
    } } />
    <div className="tamagotchi-console">
      <h1 className="console-header">Pet Dashboard</h1>
      <div className="console-screen">
        {pet ? (
          <Pet hunger={pet.hunger} health={pet.health} happiness={pet.happiness} poopCount={pet.poopCount} />
        ) : ( <h1>Loading...</h1> )}  
      </div>
      <div className="console-buttons">
        <button onClick={() => { feedPet(10); } }>🍖 Feed</button>
        <button onClick={() => { playPet(10); } }>🎾 Play</button>
        <button onClick={cleanPoop}>🧼 Clean</button>
      </div>
    </div>
  </div>
  );
}

export default PetDashboard;
