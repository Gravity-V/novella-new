import React from 'react';
import { Button } from "@mui/material"
import { QuestionBase, QuestionStandart } from "../novella/novellaInterrface";


interface LevelWalkProps{
    question: QuestionBase
    callbackFinish: (userAnswers: string[]) => void
    callbackCorrect: (isCorrect: boolean) => void
}

export function LevelWalk(props: LevelWalkProps)
{   
    switch (props.question.type) {
        case 'standart':
            const questionStandart = props.question as QuestionStandart;   
            return <>
                <p>{questionStandart.text}</p>
                <img src={questionStandart.background}/>
                {questionStandart.answers.map(
                    (answer) => <Button
                    onClick={() => {
                                props.callbackFinish([answer.text])
                                props.callbackCorrect(answer.isCorrect)//препятствует вызову последующих функций     
                            }
                        }
                    >{answer.text}</Button>
                )}
            </>           
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
        // case 'name':
        //     const questionName = props.question as QuestionName;
        //     let name = ''

        //     return <>
        //         <p>{questionName.text}</p>
        //         <img src={questionName.background}/>
        //         <TextField id="standard-basic" label="Standard" variant="standard" aria-placeholder="Имя" onChange={(textField)=> name = textField.target.value} />
        //         <ButtonAnswer disabled={props.disabled} 
        //             callbackFinish={() => {
        //             props.callbackFinish([name]) 
        //         }}>Подтверрждаю</ButtonAnswer>
        //     </>
        // case 'sex':
        //     const questionSex = props.question as QuestionSex;
        //     return <>
        //     <p>{questionSex.text}</p>
        //         <img src={questionSex.background}/>
        //         {questionSex.answers.map(
        //             (answer, i) => <ButtonAnswer disabled={props.disabled}
        //             callbackFinish={() => {
                                
        //                       props.callbackSex(i)

        //                         props.callbackFinish([answer.text])               
        //                     }
        //                 }
                    
        //             ><img src={answer.text}/></ButtonAnswer>
        //             )}
        //     </>
        default:
            return <></>
    }
}
    