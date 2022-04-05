import { Button } from "@mui/material"
import { QuestionSex } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerSex } from "../AnswerType";

interface SexProps {
    question: QuestionSex
    callbackFinish?: (answer: AnswerSex) => void
    show?: boolean
}

export function Sex(props: SexProps) {
    return <>
        <p>{props.question.text}</p>
        <Button
            disabled={props.show}
            onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'male' }) }}
        >М</Button>
        <Button
            disabled={props.show}
            onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'female' }) }}
        >Ж</Button>
    </>
}