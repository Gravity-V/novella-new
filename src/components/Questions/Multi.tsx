import { useState } from "react";
import { QuestionMulti } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerMulti } from "../AnswerType";
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { Styles } from "../button-level/button.style";

interface MultiProps {
    question: QuestionMulti
    callbackFinish?: (answer: AnswerMulti) => void
    show?: boolean
    answer?: AnswerMulti
}

export function Multi(props: MultiProps) {
    const [comment, setComment] = useState<string[]>([])
    const [answer, setAnswer] = useState<AnswerMulti>()
    const [lock, setLock] = useState(true)
    const [check, setCheck] = useState(new Array(props.question.answers.length).fill(false))
    let correct: boolean[] = new Array(props.question.answers.length).fill(false)
    return <>
        <div className="text">{props.question.text}</div>
        <div className="Centers">
            <FormGroup>
                {props.question.answers.map(
                    (answer, i) => {
                        return <>
                            <FormControlLabel
                                disabled={props.show === undefined || props.show === false ? false : props.show}
                                key={answer.text}
                                control={
                                    <Checkbox defaultChecked={props.answer != undefined && props.answer.userAnswers.includes(answer.text)} />
                                }
                                onChange={() => {
                                    setCheck((old) => { old[i] = !old[i]; return old });
                                    console.log(check)
                                    setLock(false)
                                }}
                                label={answer.text}
                            />
                            {correct[i] = answer.isCorrect}
                        </>
                    }
                )}
            </FormGroup>
        </div>
        {
            answer === undefined && <Button
                disabled={props.show === undefined || props.show === false ? lock : props.show}
                onClick={() => {
                    let userAnswers: string[] = [];
                    let comments: string[] = [];
                    props.question.answers.map(
                        (answer, i) => {
                            check[i] && userAnswers.push(answer.text)
                            check[i] && answer.comment !== undefined && comments.push(answer.comment)
                        }
                    )
                    setComment((old) => [...old, ...comments])
                    setAnswer({ isCorrect: JSON.stringify(correct) == JSON.stringify(check), type: "multi", userAnswers: userAnswers })
                }}
            >Подтверрждаю</Button>
        }
        {
            answer && <Button
                onClick={
                    () => {
                        setAnswer(undefined)
                        setLock(true)
                        props.callbackFinish && props.callbackFinish(answer)
                    }
                }
            >
                Далее
            </Button>
        }
        <div>
            {(answer || props.show) && comment.map((com) => <Typography sx={Styles.Multi}>{com}</Typography>)}
        </div>
    </>
}