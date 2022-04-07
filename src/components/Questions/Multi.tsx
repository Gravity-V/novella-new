import { useState } from "react";
import { QuestionMulti } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerMulti } from "../AnswerType";
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

interface MultiProps {
    question: QuestionMulti
    callbackFinish?: (answer: AnswerMulti) => void
    show?: boolean
    answer?: AnswerMulti
}

export function Multi(props: MultiProps) {
    const [comment, setComment] = useState<string[]>([''])
    const [answer, setAnswer] = useState<AnswerMulti>()
    const [lock, setLock] = useState(true)
    let correct: boolean[] = new Array(props.question.answers.length).fill(false)
    const [check, setCheck] = useState(new Array(props.question.answers.length).fill(false))
    return <>
        <div >{props.question.text} </div>
        <FormGroup>
            {props.question.answers.map(
                (answer, i) => {
                    return <> <FormControlLabel
                        disabled={
                            props.show === undefined || props.show === false ? false : props.show
                        }
                        key={answer.text}
                        control={<Checkbox />}
                        onChange={() => {
                            setCheck((old) => { old[i] = !old[i]; return old });
                            console.log(check)
                            setLock(false)
                        }} label={answer.text}
                    />
                        {correct[i] = answer.isCorrect}
                    </>
                }
            )}
        </FormGroup>
        {(answer || props.show) && <Typography>{comment}</Typography>}
        <Button
            disabled={
                props.show === undefined || props.show === false ? lock : props.show
            }
            onClick={() => {

                props.callbackFinish && props.callbackFinish({ isCorrect: JSON.stringify(correct) == JSON.stringify(check), type: "multi", userAnswers: ['1'] })
            }}
        >Подтверрждаю</Button>

    </>
}