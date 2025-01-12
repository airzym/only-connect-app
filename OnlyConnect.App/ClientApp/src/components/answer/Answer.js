import React from 'react';
import {Card, CardTitle} from "reactstrap";
import './Answer.css';

export function Answer ({ answer }) {
    return (
        <Card className="card-answer">
            <CardTitle tag="h3">
                {answer}
            </CardTitle>
        </Card>
    )
}