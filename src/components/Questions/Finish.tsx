import { useState } from "react";
import React from 'react';
import { Answer } from '../AnswerType';

interface FinishProps {
    answers?: Answer[]
}

export function Finish(props: FinishProps) {
    return <>
        {console.log(props.answers != undefined && props.answers.filter((ans) => ans.isCorrect == false).length > 0)}
        {`${props.answers != undefined && props.answers.filter((ans) => ans.isCorrect == false).length > 0}`}
    </>
}