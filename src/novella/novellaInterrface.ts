interface BaseAnswer{
    text: string
    comment?: string
}
interface AnswerWithCorrect extends BaseAnswer{
    isCorrect: boolean
}
export interface QuestionBase{
    type: string 
}
export interface QuestionBaseExtend extends QuestionBase{
    background: string
    text: string
}
export interface QuestionStandart extends QuestionBaseExtend{
    type: 'standart'
    answers: AnswerWithCorrect[]
}
export interface QuestionName extends QuestionBaseExtend{
    type: 'name'
}
export interface QuestionSex extends QuestionBaseExtend{
    type: 'sex'
}
export interface QuestionMulti extends QuestionBaseExtend{
    type: 'multi'
    answers: AnswerWithCorrect[]
}
export interface QuestionOrder extends QuestionBaseExtend{
    type: 'order'
    answers: BaseAnswer[]
    order: number[]
}
export interface QuestionHierarchy extends QuestionBase{
    type: 'hierarchy'
    questions: QuestionBase[]
}