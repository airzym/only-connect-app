import React from 'react';
import {Card, CardBody, CardText, CardTitle} from "reactstrap";
import './Clue.css';

export function Clue ({ clue, hidden, current, points }) {
    return (
        <div className="clue">
            { current ? <Card className="card-points"><CardBody><CardText>{points} points</CardText></CardBody></Card> : <div className="card-points-hidden"></div> }
            
            <Card className="card-clue">
                <CardTitle tag="h3">
                    {hidden ? clue : ""}
                </CardTitle>
            </Card>
            
        </div>
        
    )
}