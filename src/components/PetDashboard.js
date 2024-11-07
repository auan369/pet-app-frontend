import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "@fontsource/press-start-2p"; // Defaults to weight 400
// import "@fontsource/press-start-2p/400.css"; // Specify weight
// import "@fontsource/press-start-2p/400-italic.css"; // Specify weight and style
// import "@fontsource/press-start-2p/700.css"; // Specify weight
import './PetDashboard.css';
import PetConsole from './PetConsole';
import { useNavigate } from 'react-router-dom';
import FeedConsole from './FeedConsole';
import PlayConsole from './PlayConsole';
import MemoryGameConsole from './MemoryGameConsole';

function PetDashboard() {
  const [pet, setPet] = useState(null);
  const [petId, setPetId] = useState(null);
  const [hunger, setHunger] = useState(0);
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(50);
  const [poopCount, setPoopCount] = useState(0);
  const [feedScreen, setFeedScreen] = useState(false);
  const [playScreen, setPlayScreen] = useState(false);
  const [gameScreen, setGameScreen] = useState(false);
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

  const toggleFeedScreen = () => {
    setFeedScreen(!feedScreen);
  };

  const togglePlayScreen = () => {
    setPlayScreen(!playScreen);
  };

  const toggleGameScreen = () => {
    setGameScreen(!gameScreen);
  };

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

  // const handleScroll = (direction) => {
  //   if (!feedScreen){
  //     if (direction === 'up') {
  //       setFeedScreen(true);
  //     } else if (direction === 'down') {
  //       playPet(10); 
  //     } else {
  //       cleanPoop();
  //     }
  //   }

  // };

  return (
  <div>
    <input type="button" value="Logout" onClick={() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
    } } />
    {!feedScreen && !playScreen && !gameScreen && <PetConsole pet={pet} setPet={setPet} setPetId={setPetId} feedPet={feedPet} playPet={playPet} cleanPoop={cleanPoop} toggleFeedScreen={toggleFeedScreen} togglePlayScreen={togglePlayScreen} feedScreen={feedScreen} />}
    {feedScreen && <FeedConsole pet={pet} setPet={setPet} setPetId={setPetId} feedPet={feedPet} playPet={playPet} cleanPoop={cleanPoop} toggleFeedScreen={toggleFeedScreen} feedScreen={feedScreen} />}
    {playScreen && <PlayConsole pet={pet} setPet={setPet} setPetId={setPetId} feedPet={feedPet} playPet={playPet} cleanPoop={cleanPoop} togglePlayScreen={togglePlayScreen} toggleGameScreen={toggleGameScreen} feedScreen={feedScreen} />}
    {!playScreen && gameScreen && <MemoryGameConsole pet={pet} setPet={setPet} setPetId={setPetId} feedPet={feedPet} playPet={playPet} cleanPoop={cleanPoop} toggleGameScreen={toggleGameScreen} feedScreen={feedScreen} />}
    {/* {<h1>Error loading screen...</h1>} */}
  </div>
  );
}

export default PetDashboard;
