import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from './novella/questions_only_standart.json'
import {LevelWalk} from './components/Level'

function App() {
  const [level, setLevel] = useState(0)
  return (
    <div className="App">
      <LevelWalk question={questions[level]} 
      callbackFinish={
        () => {level < questions.length-1 && setLevel(level+1)}
      } 
      callbackCorrect={()=>{}} />
    </div>
  );
}

export default App;