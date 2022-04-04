import { readBuilderProgram } from "typescript"
import { blueGrey } from "@mui/material/colors"
import { rgbToHex } from "@mui/material"

type ButtonStyles = {
    button: {
        background: string
    },
    bottongreen:{
        background: string
    },
    bottonred:{
        background: string
    }
}

export const buttonStyles = {
    button: {
        background: 'rgb(0,0,128)',
        border:2,
        borderColor: 'rgb(25,25,112)'
    },
    buttongreen:{
        background:'green'
    },
    buttonred:{
        background:'red'
    }
}