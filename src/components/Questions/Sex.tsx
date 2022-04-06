import { Button } from "@mui/material"
import { QuestionSex } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerSex } from "../AnswerType";

interface SexProps {
    question: QuestionSex
    callbackFinish?: (answer: AnswerSex) => void
    answer?: AnswerSex
    show?: boolean
}

export function Sex(props: SexProps) {
    return <>
        <p>{props.question.text}</p>
        <Button
            color={props.answer ? (props.answer.sex == 'male' ? 'secondary' : 'primary') : 'primary'}
            disabled={props.show}
            onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'male' }) }}
        >М</Button>
        <Button
            color={props.answer ? (props.answer.sex == 'female' ? 'secondary' : 'primary') : 'primary'}
            disabled={props.show}
            onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'female' }) }}
        >Ж</Button>
    </>
}