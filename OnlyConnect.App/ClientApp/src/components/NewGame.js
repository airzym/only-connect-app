import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {TeamName} from "./teamName/TeamName";
import {useNavigate} from "react-router-dom";

export function NewGame(props) {
    const [state, setState] = useState({ teamOne: "", teamTwo: "" });
    const navigate = useNavigate();
    
    function handleTeamOneInputChange(event){
        setState({ ...state, teamOne: event.target.value });
    }

    function handleTeamTwoInputChange(event){
        setState({ ...state, teamTwo: event.target.value });
    }

    async function newGame() {
        await fetch('api/game', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        });
        navigate("/coin-toss");
    }

    return (
        <Form>
            <Row>
                <Col md={6} className="offset-md-3">
                    <FormGroup>
                        <Label for="teamOne">Team One</Label>
                        <Input id="teamOne" name="teamOne" placeholder="" type="text" value={state.teamOne} onChange={handleTeamOneInputChange}/>
                    </FormGroup>
                    <TeamName name={state.teamOne}></TeamName>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    vs
                </Col>
            </Row>
            <Row>
                <Col md={6} className="offset-md-3">
                    <FormGroup>
                        <Label for="teamTwo">Team Two</Label>
                        <Input id="teamTwo" name="teamTwo" placeholder="" type="text" value={state.teamTwo} onChange={handleTeamTwoInputChange}/>
                    </FormGroup>
                    <TeamName name={state.teamTwo}></TeamName>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="offset-md-3">
                    <Button color="success" className="float-end btn-lg" onClick={newGame}>
                        New Game
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
