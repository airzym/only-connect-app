import React, {useEffect, useState} from 'react';
import {Button, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {TeamName} from "./teamName/TeamName";
import {useNavigate} from "react-router-dom";

export function CoinToss() {
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState(null);
    const [coinToss, setCoinToss] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`api/game`);
            const data = await response.json();
            setGame(data);
            setLoading(false);
            let winningTeamId = Math.random() > 0.5 ? data.teamOne.teamId : data.teamTwo.teamId; 
            setCoinToss({ 
                winningTeamId: winningTeamId,
                startingTeamId: winningTeamId
            });
        }

        if(game === null){
            fetchData();
        }

    }, []);
    
    function getCoinTossWinners(){
        return game.teamOne.teamId === coinToss.winningTeamId ? game.teamOne.teamName : game.teamTwo.teamName;
    }

    function toggleGoFirst(){
        let currentValue = coinToss.startingTeamId;
        setCoinToss({ ...coinToss, startingTeamId: game.teamOne.teamId === currentValue ? game.teamTwo.teamId : game.teamOne.teamId });
    }

    function goFirstChecked(){
        return coinToss.startingTeamId === coinToss.winningTeamId;
    }

    async function startGame() {
        await fetch('api/game/currentTeam/' + coinToss.startingTeamId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        navigate("/connections");
    }

    function renderContent() {
        return (
            <div>
                <Row>
                    <Col md={6} className="offset-3">
                        <Row>
                            <TeamName name={getCoinTossWinners()}></TeamName>
                        </Row>
                        <Row>
                            <FormGroup switch>
                                <Input type="switch" checked={goFirstChecked()} onChange={toggleGoFirst} />
                                <Label check>Would you like to go first?</Label>
                            </FormGroup>
                        </Row>
                        <Button color="success" className="btn-lg float-end" onClick={startGame}>
                            Start Game
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderContent();

    return (
        <div>
            <h1 id="tableLabel">Coin Toss</h1>
            <p>The winners of the coin toss are...</p>
            {contents}
        </div>
    );
}
