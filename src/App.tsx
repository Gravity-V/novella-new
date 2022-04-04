import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from './novella/questions.json'
import { LevelWalk } from './components/Level'

function App() {
  const [level, setLevel] = useState(0)
  return (
    <div className="App">

      <div className='top'>

      </div>

      <div className='box'>
        <LevelWalk question={questions[level]}
          callbackFinish={
            () => { level < questions.length - 1 && setLevel(level + 1) }
          }
          callbackCorrect={() => { }} />
      </div>

    </div>
  );
}

export default App;