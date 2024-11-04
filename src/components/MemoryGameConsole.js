import React, {useState, useEffect} from 'react';
import './PetDashboard.css';
import './MemoryGameConsole.css';

const createRandomAnswer = (number) => {
  let answer = [];
  for (let i = 0; i < number; i++) {
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
      answer.push('🔼');
    } else {
      answer.push('🔽');
    }
  }
  return answer
}

var answerGenerated = createRandomAnswer(2);

function MemoryGameConsole({pet, setPet, setPetId, feedPet, playPet, cleanPoop, togglePlayScreen, feedScreen, toggleGameScreen}) {
  const [answerArray, setAnswerArray] = useState([]);
  const [displaySymbol, setDisplaySymbol] = useState(null);
  const [showingSequence, setShowingSequence] = useState(false);

  useEffect(() => {
    var i = 1;
    const interval = setInterval(() => {
      if (i <= answerGenerated.length) {
        console.log(answerGenerated.slice(0,i));
        setDisplaySymbol(answerGenerated.slice(0,i));
        // console.log(typeof answerGenerated[0,i]);
        i++;
      } else {
        clearInterval(interval);
        setDisplaySymbol(null);
      }
    }, 1000);
  }, [answerGenerated]);
  
  const handleUpPress = () => {
    if (answerArray.length >= answerGenerated.length) {
      setAnswerArray(['🔼']);
    } else{
      setAnswerArray([...answerArray, '🔼']);
    }
  };

  // Move to the next play item
  const handleDownPress = () => {
    if (answerArray.length >= answerGenerated.length) {
      setAnswerArray(['🔽']);
    } else{
    setAnswerArray([...answerArray, '🔽']);
    };
  };

  // Feed the pet with the selected play
  const handleSelectPress = () => {
    if (answerArray.length === answerGenerated.length) {
      if (answerArray.toString() === answerGenerated.toString()) {
        console.log('Correct');
        setAnswerArray([]);
        if (answerGenerated.length === 5) {
          playPet(60);
          toggleGameScreen(); // Close the feed screen
        } else {
          answerGenerated = createRandomAnswer(answerGenerated.length + 1);
        }
      } else {
        console.log('Incorrect');
        setAnswerArray([]);
        playPet((answerGenerated.length+1) * 10);
        toggleGameScreen(); // Close the feed screen
        // answerGenerated = createRandomAnswer(answerGenerated.length);
      }
      setShowingSequence(true); // Start showing the new sequence
    } else {
      setAnswerArray([]);
    }
  };
  
  return (
    <div className="tamagotchi-console">
      <h1 className="console-header">Memory Game</h1>
      <div className="console-screen">
          {displaySymbol? (<p className='display'>{displaySymbol.map((answer, index) => answer)}</p>) : null}

          {/* <p>{answerGenerated.map((answer, index) => answer)}</p> */}
        
          <p className='display'>
            {answerArray.map((answer, index) => answer)}
          </p>
        
      </div>
      <div className="console-buttons">
        <button onClick={handleUpPress}>🔼 <span>Up</span></button>
        <button onClick={handleDownPress}>🔽 <span>Down</span></button>
        <button onClick={handleSelectPress}>✅ <span>Select</span></button>
      </div>
    </div>
  );
}

export default MemoryGameConsole;