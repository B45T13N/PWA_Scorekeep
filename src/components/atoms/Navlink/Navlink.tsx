import "./Navlink.scss"
import {useEffect, useState} from "react";

interface NavlinkProps {
    innerText: string,
    link: string,
    isActive? : boolean
}

export const Navlink = (props : NavlinkProps) => {
    const [className, setClassName] = useState<string>("");

    useEffect( () => {
        props.isActive ? setClassName("active") : setClassName("");
    }, [props.isActive]);

    return (
        <a href={props.link} about={`Lien de navigation pour : ${props.innerText.toLowerCase()}`} className={`navlink ${className}`}>
            {props.innerText}
        </a>
    );
};
