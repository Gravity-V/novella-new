import { Button } from "@mui/material"
import { QuestionSex } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerSex } from "../AnswerType";
import './Style.css';
import { Styles } from "../button-level/button.style";

interface SexProps {
    question: QuestionSex
    callbackFinish?: (answer: AnswerSex) => void
    answer?: AnswerSex
    show?: boolean
}

export function Sex(props: SexProps) {
    return <>
        <div className='name'>
            <p className="text">{props.question.text}</p>
            <div>
                <Button sx={Styles.Sex}
                    variant="contained"
                    color={props.answer ? (props.answer.sex == 'male' ? 'secondary' : 'primary') : 'primary'}
                    disabled={props.show}
                    onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'male' }) }}
                >М</Button>
                <Button sx={Styles.Sex}
                    variant="contained"  
                    color={props.answer ? (props.answer.sex == 'female' ? 'secondary' : 'primary') : 'primary'}
                    disabled={props.show}
                    onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'female' }) }}
                >Ж</Button>
            </div>
        </div>
    </>
}