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
    const [answer, setAnswer] = useState<AnswerStandart>()
    const [lock, setLock] = useState<boolean>(false)
    return <>
        <div className="box" style={{ backgroundImage: `url(${props.question.background})` }}>
            <div className="Standart">
                <div className="answer">
                    {props.question.answers.map(
                        (answer, i) => <ThemeProvider theme={getTheme(answer.isCorrect)}><Button sx={Styles.Standart}
                            variant="outlined"
                            disabled={props.show === undefined || props.show === false ? lock : props.show}
                            color={props.answer ? (props.answer.userAnswer == answer.text ? 'secondary' : 'primary') : 'primary'}
                            key={i}
                            onClick={() => {
                                if (answer.comment) {
                                    setLock(true)
                                    setAnswer({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text })
                                    setComment(answer.comment)
                                } else {
                                    props.callbackFinish && props.callbackFinish({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text })
                                }
                            }}
                        >{answer.text}</Button></ThemeProvider>
                    )}
                    {answer && <Button variant="contained"
                        onClick={() => {
                            setLock(false)/* */
                            props.callbackFinish && props.callbackFinish(answer)
                            setAnswer(undefined)/* */
                        }}
                    >
                        Далее
                    </Button>}
                </div>
            </div>

            <div className="question">
                {!(answer || props.show) && props.question.text}
                {(answer || props.show) && <Typography sx={Styles.TextComment}>{comment}</Typography>}
            </div>
        </div>
    </>
}