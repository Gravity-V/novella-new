import React, { createContext, useCallback, useEffect, useState } from 'react';
import './App.css';
import questions from './novella/questions.json'
import { Level } from './components/Level'
import { Introduction } from './components/Introduction'
import { ButtonLevel } from './components/button-level/button'
import { Answer } from './components/AnswerType';
import { Container, Button, createTheme, ThemeProvider } from '@mui/material';
import { Styles } from './components/button-level/button.style';
import { Dnd } from './components/TestDND';

import { Context } from "./components/Questions/context";
import { truncate } from 'fs';
import { fontSize } from '@mui/system';



// подтягивает стили из style без импорта
function App() {
  const [level, setLevel] = useState(-1)
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [backgroundFile, setBackgroundFile] = useState<string>('backgroundGirl');
  const [background, setBackground] = useState<string>('interested.png');



  return level >= 0 ? ( //почему именно так?
    <Context.Provider value={{ setBackground }}>
      <div className="App" style={{ backgroundImage: `url(/${backgroundFile}/${background})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center" }} >

        <Container sx={Styles.ProgressBar} maxWidth='lg'>
          <div className='top'>
            <ButtonLevel answers={answers} totalLevel={questions.length}
              callbackShowLevel={(level) => {
                setLevel(level)
              }}
            />
          </div>
        </Container>
        <div style={{ flexGrow: '1' }}>
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
  ) : (<Introduction
    callbackFinish={() => { setLevel(level + 1) }}
    callbackSex={(e) => {
      e ? (
        setBackgroundFile("backgroundGirl")
      ) : (
        setBackgroundFile("backgroundMan")
      )
    }}
  />)



}

export default App;