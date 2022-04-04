import React from 'react';
import { Button, TextField } from "@mui/material"
import { QuestionBase, QuestionStandart, QuestionName, QuestionSex, QuestionHierarchy, QuestionOrder } from "../novella/novellaInterrface";
import { Standart } from './Questions/Standart';
import { Sex } from './Questions/Sex';
import { Name } from './Questions/Name';
import { Hierarchy } from './Questions/Hierarchy';
import { Order } from './Questions/Order';


interface LevelWalkProps {
    question: QuestionBase
    callbackFinish: (userAnswers: string[]) => void
    callbackCorrect: (isCorrect: boolean) => void
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
                callbackCorrect={props.callbackCorrect}
                callbackFinish={props.callbackFinish}
                question={props.question as QuestionStandart} />
        case 'hierarchy':
            return <Hierarchy
                callbackCorrect={props.callbackCorrect}
                callbackFinish={props.callbackFinish}
                question={props.question as QuestionHierarchy} />
        case 'order':
            return <Order
                callbackCorrect={props.callbackCorrect}
                callbackFinish={() => { }}
                question={props.question as QuestionOrder} />


        // case 'multi':
        //     const questionMulti = props.question as QuestionMulti;
        //     let answ: number[] | null[] = [null,null,null,null];

        //     const handleChange = (value: number, index: number) => {
        //         let type=false;
        //         // if (answ.some(a => a === value)) return//если элемент уже вписан
        //         // else {
        //         answ[index] = value
        //         console.log(answ)
        //         for (let index = 1; index <= answ.length; index++) {
        //           if(typeof(answ[index])=='object'){break}
        //           else if(index===answ.length){
        //               //if(JSON.stringify(answ)==JSON.stringify(questionMulti.correctAnswers))
        //                 return<>
        //                     {props.callbackFinish(["multi"]) }
        //                     {props.callbackCorrect(JSON.stringify(answ)==JSON.stringify(questionMulti.correctAnswers))}
        //                </>
        //           }
        //         }
        //        // }//проверь что получены все ответы, разлоч кнопку далее(еще одно состояние в App), верни true false
        //     }

        //     return <>

        //         <p>{questionMulti.text}</p>
        //         <img src={questionMulti.background}/>
        //         {questionMulti.answers.map(
        //             (answer, i) =>
        //             <FormControl disabled={props.disabled}>
        //                 <InputLabel>{i+1}</InputLabel>
        //                 <Select onChange={(e) => handleChange(e.target.value as number, i)}
        //             >
        //                 {questionMulti.answers.map(
        //             (answer, index) =>
        //                 <MenuItem value={index}>{answer.text}</MenuItem>
        //                 )}
        //                 </Select>
        //             </FormControl>
        //         )}
        //     </>
        default:
            return <></>
    }
}
