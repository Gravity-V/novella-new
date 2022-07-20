import { Button, ButtonGroup } from "@mui/material";
import { Styles } from "./button.style";
import React, { useContext } from 'react';
import { Answer } from "../AnswerType";
import { Context } from "../Questions/context";

interface ButtonLevelProps {
  totalLevel: number
  answers: Answer[]
  callbackShowLevel: (level: number) => void
}

export function ButtonLevel(props: ButtonLevelProps) {
  const context = useContext(Context)//
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

          return <Button sx={Styles.Text} onClick={() => {
            console.log(props.answers[i])

            if (props.answers[i] != undefined) {
              context && (props.answers[i].isCorrect ?
                context.setBackground("smile.png") :
                context.setBackground("discontent.png")
              )
            } else { context && context.setBackground("interested.png") }

            props.callbackShowLevel(i)
          }} key={i} color={color} disabled={disable}>{i + 1}</Button>
        }
      )
    }
  </ButtonGroup >
}