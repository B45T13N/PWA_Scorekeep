import "./Select.scss"
import React, {ChangeEventHandler, useEffect, useState} from "react";
import apiClient from "../../../services/apiClient";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface SelectProps {
    onChange: ChangeEventHandler<HTMLSelectElement>
}

interface SelectOptionsProps {
    id: string,
    label: string
}

export default function Select(props: SelectProps) {
    const [selectOptions, setSelectOptions] = useState<Array<SelectOptionsProps>>(new Array<SelectOptionsProps>())

    useEffect(() => {
        apiClient.get('/api/volunteer-types/show-all')
            .then(result => {
                setSelectOptions(result.data.data);
                })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <select data-testid={"select"} name="volunteer-type" id="volunteer-type" onChange={props.onChange}>
            <option value="">Sélectionner le type de poste</option>
            {selectOptions.map((option, key) => (
                <option key={key} value={option.id}>{option.label}</option>
            ))}
        </select>
    )
}