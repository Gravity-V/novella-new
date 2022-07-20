import { Button, FormControl, Icon, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QuestionOrder } from '../../novella/novellaInterrface';
import { AnswerOrder } from '../AnswerType';
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { DragHandle } from '@mui/icons-material';
import { Styles } from "../button-level/button.style";

interface OrderProps {
    question: QuestionOrder
    callbackFinish?: (answer: AnswerOrder) => void
    answer?: AnswerOrder
    show?: boolean
}

class Item {
    text: string
    key: number
    constructor(text: string, key: number) {
        this.text = text
        this.key = key
    }
}

const getItemStyle = (ek: number, length: number, isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 6,
    maxHeight: "64px",
    borderRadius: '6px',
    // {(ek < 3)} ? marginBottom: '8px': marginBottom: '0px',
    marginBottom: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 0 #091e4240',
    // border: 'solid',
    // borderColor: 'black',
    // change background colour if dragging
    background: isDragging ? "lightblue" : "#1976d2",
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    background: "lightgrey",
    borderRadius: '6px',
    padding: "7px 7px 1px 7px",
    // height: "201px"
});

export function Order(props: OrderProps) {
    const [dragElems, setDragElems] = useState<Item[]>([])
    useEffect(() => {
        const items: Item[] = props.show && props.answer ?
            props.answer.order.map((orderIndex) => new Item(props.question.answers[orderIndex].text, orderIndex)) :
            props.question.answers.map((answer, i) => new Item(answer.text, i))
        setDragElems(items)
    }, [setDragElems])

    const reorder = (list: Item[], startIndex: number, endIndex: number) => {
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
            dragElems,
            result.source.index,
            result.destination.index
        );
        setDragElems(itemsNewOrder)
    }

    function arraysEqual(a1: Array<any>, a2: Array<any>) {
        return JSON.stringify(a1) == JSON.stringify(a2)
    }

    return <>
        <div className='box'>
            <div style={{ height: '40%' }}>

                <div className="question" style={{ padding: '10px', width: `${props.question.textSize}` }}>{props.question.text}</div>

            </div>
            <div style={{ height: '13%' }}> </div>
            <div className="standartposition" style={{ height: '37%' }}>
                {/* <div className='OrderBlock' style={{marginTop: '4%'}}> */}
                {/* {<img src={props.question.background} />} */}
                <DragDropContext onDragEnd={onDragEnd}>
                    {/* <div style={{ height: "200px", width: "80vw" }}>  */}
                    <Droppable droppableId='ksfsdkaj'>
                        {(provider, snapshot) => (
                            <List
                                {...provider.droppableProps}
                                ref={provider.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {dragElems.map((e, i) =>
                                    <Draggable isDragDisabled={props.show} key={e.key} draggableId={e.key.toString()} index={i}>
                                        {
                                            (provider, snapshot) => (
                                                <ListItem
                                                    key={e.key}
                                                    ref={provider.innerRef}
                                                    {...provider.draggableProps}
                                                    {...provider.dragHandleProps}
                                                    style={getItemStyle(
                                                        e.key,
                                                        dragElems.length,
                                                        snapshot.isDragging,
                                                        provider.draggableProps.style)}
                                                >
                                                    <ListItemIcon>
                                                        <DragHandle />
                                                    </ListItemIcon>
                                                    <ListItemText primary={e.text} style={{ color: 'rgb(255,255,255)' }} />
                                                </ListItem>
                                            )
                                        }
                                    </Draggable>
                                )}
                                {provider.placeholder}
                            </List>
                        )}
                    </Droppable>
                    {/* </div> */}
                </DragDropContext>
            </div>
            {/* x</div> */}
            <div className="standartposition" style={{ height: '9%', justifyContent: 'flex-start', marginTop: '1%' }}>
                <Button
                    sx={Styles.OrderButton}
                    variant='contained'
                    disabled={props.show}
                    onClick={() => {
                        const order = dragElems.map((e) => e.key)
                        const answer: AnswerOrder = { isCorrect: arraysEqual(order, props.question.order), order: order, type: 'order' }
                        props.callbackFinish && props.callbackFinish(answer)
                    }}
                >
                    Подтверждаю
                </Button>
            </div>

        </div>
    </>
}