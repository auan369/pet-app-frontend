import React from 'react';
import './Feed.css';

function Feed({toggleFeedScreen, feedPet, playPet}) {

  return (
    <div className='feed-container'>
      {/* <h1>Feed</h1> */}
      <button onClick={() => {feedPet(20); toggleFeedScreen();}}>🍙</button>
      <button onClick={() => {feedPet(20); playPet(10); toggleFeedScreen();}}>🍔</button>
      <button onClick={() => {feedPet(10); playPet(15); toggleFeedScreen();}}>🍭</button>
    </div>
  );
}

export default Feed;
