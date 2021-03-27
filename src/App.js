import React from 'react';
import Header from './components/Header';
import Playlists from "./components/Playlists";

function App() {
  return (
    <div className="playlist-app container">
      <Header />
      <Playlists />
    </div>
  );
}

export default App;
