import React, {useEffect, useState} from 'react';
import {Col, Row} from "reactstrap";
import {Hieroglyph} from "./hieroglyph/Hieroglyph";
import {TeamName} from "./teamName/TeamName";

export function Connections() {
    const [loadingGame, setLoadingGame] = useState(true);
    const [game, setGame] = useState(null);

    useEffect(() => {
        async function fetchGame() {
            const response = await fetch('api/game');
            const data = await response.json();
            setGame(data);
            setLoadingGame(false);
        }

        if (game === null) {
            fetchGame();
        }
    }, []);
    
    function hieroglyph(icon) {
        let disabled = game.connections.find(x => x.name === icon).selected;
        return(<Hieroglyph icon={icon} disabled={disabled}></Hieroglyph>);
    }

    function renderHieroglyphs() {
        return (
            <div>
                <Row>
                    <Col md={6} className="offset-3">
                        <TeamName name={game.currentTeam.teamName}></TeamName>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>{hieroglyph("twoReeds")}</Col>
                    <Col>{hieroglyph("lion")}</Col>
                    <Col>{hieroglyph("twistedFlax")}</Col>
                </Row>
                <Row className="my-3">
                    <Col>{hieroglyph("hornedViper")}</Col>
                    <Col>{hieroglyph("water")}</Col>
                    <Col>{hieroglyph("eyeOfHorus")}</Col>
                </Row>
            </div>
        );
    }

    let contents = loadingGame
        ? <p><em>Loading...</em></p>
        : renderHieroglyphs();

    return (
        <div>
            <h1 id="tableLabel">Connections</h1>
            <p>Round One: What connects all four clues?</p>
            {contents}
        </div>
    );
}