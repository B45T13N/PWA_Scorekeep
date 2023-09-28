import "./Select.scss"
import React, {ChangeEventHandler} from "react";

interface SelectProps {
    onChange: ChangeEventHandler<HTMLSelectElement>
}

export default function Select(props: SelectProps) {
    const selectOptions = [
        {
            "value": "room-manager",
            "textContent": "Responsable de salle"
        },
        {
            "value": "secretary",
            "textContent": "Secrétaire"
        },
        {
            "value": "timekeeper",
            "textContent": "Chronométreur"
        }
    ]

    return (
        <select data-testid={"select"} name="volunteer-type" id="volunteer-type" onChange={props.onChange}>
            <option value="">Sélectionner le type de poste</option>
            {selectOptions.map((option, key) => (
                <option key={key} value={option.value}>{option.textContent}</option>
            ))}
        </select>
    )
}