import { Button, ThemeProvider, Typography } from "@mui/material"
import { QuestionStandart } from "../../novella/novellaInterrface"
import React, { useState } from 'react';
import { AnswerStandart } from "../AnswerType";
import { Styles, getTheme } from "../button-level/button.style";
import './Style.css';

interface StandartProps {
    question: QuestionStandart
    callbackFinish?: (answer: AnswerStandart) => void
    answer?: AnswerStandart
    show?: boolean
}

export function Standart(props: StandartProps) {
    const [comment, setComment] = useState<string>('')
    const [answer, setAnswer] = useState<AnswerStandart | undefined>(undefined)
    const [lock, setLock] = useState<boolean>(false)
    const [clic, setClic] = useState<number>()
    return <>
        <div className="box" style={{ backgroundImage: `url(${props.question.background})` }}>
            <div className="Standart">
                <div className="answer">
                    {props.question.answers.map(
                        (answer, i) => <ThemeProvider
                            theme={getTheme(props.answer ? props.answer.isCorrect : answer.isCorrect, clic != undefined ? clic == i : (props.answer != undefined ? (props.answer.userAnswer == answer.text) : false))}>
                            <Button sx={Styles.Standart}
                                variant="outlined"
                                disabled={props.show === undefined || props.show === false ? lock : props.show}
                                color={props.answer ? (props.answer.userAnswer == answer.text ? 'secondary' : 'primary') : 'primary'}
                                key={i}
                                onClick={() => {
                                    if (answer.comment) {
                                        setLock(true)
                                        setComment(answer.comment)
                                        setAnswer({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text, comment: answer.comment })

                                    } else {
                                        props.callbackFinish && props.callbackFinish({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text, comment: '' })
                                    }
                                    setClic(i)
                                }}
                            >{answer.text}</Button>
                        </ThemeProvider>
                    )}
                    {answer && <Button variant="contained"
                        onClick={() => {
                            setLock(false)
                            props.callbackFinish && props.callbackFinish(answer)
                            setAnswer(undefined)
                        }}>Далее
                    </Button>}
                </div>
            </div>

            <div className="question">
                {!(answer || props.show) && props.question.text}
                {(answer || props.show) && <Typography sx={Styles.TextComment}>
                    {answer ? comment : props.show && props.answer ? props.answer.comment : ''}
                </Typography>}
            </div>
        </div>
    </>
}