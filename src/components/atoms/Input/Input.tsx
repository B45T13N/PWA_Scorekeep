import "./Input.scss"
import {ChangeEventHandler} from "react";

interface InputProps {
    type: string,
    field: string,
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export function Input(props: InputProps) {
    const label :string = props.field.charAt(0).toUpperCase() + props.field.substring(1, props.field.length)
    const name :string = props.field === "email" ? "email" : "password";

    return (
        <div className={"input-container"} data-testid={"input-test"}>
            <label htmlFor={props.field}>{label}</label>
            <input id={props.field} type={props.type} name={name} required onChange={props.onChange}/>
        </div>
    );
}
