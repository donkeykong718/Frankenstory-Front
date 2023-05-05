import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/side-bar/side-bar';
import Header from './components/Header/Header';
import Landing from './pages/Landing';
import Footer from './components/footer/footer'

export const StoryContext = React.createContext();
export const UserContext = React.createContext();

export const GameContext = React.createContext();


function App() {

  const defaultUser = {
    _id: 0, username: 'guest'
  }

  const [current, setCurrent] = useState({});
  const [user, setUser] = useState(defaultUser);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={
          <GameContext.Provider value={{ playing, setPlaying }}>
            <StoryContext.Provider value={{ current, setCurrent }}>
              <UserContext.Provider value={{ user, setUser }}>
                <div id='headerbox'>
                  <Header />
                </div>
                <Sidebar />
                <Landing />
                <div id='footer'>
                  <Footer />
                </div>
              </UserContext.Provider>
            </StoryContext.Provider>
          </GameContext.Provider>
        } />
      </Routes>
    </>
  );
}
export default App;
