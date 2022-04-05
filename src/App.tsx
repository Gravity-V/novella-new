import React, { useState } from 'react';
import './App.css';
import questions from './novella/questions.json'
import { Level } from './components/Level'
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
        {answers[level] && <Level answer={answers[level]} question={questions[level]} show={true} />}
        {
          !answers[level] && <Level question={questions[level]}
            callbackFinish={
              (answer) => {
                setAnswers((old) => [...old, answer])

                level < questions.length - 1 && setLevel(level + 1)
              }
            }
            show={false}
          />
        }
      </div>
    </div>
  );
}

export default App;