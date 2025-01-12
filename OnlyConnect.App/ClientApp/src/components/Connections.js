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

    function renderHieroglyphs() {
        return (
            <div>
                <Row>
                    <Col md={6} className="offset-3">
                        <TeamName name={game.currentTeam.teamName}></TeamName>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col><Hieroglyph icon="twoReeds" disabled={game.connections.twoReeds.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="lion" disabled={game.connections.lion.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="twistedFlax" disabled={game.connections.twistedFlax.selected}></Hieroglyph></Col>
                </Row>
                <Row className="my-3">
                    <Col><Hieroglyph icon="hornedViper" disabled={game.connections.hornedViper.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="water" disabled={game.connections.water.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="eyeOfHorus" disabled={game.connections.eyeOfHorus.selected}></Hieroglyph></Col>
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