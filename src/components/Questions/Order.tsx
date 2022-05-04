import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QuestionOrder } from '../../novella/novellaInterrface';
import { AnswerOrder } from '../AnswerType';
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

interface OrderProps {
    question: QuestionOrder
    callbackFinish?: (answer: AnswerOrder) => void
    answer?: AnswerOrder
    show?: boolean
}

// export function Order(props: OrderProps) {
//     // const question: number[] | null[] = new Array(props.question.answers.length).fill(null) // начальная строчка
//     const [question, setQuestion] = useState<number[]>(new Array(props.question.answers.length).fill(-1))
//     const handleChange = (value: number, i: number) => {
//         const newQuestion = [...question]
//         newQuestion[i] = value
//         setQuestion(newQuestion)
//     }
//     return <>
//         <div className='OrderBlock'>
//             <p className='text'>{props.question.text}</p>
//             {<img src={props.question.background} />}
//             {
//                 props.question.answers.map(
//                     (_, i) => {
//                         return <div className='Order' style={{ backgroundImage: `url(${props.question.background})` }}>
//                             <FormControl style={{width: '50ch'}}
//                                 key={i}
//                                 disabled={props.show === undefined || props.show === false ? false : props.show}>
//                                 <InputLabel>{i + 1}</InputLabel>
//                                 <Select id={i.toString()} onChange={(e) =>
//                                     handleChange(e.target.value as number, i)}
//                                     value={props.answer && props.answer.order[i]}
//                                     label="..">
//                                     {props.question.answers.map(
//                                         (answer, i) => {
//                                             return <MenuItem value={i} key={i}>{answer.text}</MenuItem>
//                                         }
//                                     )}
//                                 </Select>
//                             </FormControl>
//                         </div>
//                     }
//                 )
//             }
//             <Button onClick={() =>
//                 props.callbackFinish && props.callbackFinish({
//                     type: 'order',
//                     isCorrect: JSON.stringify(question) == JSON.stringify(props.question.order),
//                     order: question as number[]
//                 })} disabled={question.includes(-1)}
//             >Подтверждаю</Button>
//         </div>
//     </>
// }

export function Order(props: OrderProps) {
    const [items, setItems] = useState<string[]>([])
    props.question.answers.map((answer) => { setItems((old) => [...old, answer.text]) })
    console.log(items)

    const reorder = (list: string[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const itemsNewOrder = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(itemsNewOrder)
    }

    return (<>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provider) => (
                    <div
                        {...provider.droppableProps}
                        ref={provider.innerRef}
                    >
                        {items.map((elem, i) => {
                            return <Draggable key={elem} draggableId={elem} index={i}>
                                {(provider) => (
                                    <div
                                        ref={provider.innerRef}
                                        {...provider.draggableProps}
                                        {...provider.dragHandleProps}
                                    >
                                        {<Button onClick={() => console.log(elem)}>{elem}</Button>}
                                    </div>
                                )}
                            </Draggable>
                        })}
                    </div>
                )}
            </Droppable>
        </DragDropContext></>
    )
}