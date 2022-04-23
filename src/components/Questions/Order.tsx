import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { QuestionOrder } from '../../novella/novellaInterrface';
import { AnswerOrder } from '../AnswerType';

interface OrderProps {
    question: QuestionOrder
    callbackFinish?: (answer: AnswerOrder) => void
    answer?: AnswerOrder
    show?: boolean
}

export function Order(props: OrderProps) {
    // const question: number[] | null[] = new Array(props.question.answers.length).fill(null) // начальная строчка
    const [question, setQuestion] = useState<number[]>(new Array(props.question.answers.length).fill(-1))
    const handleChange = (value: number, i: number) => {
        const newQuestion = [...question]
        newQuestion[i] = value
        setQuestion(newQuestion)
    }
    return <>
        <div className='OrderBlock'>
            <p className='text'>{props.question.text}</p>
            {<img src={props.question.background} />}
            {
                props.question.answers.map(
                    (_, i) => {
                        return <div className='Order' style={{ backgroundImage: `url(${props.question.background})` }}>
                            <FormControl style={{width: '50ch'}}
                                key={i}
                                disabled={props.show === undefined || props.show === false ? false : props.show}>
                                <InputLabel>{i + 1}</InputLabel>
                                <Select id={i.toString()} onChange={(e) =>
                                    handleChange(e.target.value as number, i)}
                                    value={props.answer && props.answer.order[i]}
                                    label="..">
                                    {props.question.answers.map(
                                        (answer, i) => {
                                            return <MenuItem value={i} key={i}>{answer.text}</MenuItem>
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                    }
                )
            }
            <Button onClick={() =>
                props.callbackFinish && props.callbackFinish({
                    type: 'order',
                    isCorrect: JSON.stringify(question) == JSON.stringify(props.question.order),
                    order: question as number[]
                })} disabled={question.includes(-1)}
            >Подтверрждаю</Button>
        </div>
    </>
}