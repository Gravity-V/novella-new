import { useContext, useEffect, useState } from "react";
import { QuestionMulti } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerMulti } from "../AnswerType";
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, ListItemIcon, ThemeProvider, Typography } from "@mui/material";
import { getTheme4, Styles } from "../button-level/button.style";
import { Context } from "./context";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
interface MultiProps {
    question: QuestionMulti
    callbackFinish?: (answer: AnswerMulti) => void
    show?: boolean
    answer?: AnswerMulti
}

function TEXT(correct: boolean[], check: boolean[]) {


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
    const [clic, setClic] = useState<number>()
    const context = useContext(Context)//
    const [commentNember, setCommentNember] = useState(0)
    const [background, setBackground] = useState<string | undefined>();
    let correct: boolean[] = new Array(props.question.answers.length).fill(false)
    useEffect(() => {
        props.show && props.answer && setComment(props.answer.comment)
    })
    return <div className="box">
        <div style={{ height: '40%' }}>
            {/* <div className="question" style={{ alignSelf: 'center', backgroundImage: `url(${background})` }}>
                {!(answer || props.show) && props.question.text}
                {
                    // (answer || props.show) && comment.map((com, i) => <Typography key={i}>{com}</Typography>)
                    (answer || props.show) &&
                    <Typography sx={Styles.CommentMulty}>
                        <IconButton onClick={() => { commentNember != 0 ? setCommentNember(commentNember - 1) : true }}>
                            <ArrowBackIcon />
                        </IconButton>
                        {comment[commentNember]}
                        <IconButton onClick={() => { commentNember < comment.length - 1 ? setCommentNember(commentNember + 1) : true }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Typography>
                }
            </div> */}


            {(answer || props.show) ?
                <Typography component={'span'}>
                    <div className="comment" style={{ padding: `${(commentNember == 0 ? '115px 0px 115px 0px' : props.question.answers[commentNember - 1].commentPadding)}`, backgroundImage: `url(/cloud/${props.answer ? (props.answer.isCorrect ? 'Green.png' : 'Red.png') : background})`, flexDirection: 'row', alignItems: 'center' }}>
                        {/* {console.log(props.question.answers[jopa].commentSize)} */}
                        <IconButton onClick={() => { commentNember != 0 ? setCommentNember(commentNember - 1) : true }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <div style={{ width: `${commentNember == 0 ? '161px' : props.question.answers[commentNember - 1].commentSize}` }}>
                            {comment[commentNember]}{/*!!!!!!!!!не массив коментов а массив номеров коментариев. иначе размер облоков может не соответствовать коменту*/}
                        </div>
                        <IconButton onClick={() => { commentNember < comment.length - 1 ? setCommentNember(commentNember + 1) : true }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </div>


                    <div style={{
                        backgroundImage: `url(/cloud/circle/${background})`,
                        position: 'absolute',
                        top: '15%',
                        right: '55%',
                        width: '30px',
                        height: '30px',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}></div>
                    <div style={{
                        backgroundImage: `url(/cloud/circle/${background})`,
                        position: 'absolute',
                        top: '11%',
                        right: '58%',
                        width: '40px',
                        height: '40px',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}></div>
                    <div style={{
                        backgroundImage: `url(/cloud/circle/${background})`,
                        position: 'absolute',
                        top: '8%',
                        right: '62%',
                        width: '50px',
                        height: '50px',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}></div>
                </Typography> :
                <Typography component={'span'}>
                    <div className="question" style={{ padding: '10px', width: `${props.question.textSize}` }}>{props.question.text}</div>
                </Typography>
            }


        </div>
        <div style={{ height: '13%' }}> </div>
        <div className="standartposition" style={{ height: '37%' }}>
            <div className="Centers" style={{ overflow: 'auto' }}>
                <FormGroup style={{ alignContent: "center", margin: '0px 5px' }}>
                    {props.question.answers.map(
                        (answer, i) => {
                            return <div key={answer.text} style={{ backgroundColor: "rgba(0, 99, 204, 1)", paddingLeft: "1%", paddingRight: "1%", margin: '5px 0px', width: "97%" }}>
                                <ThemeProvider theme={getTheme4(props.answer ? props.answer.isCorrect : answer.isCorrect, clic != undefined ? clic == i : false)}> {/* НЕ РАБОТАЕТ ИЗМЕНЕНИЕ ОТВЕТА ПО ЦВЕТУ*/}
                                    <FormControlLabel
                                        style={{ width: "100%" }}
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
                                </ThemeProvider>
                                {correct[i] = answer.isCorrect}
                            </div>
                        }
                    )}
                </FormGroup>
            </div>
        </div>
        <div className="standartposition" style={{ height: '9%', justifyContent: 'flex-start', marginTop: '1%' }}>

            {
                answer === undefined && <Button
                    // style={{ width: '200px', alignSelf: 'center', marginBottom: '3%' }}
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
                        context && (answer.isCorrect ? context.setBackground('smile.png') : context.setBackground('discontent.png'))//
                        answer.isCorrect ? setBackground('Green.png') : setBackground('Red.png')
                        comments.length <= 0 ? ((context && context.setBackground(0)), (props.callbackFinish && props.callbackFinish(answer))) : setAnswer(answer) //переделай
                        // comments.length <= 0 ? props.callbackFinish && props.callbackFinish(answer) && setAnswer(undefined) : ''
                    }}
                >
                    Подтверждаю
                </Button>
            }
            {
                answer && <Button
                    // style={{ width: '160px', alignSelf: 'center', marginBottom: '3%' }}
                    variant='contained'
                    onClick={
                        () => {
                            setDisabled(false)
                            setLock(true)
                            setComment([])
                            correct = []
                            setCheck([])
                            setBackground('White.png')
                            setCommentNember(0)
                            context && context.setBackground('interested.png')
                            props.callbackFinish && props.callbackFinish(answer)
                            setAnswer(undefined)
                        }
                    }
                >
                    Далее
                </Button>
            }
        </div>

    </div>
}