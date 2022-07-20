import { Button } from "@mui/material"
import { QuestionSex } from "../../novella/novellaInterrface"
import React from 'react';
import { AnswerSex } from "../AnswerType";
import './Style.css';
import { Styles } from "../button-level/button.style";
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';

interface SexProps {
    question: QuestionSex
    callbackFinish?: (answer: AnswerSex) => void
    answer?: AnswerSex
    show?: boolean
}

export function Sex(props: SexProps) {
    return <>
        <div className='name'>
            <div style={{ marginTop: '6%' }}>
                {/* <p className="text" style={{ backgroundImage: `url(${props.show ? '/cloud/Green.png' : '/cloud/White.png'})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center" }}>{props.question.text} </p> */}
            </div>
            <div>
                <Button sx={Styles.Sex}
                    variant="contained"
                    color={props.answer ? (props.answer.sex == 'male' ? 'secondary' : 'primary') : 'primary'}
                    disabled={props.show}
                    onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'male' }) }}
                ><ManIcon sx={{ color: 'white', fontSize: '50px' }} /></Button>
                <Button sx={Styles.Sex}
                    variant="contained"
                    color={props.answer ? (props.answer.sex == 'female' ? 'secondary' : 'primary') : 'primary'}
                    disabled={props.show}
                    onClick={() => { props.callbackFinish && props.callbackFinish({ isCorrect: true, type: 'sex', sex: 'female' }) }}
                ><WomanIcon sx={{ color: 'white', fontSize: '50px' }} /></Button>
            </div>
        </div>
    </>
}