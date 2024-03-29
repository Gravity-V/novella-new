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
            <div style={{ marginTop: '7%' }}><p className="text" style={{ backgroundImage: `url(${props.show ? '/cloud/Green.png' : '/cloud/White.png'})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center" }}>{props.question.text}</p></div>
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
            {/* {<Button
                onClick={() => props.callbackFinish && props.callbackFinish({ type: 'name', isCorrect: true, name: name })}
                disabled={props.show}
            >Подтверрждаю</Button>} */}
            {<Button
                variant="contained"
                disabled={name == ''}
                onClick={() => props.callbackFinish && props.callbackFinish({ type: 'name', isCorrect: true, name: name })}
            >Подтверждаю</Button>}
        </div>
    </>
}
