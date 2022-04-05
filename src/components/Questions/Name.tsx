import { Button, TextField } from "@mui/material"
import { QuestionName } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerName } from "../AnswerType";

interface NameProps {
    question: QuestionName
    callbackFinish?: (answer: AnswerName) => void
    show?: boolean
    answer?: AnswerName
}

export function Name(props: NameProps) {
    let name = ''

    return <>
        <p>{props.question.text}</p>
        <img src={props.question.background} />
        <TextField
            id="standard-basic"
            label="Standard"
            variant="standard"
            aria-placeholder="Имя"
            value={props.answer && props.answer.name}
            onChange={(textField) => name = textField.target.value}
            disabled={props.show}
        />
        <Button
            onClick={() => props.callbackFinish && props.callbackFinish({ type: 'name', isCorrect: true, name: name })}
            disabled={props.show}
        >Подтверрждаю</Button>
    </>
}