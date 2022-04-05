import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import questions from './novella/questions.json'
import { LevelShow, LevelWalk } from './components/Level'
import { ButtonLevel } from './components/button-level/button'
import { Answer } from './components/AnswerType';

function App() {
  const [level, setLevel] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([]);

  return (
    <div className="App">
      <div className='top'>
        <ButtonLevel answers={answers} totalLevel={questions.length}
          callbackShowLevel={(level) => {
            setLevel(level)
          }}
        />
      </div>

      <div className='box'>
        {answers[level] && <LevelShow answer={answers[level]} question={questions[level]} />}
        {
          !answers[level] && <LevelWalk question={questions[level]}
            callbackFinish={
              (answer) => {
                setAnswers((old) => [...old, answer])

                level < questions.length - 1 && setLevel(level + 1)

              }
            }
          />
        }
      </div>
    </div>
  );
}

export default App;