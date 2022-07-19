import { Button, TextField } from "@mui/material"
import { QuestionName } from "../../novella/novellaInterrface"
import React, { useState } from 'react';
import { AnswerName } from "../AnswerType";
import { Styles } from "../button-level/button.style";

interface NameProps {
    question: QuestionName
    callbackFinish?: (answer: AnswerName) => void
    show?: boolean
    answer?: AnswerName
}

export function Name(props: NameProps) {
    // let name = ''
    const [name, setName] = useState('');
    return <>
        <div className='name'>
            <div className="positionsSex">
                <div className='bubble' style={{ backgroundImage: `url(${props.show ? '/cloud/Green.png' : '/cloud/White.png'})` }}>
                    <p className="textName" >{props.question.text}</p>
                </div>
            </div>
            <div style={{ alignItems: 'center', height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <div className="backName">
                    <TextField sx={Styles.Name}
                        id="standard-basic"
                        label="ФИО"
                        variant="standard"
                        size="medium"
                        aria-placeholder="Имя"
                        inputProps={{ maxLength: '40ch' }}
                        value={props.answer && props.answer.name}
                        // onChange={(textField) => name = textField.target.value}
                        onChange={(textField) => setName(textField.target.value as string)}
                        disabled={props.show}
                        onKeyDown={(e) => { name != '' && e.code == "Enter" && props.callbackFinish && props.callbackFinish({ type: 'name', isCorrect: true, name: name }) }}
                    />
                </div>
                {<Button
                    style={{ marginTop: '10%' }}
                    variant="contained"
                    disabled={name == ''}
                    onClick={() => props.callbackFinish && props.callbackFinish({ type: 'name', isCorrect: true, name: name })}
                >Подтверждаю</Button>}
            </div>
        </div>
    </>
}
