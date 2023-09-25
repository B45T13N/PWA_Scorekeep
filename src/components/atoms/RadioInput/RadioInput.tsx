import "./RadioInput.scss"

interface RadioInputProps {
    text:string,
    name:string,
    selected?: boolean,
}

export default function RadioInput(props: RadioInputProps) {

    const className = props.selected ? "radio-input selected" : "radio-input";

    return (
        <div data-testid={"parent-div"} className={className}>
            <input type="radio" name={props.name}/>
            <label htmlFor={props.name}>{props.text}</label>
        </div>
    )
}