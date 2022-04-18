import React, { useState } from 'react';
import './App.css';
import questions from './novella/questions.json'
import { Level } from './components/Level'
import { ButtonLevel } from './components/button-level/button'
import { Answer } from './components/AnswerType';

// подтягивает стили из style без импорта
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

      {answers[level] && <Level answer={answers[level]} question={questions[level]} show={true} />}
      {
        !answers[level] && <Level question={questions[level]}
          callbackFinish={
            (answer) => {

              setAnswers((old) => [...old, answer])
              console.log(answers)
              if (level < questions.length - 1)
                setLevel(level + 1)
              else {

              }
            }
          }
          show={false}
        />
      }

    </div>
  );
}

export default App;