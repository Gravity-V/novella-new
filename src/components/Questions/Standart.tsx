import { Button, ThemeProvider, Typography } from "@mui/material"
import { QuestionStandart } from "../../novella/novellaInterrface"
import React, { useContext, useState } from 'react';
import { AnswerStandart } from "../AnswerType";
import { Styles, getTheme } from "../button-level/button.style";
import './Style.css';
import { Context } from "./context";

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
    const context = useContext(Context)//
    const [background, setBackground] = useState<string>(props.show ? (props.answer && props.answer.isCorrect ? '/cloud/Green.png' : '/cloud/Red.png') : '/cloud/White.png');
    return <>
        <div className="box">
            <div className="standartposition" style={{ height: '40%' }}>
                <div className="question" style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center" }}>

                    {(answer || props.show) ?
                        <Typography sx={Styles.TextComment} key={props.question.text}>
                            {answer ? comment : props.show && props.answer ? props.answer.comment : ""}
                        </Typography> : props.question.text
                    }
                </div>
            </div>
            <div className="standartposition" style={{ height: '45%' }}>
                <div className="Standart">
                    <div className="answer">
                        {props.question.answers.map(
                            (answer, i) => <ThemeProvider key={i}
                                theme={getTheme(props.answer ? props.answer.isCorrect : answer.isCorrect, clic != undefined ? clic == i : (props.answer != undefined ? (props.answer.userAnswer == answer.text) : false))}>
                                <Button sx={Styles.Standart}
                                    variant="contained"
                                    disabled={props.show === undefined || props.show === false ? lock : props.show}
                                    color={props.answer ? (props.answer.userAnswer == answer.text ? 'secondary' : 'primary') : 'primary'}
                                    onClick={() => {
                                        if (answer.comment) {
                                            setLock(true)
                                            setComment(answer.comment)
                                            context && (answer.isCorrect ? context.setBackground("/background/smile.png") : context.setBackground("/background/discontent.png"))//
                                            setAnswer({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text, comment: answer.comment })
                                            answer.isCorrect ? setBackground('/cloud/Green.png') : setBackground('/cloud/Red.png')
                                        } else {
                                            props.callbackFinish && props.callbackFinish({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text, comment: '' })
                                        }
                                        setClic(i)
                                    }}
                                >{answer.text}</Button>
                            </ThemeProvider>
                        )}
                    </div>
                </div>
            </div>
            <div className="standartposition" style={{ marginTop: '2%' }}>
                {answer && <Button
                    // sx={Styles.OrderButton}
                    variant="contained"
                    onClick={() => {
                        setLock(false)
                        context && context.setBackground("/background/interested.png")
                        setBackground('/cloud/White.png')
                        props.callbackFinish && props.callbackFinish(answer)
                        setAnswer(undefined)
                    }}
                >
                    Далее
                </Button>}
            </div>
        </div>
    </>
}