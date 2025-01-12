import React, {useEffect, useState} from 'react';
import {Col, Row} from "reactstrap";
import {Hieroglyph} from "./hieroglyph/Hieroglyph";
import {TeamName} from "./teamName/TeamName";

export function Connections() {
    const [loadingConnections, setLoadingConnections] = useState(true);
    const [loadingGame, setLoadingGame] = useState(true);
    const [connections, setConnections] = useState(null);
    const [game, setGame] = useState(null);

    useEffect(() => {
        async function fetchConnections() {
            const response = await fetch('api/connections');
            const data = await response.json();
            setConnections(data);
            setLoadingConnections(false);
        }

        async function fetchGame() {
            const response = await fetch('api/game');
            const data = await response.json();
            setGame(data);
            setLoadingGame(false);
        }

        if (connections === null) {
            fetchConnections();
            fetchGame();
        }
    }, []);
    
    let getTeamsTurn = () => {
        return game.teamOne.currentTeam ? game.teamOne.teamName : game.teamTwo.teamName;
    }

    function renderHieroglyphs() {
        return (
            <div>
                <Row>
                    <Col md={6} className="offset-3">
                        <TeamName name={getTeamsTurn()}></TeamName>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col><Hieroglyph icon="twoReeds" disabled={connections.twoReeds.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="lion" disabled={connections.lion.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="twistedFlax" disabled={connections.twistedFlax.selected}></Hieroglyph></Col>
                </Row>
                <Row className="my-3">
                    <Col><Hieroglyph icon="hornedViper" disabled={connections.hornedViper.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="water" disabled={connections.water.selected}></Hieroglyph></Col>
                    <Col><Hieroglyph icon="eyeOfHorus" disabled={connections.eyeOfHorus.selected}></Hieroglyph></Col>
                </Row>
            </div>
        );
    }

    let contents = loadingConnections || loadingGame
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