import { Button } from "@mui/material"
import { QuestionStandart } from "../../novella/novellaInterrface"
import React from 'react';
import { Answer } from "../Level";

interface StandartProps {
    question: QuestionStandart
    callbackFinish: (answer: Answer) => void
}

export function Standart(props: StandartProps) {
    return <>
        <p>{props.question.text}</p>
        <img src={props.question.background} />
        {props.question.answers.map(
            (answer) => <Button
                onClick={() => {
                    props.callbackFinish({ isCorrect: answer.isCorrect, type: "standart", usewAnswers: [answer.text] })
                }
                }
            >{answer.text}</Button>
        )}
    </>
}