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
    const [background, setBackground] = useState<string>(props.answer && props.answer.isCorrect ? 'Green.png' : 'Red.png');
    const [jopa, setJopa] = useState<number>(props.answer ? props.answer.userNuberAnswers : -1)
    console.log(answer, props.show, props.answer)
    return <>

        <div className="box">

            <div style={{ height: '40%' }}>
                {/* <div className="question" style={{ backgroundImage: `url(${background})` }}>

                    {(answer || props.show) ?
                        <Typography sx={Styles.TextComment} key={props.question.text}>
                            {answer ? comment : props.show && props.answer ? props.answer.comment : ""}
                        </Typography> : props.question.text
                    }
                </div> */}
                {/* 1148 x 976 */}
                {(answer || (props.show && (props.answer && props.answer.comment != ''))) ?
                    <Typography component={'span'}>
                        <div className="comment" style={{ backgroundImage: `url(/cloud/${background})` }}>
                            {/* {console.log(props.question.answers[jopa].commentSize)} */}
                            <div style={{ padding: `${(props.question.answers[jopa].commentPadding)}`, width: `${props.question.answers[jopa].commentSize}` }}>{answer ? comment : props.show && props.answer ? props.answer.comment : ""}</div>
                        </div>

                        <div style={{
                            backgroundImage: `url(/cloud/circle/${background})`,
                            position: 'absolute',
                            top: '5%',
                            right: '0%',
                            width: '100px',
                            height: '100px',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}></div>
                    </Typography> :
                    <Typography component={'span'}>
                        <div className="question" style={{ padding: '10px', width: `${props.question.textSize}` }}>{props.question.text}</div>
                    </Typography>}

            </div>

            <div style={{ height: '13%' }}> </div>
            <div className="standartposition" style={{ height: '37%' }}>
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
                                            setJopa(i)
                                            context && (answer.isCorrect ? context.setBackground('smile.png') : context.setBackground('discontent.png'))//
                                            setAnswer({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text, comment: answer.comment, userNuberAnswers: i })
                                            answer.isCorrect ? setBackground('Green.png') : setBackground('Red.png')
                                        } else {
                                            props.callbackFinish && props.callbackFinish({ isCorrect: answer.isCorrect, type: "standart", userAnswer: answer.text, userNuberAnswers: i, comment: '' })
                                        }
                                        setClic(i)
                                    }}
                                >{answer.text}</Button>
                            </ThemeProvider>
                        )}
                    </div>
                </div>
            </div>
            <div className="standartposition" style={{ height: '9%', justifyContent: 'flex-start', marginTop: '1%' }}>
                {answer ? <Button

                    variant="contained"
                    onClick={() => {
                        setLock(false)
                        context && context.setBackground('interested.png')
                        setBackground('/cloud/White.png')
                        props.callbackFinish && props.callbackFinish(answer)
                        setAnswer(undefined)
                    }}
                >
                    Далее
                </Button> :
                    <Button

                        sx={Styles.Balvanka}
                    >
                        Далее
                    </Button>}
            </div>

        </div>
    </>
}