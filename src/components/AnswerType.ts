export interface Answer {
    type: 'name' | 'sex' | 'standart' | 'order' | 'multi' | 'hierarchy'
    isCorrect: boolean
    // isBackground: string
}

export interface AnswerName extends Answer {
    name: string
}
export interface AnswerSex extends Answer {
    sex: 'male' | 'female'
}
export interface AnswerStandart extends Answer {
    userNuberAnswers: number
    userAnswer: string
    comment: string
}
export interface AnswerMulti extends Answer {
    userAnswers: string[]
    comment: string[]
}
export interface AnswerHierarchy extends Answer {
    answer: Answer
    subQuestion: number
}
export interface AnswerOrder extends Answer {
    order: number[]
}