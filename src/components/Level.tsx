import React from 'react';
import { QuestionBase, QuestionStandart, QuestionName, QuestionSex, QuestionHierarchy, QuestionOrder, QuestionMulti } from "../novella/novellaInterrface";
import { Standart } from './Questions/Standart';
import { Sex } from './Questions/Sex';
import { Name } from './Questions/Name';
import { Hierarchy } from './Questions/Hierarchy';
import { Order } from './Questions/Order';
import { Multi } from './Questions/Multi'
import { Answer, AnswerHierarchy, AnswerName, AnswerSex, AnswerStandart, AnswerMulti, AnswerOrder } from './AnswerType';

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
            if (props.show) {
                return <Sex show={true} question={props.question as QuestionSex} answer={props.answer as AnswerSex} />
            }
            else {
                return <Sex
                    question={props.question as QuestionSex}
                    callbackFinish={props.callbackFinish} />
            }
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
            if (props.show) {
                return <Hierarchy question={props.question as QuestionHierarchy} answer={props.answer as AnswerHierarchy} show={true} />
            }
            else {
                return <Hierarchy callbackFinish={props.callbackFinish} question={props.question as QuestionHierarchy} />
            }
        case 'order':/** */
            if (props.show) {
                return <Order
                    question={props.question as QuestionOrder}
                    answer={props.answer as AnswerOrder} show={true} />
            }
            else {
                return <Order
                    callbackFinish={props.callbackFinish}
                    question={props.question as QuestionOrder} />
            }
        case 'multi':
            if (props.show) {
                return <Multi question={props.question as QuestionMulti} answer={props.answer as AnswerMulti} show={true} />
            }
            else {
                return <Multi callbackFinish={props.callbackFinish} question={props.question as QuestionMulti} />
            }
        default:
            return <></>
    }
}