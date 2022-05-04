import React, { useState } from 'react';
import './App.css';
import questions from './novella/questions.json'
import { Level } from './components/Level'
import { ButtonLevel } from './components/button-level/button'
import { Answer } from './components/AnswerType';
import { Container } from '@mui/material';
import { Styles } from './components/button-level/button.style';
import { Dnd } from './components/TestDND';

// подтягивает стили из style без импорта
function App() {
  const [level, setLevel] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([]);

  return (
    <div className="App">
      <div className='middle'>
      <Container sx={Styles.ProgressBar} maxWidth='lg'>
        <div className='top'>
          <ButtonLevel answers={answers} totalLevel={questions.length}
            callbackShowLevel={(level) => {
              setLevel(level)
            }}
          />
        </div>
      </Container>
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
    </div>
  );
}

export default App;