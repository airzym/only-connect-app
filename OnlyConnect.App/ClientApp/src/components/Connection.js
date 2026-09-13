import React, {useEffect, useState} from 'react';
import { Button, Col, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";

import {Clue} from "./clue/Clue";
import {Answer} from "./answer/Answer";
import {TeamName} from "./teamName/TeamName";

export function Connection(props) {
    const navigate = useNavigate()
    
    const [game, setGame] = useState(null);
    const [connection, setConnection] = useState(null);
    const [leading, setLoading] = useState(true);
    const [teamBuzzed, setTeamBuzzed] = useState(false);
    const [thrownToOpponent, setThrownToOpponent] = useState(false);
    const [state, setState] = useState({ cluesGiven: null, answerRevealed: false });

    useEffect(() => {
        async function fetchDate() {
            const gameResponse = await fetch(`api/game`);
            const gameData = await gameResponse.json();
            setGame(gameData);

            const connectionResponse = await fetch(`api/game/connections/${props.icon}`);
            const connectionData = await connectionResponse.json();
            setConnection(connectionData);
            
            setLoading(false)
        }
        
        if(game === null || connection === null){
            fetchDate();
        }
        
    }, []);
    
    function next() {
        setState({ ...state,  cluesGiven: state.cluesGiven + 1 });
    }

    function buzzTeam() {
        setTeamBuzzed(true);
    }

    async function setIncorrect() {
        if (!thrownToOpponent) {
            setThrownToOpponent(true);
        } else {
            const winner = {winningTeamId: null, pointsWon: 0};
            await fetch(`api/game/connections/${props.icon}/winner`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(winner)
            });
            navigate(`/connections`);
        }
    }

    async function setCorrect() {
        setState({...state, answerRevealed: true});
        const winningTeamId = thrownToOpponent ? game.opposingTeam.teamId : game.currentTeam.teamId;
        const pointsWon = getPoints();
        const winner = {
            winningTeamId,
            pointsWon
        } 
        await fetch(`api/game/connections/${props.icon}/winner`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(winner)
        });
        navigate(`/connections`);
    }
    
    function getPoints() {
        if (thrownToOpponent) {
            return 1;
        }else{
            switch (state.cluesGiven) {
                case 1:
                    return 5;
                case 2:
                    return 3;
                case 3:
                    return 2;
                case 4:
                    return 1;
            }

        }
    }

    function renderForecastsTable() {
        return (
            <div>
                <Row>
                    <Col md={6} className="offset-3">
                        <TeamName name={thrownToOpponent ? game.opposingTeam.teamName : game.currentTeam.teamName}></TeamName>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col><Clue clue={connection.clueOne} show={state.cluesGiven >= 1 || state.answerRevealed} current={state.cluesGiven === 1} points="5"></Clue></Col>
                    <Col><Clue clue={connection.clueTwo} show={state.cluesGiven >= 2 || state.answerRevealed} current={state.cluesGiven === 2} points="3"></Clue></Col>
                    <Col><Clue clue={connection.clueThree} show={state.cluesGiven >= 3 || state.answerRevealed} current={state.cluesGiven === 3} points="2"></Clue></Col>
                    <Col><Clue clue={connection.clueFour} show={state.cluesGiven >= 4 || state.answerRevealed} current={state.cluesGiven === 4} points="1"></Clue></Col>
                </Row>
                <Row className="my-3">
                    {state.answerRevealed && <Col><Answer answer={connection.answer}></Answer></Col> }
                </Row>
                <Row className="my-3">
                    <Col>
                        <Button color="success" onClick={buzzTeam} disabled={state.cluesGiven < 1} hidden={teamBuzzed}>
                            Buzz
                        </Button>
                        <Button color="danger" onClick={setIncorrect} disabled={state.cluesGiven < 1} hidden={!teamBuzzed}>
                            Incorrect
                        </Button>
                        <div className="float-end">
                            <Button color="primary" onClick={next} disabled={state.cluesGiven === 4 || state.answerRevealed} hidden={teamBuzzed}>
                                Next
                            </Button>
                            <Button color="success" onClick={setCorrect} disabled={state.cluesGiven < 1} hidden={!teamBuzzed}>
                                Correct
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    let contents = leading
        ? <p><em>Loading...</em></p>
        : renderForecastsTable();

    return (
        <div>
            <h1 id="tableLabel">Connections</h1>
            {thrownToOpponent ? <p>For the steal, what connects all four clues?</p> : <p>What connects all four clues?</p>}
            {contents}
        </div>
    );
}
