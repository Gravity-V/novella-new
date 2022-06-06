import { useContext, useEffect, useState } from "react";
import { QuestionMulti } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerMulti } from "../AnswerType";
import { Button, Checkbox, FormControlLabel, FormGroup, ListItemIcon, ThemeProvider, Typography } from "@mui/material";
import { Icons } from "../button-level/button.style";
import { padding } from "@mui/system";
import { PropaneSharp } from "@mui/icons-material";
import { Context } from "./context";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { request } from "https";
interface MultiProps {
    question: QuestionMulti
    callbackFinish?: (answer: AnswerMulti) => void
    show?: boolean
    answer?: AnswerMulti
}

function doSmth(a: string[]): string[] {
    for (var q = 1, i = 1; q < a.length; ++q) {
        if (a[q] !== a[q - 1]) {
            a[i++] = a[q];
        }
    }
    return a;
}

function TEXT(correct: boolean[], check: boolean[]) {

    // comment.unshift('совершенно верно')
    // comment.unshift('очень плохо')
    // comment.unshift('Верно, но это не всё')
    // comment.unshift('Почти верно') //все правельные + ошибка
    // comment.unshift('это не совсем правильно') //не все правельные + ошибка

    // correct.filter(function (x: boolean) { return x == true }).length

    // if (correct.length == check) {

    //     if (correct.includes(true))
    //         if (correct.includes(false))
    //             comment.unshift('это не совсем правильно 1') //не все правельные + ошибка
    //         else comment.unshift('совершенно верно')
    //     else comment.unshift('очень плохо 1')

    // } else if (correct.length < check) {

    //     if (correct.includes(true))
    //         if (correct.includes(false))
    //             comment.unshift('это не совсем правильно 2') //не все правельные + ошибка
    //         else comment.unshift('Верно, но это не всё')
    //     else comment.unshift('очень плохо 2')

    // } else {

    //     if (correct.includes(true))
    //         if (correct.filter(function (x: boolean) { return x == true }).length == check)
    //             comment.unshift('Почти верно') //все правельные + ошибка
    //         else comment.unshift('это не совсем правильно 3') //не все правельные + ошибка
    //     else comment.unshift('очень плохо 3')

    // }

    let True = 0, False = 0, numberFalse: number[] = []

    for (let i = 0; i < correct.length; i++) {
        if (correct[i] != check[i])
            if (check[i] == true)
                True++
            else {
                False++
                numberFalse.push(i)
            }
    }

    if (False == 0) {
        if (True == 0) {
            return 'совершенно верно'
        } else {
            return 'Почти верно' //все правельные + ошибка
        }
    } else if (False == check.filter((x) => { x == true }).length) {
        return 'очень плохо'
    } else {
        if (True == 0) {
            return 'Верно, но это не всё'
        } else {
            return 'это не совсем правильно' //не все правельные + ошибка
        }
    }
}


export function Multi(props: MultiProps) {
    const [comment, setComment] = useState<string[]>([])
    const [answer, setAnswer] = useState<AnswerMulti>()
    const [lock, setLock] = useState(true)
    const [check, setCheck] = useState(new Array(props.question.answers.length).fill(false))
    const [disabled, setDisabled] = useState(props.show === undefined || props.show === false ? false : true)
    const context = useContext(Context)//
    const [commentNember, setCommentNember] = useState(0)
    let correct: boolean[] = new Array(props.question.answers.length).fill(false)
    useEffect(() => {
        props.show && props.answer && setComment(props.answer.comment)
    })
    return <>
        <div className="standartposition" style={{ height: '10%' }}>
            <div className="question" style={{ alignSelf: 'center' }}>
                {!(answer || props.show) && props.question.text}
                {
                    // (answer || props.show) && comment.map((com, i) => <Typography key={i}>{com}</Typography>)
                    (answer || props.show) &&
                    <Typography style={{ fontSize: '20' }}>
                        <Button onClick={() => { commentNember != 0 ? setCommentNember(commentNember - 1) : true }}>
                            <ListItemIcon>
                                <ThemeProvider theme={Icons()}>
                                    <ArrowBackIcon />
                                </ThemeProvider>
                            </ListItemIcon>
                        </Button>
                        {comment[commentNember]}
                        <Button onClick={() => { commentNember < comment.length - 1 ? setCommentNember(commentNember + 1) : true }}>
                            <ListItemIcon>
                                <ThemeProvider theme={Icons()}>
                                    <ArrowForwardIcon />
                                </ThemeProvider>
                            </ListItemIcon>
                        </Button>
                    </Typography>
                }
            </div>
        </div>
        <div className="standartposition" style={{ height: '45%', justifyContent: 'end' }}>
            <div className="Centers" >
                <FormGroup style={{ alignContent: "center" }}>
                    {props.question.answers.map(
                        (answer, i) => {
                            return <div key={answer.text} style={{ backgroundColor: "rgba(0, 99, 204, 1)", paddingLeft: "1%", paddingRight: "1%", margin: 5, width: "97%" }}>
                                <FormControlLabel style={{ width: "100%" }}
                                    disabled={disabled}
                                    control={
                                        <Checkbox style={{ color: "white" }} defaultChecked={props.answer != undefined && props.answer.userAnswers.includes(answer.text)} />
                                    }
                                    onChange={() => {
                                        setCheck((old) => { old[i] = !old[i]; return old });
                                        setLock(false)
                                    }}
                                    label={answer.text}
                                />
                                {correct[i] = answer.isCorrect}
                            </div>
                        }
                    )}
                </FormGroup>
            </div>
        </div>
        <div className="standartposition" style={{ height: '4%' }}>
            {
                answer === undefined && <Button
                    style={{ width: '200px', alignSelf: 'center', marginBottom: '5%' }}
                    disabled={props.show === undefined || props.show === false ? lock : props.show}
                    variant='contained'
                    onClick={() => {

                        setDisabled(true)
                        setLock(true)
                        let userAnswers: string[] = [];
                        let comments: string[] = [];
                        props.question.answers.map(
                            (answer, i) => {
                                check[i] && userAnswers.push(answer.text)
                                // comments.map((_, a)=> {comments != undefined ? comments[a] == answer.comment ? check[i] && answer.comment !== undefined && comments.push(answer.comment) : "" : "EROR" })
                                // check[i] && answer.comment !== undefined && comments.push(answer.comment)
                                check[i] && answer.comment !== undefined && !comments.includes(answer.comment) && comments.push(answer.comment)
                            }
                        )
                        // console.log(comments);
                        // comments = doSmth(comments)/* */
                        comments.unshift(TEXT(correct, check))
                        setComment((old) => [...old, ...comments])
                        const answer: AnswerMulti = { isCorrect: JSON.stringify(correct) == JSON.stringify(check), type: "multi", userAnswers: userAnswers, comment: comments }
                        context && (answer.isCorrect ? context.setBackground("/background/smile.png") : context.setBackground("/background/discontent.png"))//
                        comments.length <= 0 ? ((context && context.setBackground("/background/interested.png")), (props.callbackFinish && props.callbackFinish(answer))) : setAnswer(answer) //переделай
                        // comments.length <= 0 ? props.callbackFinish && props.callbackFinish(answer) && setAnswer(undefined) : ''
                    }}
                >
                    Подтверждаю
                </Button>
            }
            {
                answer && <Button
                    style={{ width: '160px', alignSelf: 'center', marginBottom: '5%' }}
                    variant='contained'
                    onClick={
                        () => {
                            setDisabled(false)
                            setLock(true)
                            setComment([])
                            context && context.setBackground("/background/interested.png")
                            props.callbackFinish && props.callbackFinish(answer)
                            setAnswer(undefined)
                        }
                    }
                >
                    Далее
                </Button>
            }
        </div>
    </>
}