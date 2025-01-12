import React from 'react';
import {Card, CardTitle} from "reactstrap";
import "./TeamName.css"

export function TeamName ({name}) {

    return (
        <Card className="card-team-name my-3">
            <CardTitle tag="h3">
                {name}
            </CardTitle>
        </Card>
    )
}