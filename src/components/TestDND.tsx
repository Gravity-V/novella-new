import { Button } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

const fakeData = () => {
    const strs: string[] = []
    for (let index = 0; index < 10; index++) {
        strs.push(`Test with item:${index}`)
    }
    return strs
}

export function Dnd() {
    const [items, setItems] = useState<string[]>(fakeData())
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


    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provider) => (
                        <div
                            {...provider.droppableProps}
                            ref={provider.innerRef}

                        >

                            {items.map((elem, i) => {
                                return <Draggable key={elem} draggableId={elem} index={i}>
                                    {
                                        (provider) => (
                                            <div
                                                ref={provider.innerRef}
                                                {...provider.draggableProps}
                                                {...provider.dragHandleProps}

                                            >
                                                {<Button onClick={() => console.log(elem)}>{elem}</Button>}
                                            </div>
                                        )
                                    }
                                </Draggable>
                            })}

                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={() => {
                console.log(items)
            }}></button>
        </>
    )
}