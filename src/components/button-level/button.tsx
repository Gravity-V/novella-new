import { Button, ButtonGroup } from "@mui/material"
import { buttonStyles } from "./button.style"
import { Answer } from "../Level"
import React from 'react';


interface ButtonLevelProps {
  totalLevel: number
  answers: Answer[]
  callbackShowLevel: (level: number) => void
}

export function ButtonLevel(props: ButtonLevelProps) {
  return <ButtonGroup variant="contained" >
    {
      () => {

        for (let i = 0; i < props.totalLevel; i++) {
          <Button>{i}</Button>
        }
      }
    }
  </ButtonGroup>
}