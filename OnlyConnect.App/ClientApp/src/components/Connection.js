import React, {useEffect, useState} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Col, Row} from "reactstrap";
import {Clue} from "./clue/Clue";
import {Answer} from "./answer/Answer";

export function Connection(props) {
    const [state, setState] = useState({ connection: null, loading: true, cluesGiven: null, answerRevealed: false });

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`api/game/connections/${props.icon}`);
            const data = await response.json();
            setState({connection: data, loading: false, cluesGiven: 0, answerRevealed: false});
        }
        
        if(state.connection === null){
            fetchData();
        }
        
    }, []);
    
    function next() {
        setState({ ...state,  cluesGiven: state.cluesGiven + 1 });
    }

    function revealAnswer() {
        setState({ ...state,  answerRevealed: true });
    }

    function renderForecastsTable() {
        return (
            <div>
                <Row className="my-3">
                    <Col><Clue clue={state.connection.clueOne} show={state.cluesGiven >= 1 || state.answerRevealed} current={state.cluesGiven === 1} points="5"></Clue></Col>
                    <Col><Clue clue={state.connection.clueTwo} show={state.cluesGiven >= 2 || state.answerRevealed} current={state.cluesGiven === 2} points="3"></Clue></Col>
                    <Col><Clue clue={state.connection.clueThree} show={state.cluesGiven >= 3 || state.answerRevealed} current={state.cluesGiven === 3} points="2"></Clue></Col>
                    <Col><Clue clue={state.connection.clueFour} show={state.cluesGiven >= 4 || state.answerRevealed} current={state.cluesGiven === 4} points="1"></Clue></Col>
                </Row>
                <Row className="my-3">
                    {state.answerRevealed && <Col><Answer answer={state.connection.answer}></Answer></Col> }
                </Row>
                <Row className="my-3">
                    <Col>
                        <Button color="success" onClick={revealAnswer} disabled={state.cluesGiven < 1}>
                            Reveal Answer
                        </Button>
                        <div className="float-end">
                            <Button color="primary" onClick={next} disabled={state.cluesGiven === 4 || state.answerRevealed}>
                                Next
                            </Button>    
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    let contents = state.loading
        ? <p><em>Loading...</em></p>
        : renderForecastsTable();

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem>
                    <a href="/connections">
                        Connections
                    </a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    {props.icon}
                </BreadcrumbItem>
            </Breadcrumb>
            <h1 id="tableLabel">Connections</h1>
            <p>What connects all four clues?</p>
            {contents}
        </div>
    );
}
