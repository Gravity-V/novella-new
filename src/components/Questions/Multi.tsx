import { useState } from "react";
import { QuestionMulti } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerMulti } from "../AnswerType";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface MultiProps {
    question: QuestionMulti
    callbackFinish?: (answer: AnswerMulti) => void
}

export function Multi(props: MultiProps) {
    let correct: boolean[] = new Array(props.question.answers.length).fill(false)
    const [lock, setLock] = useState(true)
    const [check, setCheck] = useState(new Array(props.question.answers.length).fill(false))
    return <>
        <FormGroup>
            {props.question.answers.map(
                (answer, i) => {
                    return <> <FormControlLabel key={answer.text} control={<Checkbox />} onChange={() => {
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
        <Button disabled={lock} onClick={() => {
            setLock(false)/* */
            // props.callbackFinish && props.callbackFinish({ isCorrect: JSON.stringify(correct) == JSON.stringify(check), type: "multi", userAnswer: answer.text })
        }}
        >Подтверрждаю</Button>

    </>
}