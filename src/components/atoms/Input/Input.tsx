import "./Input.scss"
import {ChangeEventHandler, useState} from "react";

interface InputProps {
    type: string,
    field: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export function Input(props: InputProps) {
    const label :string = props.field.charAt(0).toUpperCase() + props.field.substring(1, props.field.length)
    const name :string = props.field === "email" ? "email" : "password";
    const [classes, setClasses] = useState<string>("")
    const [value, setValue] = useState<string>("")

    const onFocus = ()  => {
        setClasses("_focused")
    }

    const onBlur = ()  => {
        setClasses("")
    }

    const onChange : ChangeEventHandler<HTMLInputElement> = (e)  => {
        setValue(e.target.value);

        return props.onChange(e)
    }

    return (
        <div className={`input-container ${classes} ${value ? "_hasValue" : ""}`} data-testid={"input-test"}>
            <label htmlFor={props.field} className={"floating"} aria-label={props.field}>{label}</label>
            <input id={props.field}
                   type={props.type}
                   aria-required
                   name={name} required
                   onChange={onChange}
                   onBlur={onBlur}
                   onFocus={onFocus}/>
        </div>
    );
}
