import React, { useState } from 'react';
import { Styles } from './button-level/button.style';
import { Button, TextField } from '@mui/material';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';

interface IntroductionProps {
    callbackFinish?: () => void
    callbackSex?: (e: boolean) => void
}


export function Introduction(props: IntroductionProps) {
    const [condition, setCondition] = useState(0)
    const [background, setBackground] = useState<string>()
    const [name, setName] = useState('');

    switch (condition) {
        case 0:
            return <div className='FirstPage'>
                <div className="text"> Для более удобного просмотра теста рекомендуется проходить в полноэкранном режиме (F11)</div>
                <Button
                    variant='contained'
                    sx={Styles.First}

                    onClick={() => { setCondition(condition + 1) }}
                >
                    Начать
                </Button>
            </div>
        case 1:
            return <div className='FirstPage'>

                <p className="text" style={{ margin: "0" }} >Укажите ваш пол </p>

                <div style={{ width: '70%', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button sx={Styles.First}
                        variant="contained"
                        onClick={() => { props.callbackSex && props.callbackSex(true); setBackground("/backgroundGirl/interested.png"); setCondition(condition + 1) }}
                    ><ManIcon sx={{ color: 'white', fontSize: '50px', padding: '16px' }} /></Button>

                    <Button sx={Styles.First}
                        variant="contained"
                        onClick={() => { props.callbackSex && props.callbackSex(false); setBackground("/backgroundMan/interested.png"); setCondition(condition + 1) }}
                    ><WomanIcon sx={{ color: 'white', fontSize: '50px', padding: '16px' }} /></Button>
                </div>
            </div >

        case 2:
            return <div className='name'>
                <div style={{ marginTop: '7%' }} className="text">Как выс зовут?</div>
                <div className="backName">
                    <TextField sx={Styles.Name}
                        id="standard-basic"
                        label="ФИО"
                        variant="standard"
                        size="medium"
                        aria-placeholder="Имя"
                        inputProps={{ maxLength: '40ch' }}

                        // onChange={(textField) => name = textField.target.value}
                        onChange={(textField) => setName(textField.target.value as string)}

                        onKeyDown={(e) => { name != '' && e.code == "Enter" && setCondition(condition + 1) }}
                    />
                </div>

                {<Button

                    variant="contained"
                    disabled={name == ''}
                    onClick={() => setCondition(condition + 1)}
                >Подтверждаю</Button>}
            </div>


        default:
            return <div style={{ height: '100vh', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="question" style={{ width: '410px' }}> Добрый день, {name}! Меня зовут Екатерина Сергеевна. Давайте приступим к собеседованию!</div>
                <div style={{ textAlign: 'center', position: 'absolute', width: '100%', bottom: '30%' }}>
                    <Button
                        variant='contained'
                        onClick={() => { props.callbackFinish && props.callbackFinish() }}
                    >
                        Далее
                    </Button>
                </div>
            </div>
    }

}