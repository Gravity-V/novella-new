import { useState } from "react";
import { QuestionHierarchy } from "../../novella/novellaInterrface"
import { Answer, AnswerHierarchy, LevelWalk } from "../Level";
import React from 'react';

interface HierarchyProps {
    question: QuestionHierarchy
    callbackFinish: (answer: AnswerHierarchy) => void
}

export function Hierarchy(props: HierarchyProps) {
    const [subquestion, setSubquestion] = useState(0);
    return <LevelWalk
        question={props.question.questions[subquestion]}
        callbackFinish={
            (answer) => {
                if (subquestion < props.question.questions.length - 1) {
                    answer.isCorrect && setSubquestion(subquestion + 1)
                    !(answer.isCorrect) && props.callbackFinish({ type: 'hierarchy', isCorrect: true, usewAnswers: answer.usewAnswers, subQuestion: subquestion })
                }
                else {
                    props.callbackFinish({ type: 'hierarchy', isCorrect: answer.isCorrect, usewAnswers: answer.usewAnswers, subQuestion: subquestion })
                }
            }
        }
    />
}