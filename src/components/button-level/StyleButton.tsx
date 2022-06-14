import { Button, ButtonProps } from "@mui/material";

function StyleButton(props: ButtonProps) {
    return <Button color='primary' {...props}> {props.children} </Button>
}