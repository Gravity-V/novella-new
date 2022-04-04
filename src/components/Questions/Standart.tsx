import { Button } from "@mui/material"
import { QuestionStandart } from "../../novella/novellaInterrface"
import React from 'react';

interface StandartProps {
    question: QuestionStandart
    callbackFinish: (userAnswers: string[]) => void
    callbackCorrect: (isCorrect: boolean) => void
}

export function Standart(props: StandartProps) {
    return <>
        <p>{props.question.text}</p>
        <img src={props.question.background} />
        {props.question.answers.map(
            (answer) => <Button
                onClick={() => {
                    props.callbackFinish([answer.text])
                    props.callbackCorrect(answer.isCorrect)
                }
                }
            >{answer.text}</Button>
        )}
    </>
}