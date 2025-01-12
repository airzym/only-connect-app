import React, {useEffect, useState} from 'react';
import { Button, Col, Row} from "reactstrap";
import {Clue} from "./clue/Clue";
import {Answer} from "./answer/Answer";
import {TeamName} from "./teamName/TeamName";

export function Connection(props) {
    const [game, setGame] = useState(null);
    const [leading, setLoading] = useState(true);
    const [teamBuzzed, setTeamBuzzed] = useState(false);
    const [state, setState] = useState({ cluesGiven: null, answerRevealed: false });

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`api/game`);
            const data = await response.json();
            setGame(data);
            setLoading(false)
        }
        
        if(game === null){
            fetchData();
        }
        
    }, []);
    
    function next() {
        setState({ ...state,  cluesGiven: state.cluesGiven + 1 });
    }

    function buzzTeam() {
        setTeamBuzzed(true);
    }

    function throwToOpponent() {
        
    }

    function revealAnswer() {
        setState({ ...state,  answerRevealed: true });
    }
    
    function getConnection(){
        return game.connections.find(x => x.name === props.icon);
    }

    function renderForecastsTable() {
        return (
            <div>
                <Row>
                    <Col md={6} className="offset-3">
                        <TeamName name={game.currentTeam.teamName}></TeamName>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col><Clue clue={getConnection().clueOne} show={state.cluesGiven >= 1 || state.answerRevealed} current={state.cluesGiven === 1} points="5"></Clue></Col>
                    <Col><Clue clue={getConnection().clueTwo} show={state.cluesGiven >= 2 || state.answerRevealed} current={state.cluesGiven === 2} points="3"></Clue></Col>
                    <Col><Clue clue={getConnection().clueThree} show={state.cluesGiven >= 3 || state.answerRevealed} current={state.cluesGiven === 3} points="2"></Clue></Col>
                    <Col><Clue clue={getConnection().clueFour} show={state.cluesGiven >= 4 || state.answerRevealed} current={state.cluesGiven === 4} points="1"></Clue></Col>
                </Row>
                <Row className="my-3">
                    {state.answerRevealed && <Col><Answer answer={getConnection().answer}></Answer></Col> }
                </Row>
                <Row className="my-3">
                    <Col>
                        <Button color="success" onClick={buzzTeam} disabled={state.cluesGiven < 1} hidden={teamBuzzed}>
                            Buzz
                        </Button>
                        <Button color="danger" onClick={throwToOpponent} disabled={state.cluesGiven < 1} hidden={!teamBuzzed}>
                            Incorrect
                        </Button>
                        <div className="float-end">
                            <Button color="primary" onClick={next} disabled={state.cluesGiven === 4 || state.answerRevealed} hidden={teamBuzzed}>
                                Next
                            </Button>
                            <Button color="success" onClick={revealAnswer} disabled={state.cluesGiven < 1} hidden={!teamBuzzed}>
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
            <p>What connects all four clues?</p>
            {contents}
        </div>
    );
}
