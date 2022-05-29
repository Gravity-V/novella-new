import React, { createContext, useCallback, useState } from 'react';
import './App.css';
import questions from './novella/questions.json'
import { Level } from './components/Level'
import { ButtonLevel } from './components/button-level/button'
import { Answer } from './components/AnswerType';
import { Container } from '@mui/material';
import { Styles } from './components/button-level/button.style';
import { Dnd } from './components/TestDND';

import { Context } from "./components/Questions/context";
import { truncate } from 'fs';
// interface IContext {
//   setBackground: Function
// }

// export const Context = createContext<IContext | null>(null)

// подтягивает стили из style без импорта
function App() {
  const [level, setLevel] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [background, setBackground] = useState<string>('/background/interested.png');

  return ( //почему именно так?
    <Context.Provider value={{ setBackground }}>
      <div className="App">
        <div className='middle' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: "100%" }} >
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
            !answers[level] && <Level question={questions[level]} AnswerFinish={answers}
              callbackFinish={
                (answer) => {
                  setAnswers((old) => [...old, answer])

                  //
                  if (level < questions.length - 1)
                    setLevel(level + 1)
                  else {
                    //setFinish(true);
                    //setLevel(level + 1);
                  }
                  //
                }
              }
              show={false}
            />
          }
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;