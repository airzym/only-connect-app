import React from 'react';
import {Card} from "reactstrap";
import './Hieroglyph.css';
import {useNavigate} from "react-router-dom";

export function Hieroglyph (props) {
    const navigate = useNavigate()
    
    function handleClick() {
        if (!props.disabled) {
            navigate(`/connections/${props.icon}`);
        }
    }

    let src = "/img/" + props.icon + ".png";
    let classname = `card-hieroglyph ${props.disabled ? "disabled" : ""}`;

    return (
        <Card className={classname} onClick={handleClick}>
            <img
                alt={props.icon}
                src={src}
                className="hieroglyph"
            />
        </Card>
    )
}