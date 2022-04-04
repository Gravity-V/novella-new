import { Button, TextField } from "@mui/material"
import { QuestionName } from "../../novella/novellaInterrface"
import React from 'react';
import { Answer } from "../Level";

interface NameProps {
    question: QuestionName
    callbackFinish: (answer: Answer) => void
}

export function Name(props: NameProps) {
    let name = ''

    return <>
        <p>{props.question.text}</p>
        <img src={props.question.background} />
        <TextField id="standard-basic" label="Standard" variant="standard" aria-placeholder="Имя" onChange={(textField) => name = textField.target.value} />
        <Button
            onClick={() => props.callbackFinish({ type: 'name', isCorrect: true, usewAnswers: [name] })}
        >Подтверрждаю</Button>
    </>
}