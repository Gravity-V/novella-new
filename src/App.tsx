import React, { createContext, useCallback, useEffect, useState } from 'react';
import './App.css';
import questions from './novella/questions.json'
import { Level } from './components/Level'
import { ButtonLevel } from './components/button-level/button'
import { Answer } from './components/AnswerType';
import { Container, Button, createTheme, ThemeProvider } from '@mui/material';
import { Styles } from './components/button-level/button.style';
import { Dnd } from './components/TestDND';

import { Context } from "./components/Questions/context";
import { truncate } from 'fs';
import { fontSize } from '@mui/system';

// interface IContext {
//   setBackground: Function
// }

// export const Context = createContext<IContext | null>(null)

// export const getTheme = () => {
//   const theme = createTheme({
//     components: {
//      MuiButton: {
//        styleOverrides: {
//          contained: {
//            backgroundColor:'red',
//           '&:hover': {
//             backgroundColor: 'rgba(0,0,0)'
//           },
//          },
//        },
//      },
//     },
//   });
//   return theme
// }



// подтягивает стили из style без импорта
function App() {
  const [level, setLevel] = useState(-1)
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [background, setBackground] = useState<string>('/background/interested.png');



  return level >= 0 ? ( //почему именно так?
    <Context.Provider value={{ setBackground }}>
      <div className="App">
        <div className='middle' style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center" }} >
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
  ) : (
    <div className='FirstPage'>
      <div style={{fontSize: '30px'}}> Для более удобного просмотра теста рекомендуется проходить в полноэкранном режиме (F11)</div>
      <Button
        variant='contained'
        sx={Styles.First}
        onClick={() => { setLevel((old) => old + 1) }}
      >
        Начать
      </Button>
    </div>)

}

export default App;