import React from 'react';
import { Button, TextField } from "@mui/material"
import { QuestionBase, QuestionStandart, QuestionName, QuestionSex, QuestionHierarchy, QuestionOrder } from "../novella/novellaInterrface";
import { Standart } from './Questions/Standart';
import { Sex } from './Questions/Sex';
import { Name } from './Questions/Name';
import { Hierarchy } from './Questions/Hierarchy';
import { Order } from './Questions/Order';
import { Answer, AnswerName } from './AnswerType';

interface LevelWalkProps {
    question: QuestionBase
    callbackFinish: (answer: Answer) => void
}
interface LevelShowProps {
    question: QuestionBase
    answer: Answer
}

export function LevelWalk(props: LevelWalkProps) {
    switch (props.question.type) {
        case 'name':
            return <Name
                question={props.question as QuestionName}
                callbackFinish={props.callbackFinish} />
        case 'sex':
            return <Sex
                question={props.question as QuestionSex}
                callbackFinish={props.callbackFinish} />
        case 'standart':
            return <Standart
                callbackFinish={props.callbackFinish}
                question={props.question as QuestionStandart} />
        case 'hierarchy':
            return <Hierarchy
                callbackFinish={props.callbackFinish}
                question={props.question as QuestionHierarchy} />
        case 'order':
            return <Order
                callbackFinish={() => { }}
                question={props.question as QuestionOrder} />
        default:
            return <></>
    }
}

export function LevelShow(props: LevelShowProps) {
    switch (props.question.type) {
        case 'name':
            return <Name show={true} question={props.question as QuestionName} answer={props.answer as AnswerName} />
        case 'sex':
            return <></>
        case 'standart':
            return <></>
        case 'hierarchy':
            return <></>
        case 'order':
            return <></>
        default:
            return <></>
    }
}
