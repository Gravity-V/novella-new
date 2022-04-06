import { useState } from "react";
import { QuestionHierarchy } from "../../novella/novellaInterrface"
import { Level } from "../Level";
import React from 'react';
import { AnswerHierarchy } from "../AnswerType";

interface HierarchyProps {
    question: QuestionHierarchy
    callbackFinish?: (answer: AnswerHierarchy) => void
    answer?: AnswerHierarchy
    show?: boolean
}

export function Hierarchy(props: HierarchyProps) {
    const [subquestion, setSubquestion] = useState(props.show ? props.question.questions.length - 1 : 0);
    return <>

        <Level

            show={props.show === undefined || props.show === false ? false : props.show}
            question={props.question.questions[subquestion]}
            callbackFinish={
                (answer) => {
                    if (subquestion < props.question.questions.length - 1) {
                        answer.isCorrect && setSubquestion(subquestion + 1)
                        !(answer.isCorrect) && props.callbackFinish && props.callbackFinish({ type: 'hierarchy', isCorrect: true, answer: answer, subQuestion: subquestion })
                    }
                    else {
                        props.callbackFinish && props.callbackFinish({ type: 'hierarchy', isCorrect: answer.isCorrect, answer: answer, subQuestion: subquestion })
                    }
                }
            }
        />
    </>
}