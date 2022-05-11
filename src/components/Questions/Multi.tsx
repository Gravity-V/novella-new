import { useEffect, useState } from "react";
import { QuestionMulti } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerMulti } from "../AnswerType";
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { Styles } from "../button-level/button.style";
import { padding } from "@mui/system";
import { PropaneSharp } from "@mui/icons-material";

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

export function Multi(props: MultiProps) {
    const [comment, setComment] = useState<string[]>([])
    const [answer, setAnswer] = useState<AnswerMulti>()
    const [lock, setLock] = useState(true)
    const [check, setCheck] = useState(new Array(props.question.answers.length).fill(false))
    let correct: boolean[] = new Array(props.question.answers.length).fill(false)
    useEffect(() => {
        props.show && props.answer && setComment(props.answer.comment)
    })
    return <>
        <div className="text">{props.question.text}</div>
        <div className="Centers">
            <FormGroup style={{ alignContent: "center" }}>
                {props.question.answers.map(
                    (answer, i) => {
                        return <div key={answer.text} style={{ backgroundColor: "rgba(0, 99, 204, 1)", paddingLeft: "1%", paddingRight: "1%", margin: 5, width: "97%" }}>
                            <FormControlLabel style={{width: "100%"}}
                                disabled={props.show === undefined || props.show === false ? false : props.show}
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
        {
            answer === undefined && <Button
                disabled={props.show === undefined || props.show === false ? lock : props.show}
                onClick={() => {
                    let userAnswers: string[] = [];
                    let comments: string[] = [];
                    props.question.answers.map(
                        (answer, i) => {
                            check[i] && userAnswers.push(answer.text)
                            // comments.map((_, a)=> {comments != undefined ? comments[a] == answer.comment ? check[i] && answer.comment !== undefined && comments.push(answer.comment) : "" : "EROR" })
                            // check[i] && answer.comment !== undefined && comments.push(answer.comment)
                            check[i] && answer.comment !== undefined && (comments.includes(answer.comment) ? true: comments.push(answer.comment))
                        }
                    )
                    console.log(comments);
                    // comments = doSmth(comments)/* */
                    setComment((old) => [...old, ...comments])
                    const answer: AnswerMulti = { isCorrect: JSON.stringify(correct) == JSON.stringify(check), type: "multi", userAnswers: userAnswers, comment: comments }
                    setAnswer(answer)
                    comments.length <= 0 && props.callbackFinish && props.callbackFinish(answer)
                    // comments.length <= 0 ? props.callbackFinish && props.callbackFinish(answer) && setAnswer(undefined) : ''
                }}
            >
                Подтверждаю
            </Button>
        }
        {
            answer && <Button
                onClick={
                    () => {
                        setLock(true)
                        setComment([])
                        props.callbackFinish && props.callbackFinish(answer)
                        setAnswer(undefined)
                    }
                }
            >
                Далее
            </Button>
        }
        <div style={{ marginBottom: "10px", padding: "8px" }}>
            {(answer || props.show) && comment.map((com, i) => <Typography key={i} sx={Styles.Multi}>{com}</Typography>)}
        </div>
    </>
}