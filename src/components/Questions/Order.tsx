import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { QuestionOrder } from '../../novella/novellaInterrface';

interface OrderProps {
    question: QuestionOrder
    callbackCorrect: (isCorrect: boolean) => void
    callbackFinish: (order: number[]) => void
}

export function Order(props: OrderProps) {
    const [lock, setLock] = useState(true)
    const handleChange = () => {

    }

    return <>
        <p>{props.question.text}</p>
        <img src={props.question.background} />
        {
            props.question.answers.map(
                (_, i) => {
                    return <FormControl>
                        <InputLabel>{i + 1}</InputLabel>
                        <Select /*id={i.toString()} onChange={() => }*/>
                            {props.question.answers.map(
                                (answer, i) => {
                                    return <MenuItem value={i}>{answer.text}</MenuItem>
                                }
                            )}
                        </Select>
                    </FormControl>
                }
            )
        }
        <Button disabled={lock}>Подтверрждаю</Button>
    </>
}