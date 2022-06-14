import { useState, useContext } from "react";
import React from 'react';
import { Answer } from '../AnswerType';
import { Context } from "./context";
import { Button } from "@mui/material";
interface FinishProps {
    answers?: Answer[]
}

export function Finish(props: FinishProps) {
    const context = useContext(Context)//
    var answer = (props.answers != undefined && props.answers.filter((ans) => ans.isCorrect == false).length > 0)
    return <>
        <div className="EndPage">
            <div style={{ textAlign: "center", fontSize: "25px", padding: "15px", backgroundColor: "rgb(202, 240, 255)", borderRadius: "20px", width: "50%" }}>
                {console.log(answer)}
                {(answer) ? "К сожалению вы не прошли тест.   " : "Поздравляем! Вы идеально прошли тест.  "}
                {context && (answer ? context.setBackground("/background/breakdown.png") : context.setBackground("/background/smile.png"))}
            </div>
            <Button variant="outlined" style={{ color: 'white', borderRadius: '13px', fontSize: '24px', backgroundColor: "rgb(25, 118, 210, 0.5)" }} onClick={() => { location.reload() }}>Ещё раз?</Button>
        </div>
    </>
}