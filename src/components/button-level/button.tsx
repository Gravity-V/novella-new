import { Button, ButtonGroup } from "@mui/material";
import { Styles } from "./button.style";
import React from 'react';
import { Answer } from "../AnswerType";

interface ButtonLevelProps {
  totalLevel: number
  answers: Answer[]
  callbackShowLevel: (level: number) => void
}

export function ButtonLevel(props: ButtonLevelProps) {
  console.log()
  const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
  }
  return <ButtonGroup variant="contained">
    {
      range(0, props.totalLevel).map(
        (i) => {
          const disable = i > props.answers.length ? true : false;

          const color = props.answers[i] ? (props.answers[i].isCorrect ? 'success' : 'error') : 'primary';

          return <Button sx={Styles.Text} onClick={() => { props.callbackShowLevel(i) }} key={i} color={color} disabled={disable}>{i + 1}</Button>
        }
      )
    }
  </ButtonGroup >
}