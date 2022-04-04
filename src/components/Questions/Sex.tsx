import { Button } from "@mui/material"
import { QuestionSex } from "../../novella/novellaInterrface"
import React from 'react';

interface SexProps {
    question: QuestionSex
    callbackFinish: (userAnswers: string[]) => void
}

export function Sex(props: SexProps) {
    return <>
        <p>{props.question.text}</p>
        <Button
            onClick={() => { props.callbackFinish(["male"]) }}
        >М</Button>
        <Button
            onClick={() => { props.callbackFinish(["female"]) }}
        >Ж</Button>
    </>
}