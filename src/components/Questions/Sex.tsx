import { Button } from "@mui/material"
import { QuestionSex } from "../../novella/novellaInterrface"
import React from 'react';
import { Answer } from "../Level";

interface SexProps {
    question: QuestionSex
    callbackFinish: (answer: Answer) => void
}

export function Sex(props: SexProps) {
    return <>
        <p>{props.question.text}</p>
        <Button
            onClick={() => { props.callbackFinish({ isCorrect: true, type: 'sex', usewAnswers: ['male'] }) }}
        >М</Button>
        <Button
            onClick={() => { props.callbackFinish({ isCorrect: true, type: 'sex', usewAnswers: ['female'] }) }}
        >Ж</Button>
    </>
}