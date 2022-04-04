import { useState } from "react";
import { QuestionHierarchy } from "../../novella/novellaInterrface"
import { LevelWalk } from "../Level";
import React from 'react';

interface HierarchyProps {
    question: QuestionHierarchy
    callbackFinish: (userAnswers: string[]) => void
    callbackCorrect: (isCorrect: boolean) => void
}

export function Hierarchy(props: HierarchyProps) {
    const [subquestion, setSubquestion] = useState(0);
    return <LevelWalk
        question={props.question.questions[subquestion]}
        callbackCorrect={
            (isCorrect) => {
                if (subquestion >= props.question.questions.length - 1) {
                    props.callbackCorrect(isCorrect)
                }
                else if (!isCorrect) {
                    props.callbackCorrect(true)
                    props.callbackFinish([])
                }
            }
        }
        callbackFinish={
            (userAnswers) => {
                if (subquestion < props.question.questions.length - 1) {
                    setSubquestion(subquestion + 1)
                }
                else {
                    props.callbackFinish(userAnswers)
                }
            }
        }
    />
}