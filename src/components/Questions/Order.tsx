import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { QuestionOrder } from '../../novella/novellaInterrface';
import { AnswerOrder } from '../AnswerType';

interface OrderProps {
    question: QuestionOrder
    callbackFinish?: (answer: AnswerOrder) => void
}

export function Order(props: OrderProps) {
    const [lock, setLock] = useState(true)
    const handleChange = () => {
        setLock(false)
    }
    return <>
        <p>{props.question.text}</p>
        {/* <img src={props.question.background} /> */}
        {
            props.question.answers.map(
                (_, i) => {
                    return <FormControl key={i}>
                        <InputLabel>{i + 1}</InputLabel>
                        <Select id={i.toString()} onChange={() => handleChange()}>
                            {props.question.answers.map(
                                (answer, i) => {
                                    return <MenuItem value={i} key={i}>{answer.text}</MenuItem>
                                }
                            )}
                        </Select>
                    </FormControl>
                }
            )
        }
        <Button onClick={() => props.callbackFinish && props.callbackFinish({ type: 'order', isCorrect: true, order: [1] })} disabled={lock}>Подтверрждаю</Button>
    </>
}