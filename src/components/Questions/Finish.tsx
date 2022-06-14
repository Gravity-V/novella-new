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
        <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center", overflow: "auto" }}>
            <div style={{ textAlign: "center", fontSize: "25px", padding: "15px", backgroundColor: "rgb(202, 240, 255)", borderRadius: "20px", width: "50%" }}>
                {console.log(answer)}
                {(answer) ? "К сожалению вы не прошли тест.   " : "Поздравляем! Вы идеально прошли тест.  "}
                {context && (answer ? context.setBackground("/background/breakdown.png") : context.setBackground("/background/smile.png"))}
            </div>
            <Button variant="outlined" style={{ color: 'black', border: 'dotted', fontSize: '16px' }} onClick={() => { location.reload() }}>Ещё раз?</Button>
        </div>
    </>
}