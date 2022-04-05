import React from 'react';
import { QuestionBase, QuestionStandart, QuestionName, QuestionSex, QuestionHierarchy, QuestionOrder } from "../novella/novellaInterrface";
import { Standart } from './Questions/Standart';
import { Sex } from './Questions/Sex';
import { Name } from './Questions/Name';
import { Hierarchy } from './Questions/Hierarchy';
import { Order } from './Questions/Order';
import { Answer, AnswerName, AnswerStandart } from './AnswerType';

interface LevelProps {
    question: QuestionBase
    callbackFinish?: (answer: Answer) => void
    show: boolean
    answer?: Answer
}

export function Level(props: LevelProps) {
    switch (props.question.type) {
        case 'name':
            if (props.show) {
                return <Name show={true} question={props.question as QuestionName} answer={props.answer as AnswerName} />
            }
            else {
                return < Name
                    question={props.question as QuestionName}
                    callbackFinish={props.callbackFinish} />
            }


        case 'sex':
            return <Sex
                question={props.question as QuestionSex}
                callbackFinish={props.callbackFinish} />
        case 'standart':
            if (props.show) {
                return <Standart question={props.question as QuestionStandart} answer={props.answer as AnswerStandart} show={true} />
            }
            else {
                return <Standart
                    callbackFinish={props.callbackFinish}
                    question={props.question as QuestionStandart} />
            }

        case 'hierarchy':
            return <Hierarchy
                callbackFinish={() => { }}
                question={props.question as QuestionHierarchy} />
        case 'order':
            return <Order
                callbackFinish={() => { }}
                question={props.question as QuestionOrder} />
        default:
            return <></>
    }
}


