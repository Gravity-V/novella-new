import { Button } from "@mui/material"
import { QuestionStandart } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerStandart } from "../AnswerType";

interface StandartProps {
    question: QuestionStandart
    callbackFinish: (answer: AnswerStandart) => void
}

export function Standart(props: StandartProps) {
    return <>
        <p>{props.question.text}</p>
        <img src={props.question.background} />
        {props.question.answers.map(
            (answer, i) => <Button
                key={i}
                onClick={() => {
                    props.callbackFinish({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text })
                }
                }
            >{answer.text}</Button>
        )}
    </>
}