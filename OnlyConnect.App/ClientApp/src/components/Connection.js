import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "reactstrap";
import {Clue} from "./Clue";

export function Connection(props) {
    const [state, setState] = useState({ connection: null, loading: true, cluesGiven: null });

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`api/connections/${props.icon}`);
            const data = await response.json();
            setState({connection: data, loading: false, cluesGiven: 0});
        }
        
        if(state.connection === null){
            fetchData();
        }
        
    }, []);
    
    function next() {
        setState({ ...state,  cluesGiven: state.cluesGiven + 1 });
    }

    function renderForecastsTable() {
        return (
            <div>
                <Row className="my-3">
                    <Col><Clue clue={state.connection.clueOne} hidden={state.cluesGiven >= 1} current={state.cluesGiven === 1} points="5"></Clue></Col>
                    <Col><Clue clue={state.connection.clueTwo} hidden={state.cluesGiven >= 2} current={state.cluesGiven === 2} points="3"></Clue></Col>
                    <Col><Clue clue={state.connection.clueThree} hidden={state.cluesGiven >= 3} current={state.cluesGiven === 3} points="2"></Clue></Col>
                    <Col><Clue clue={state.connection.clueFour} hidden={state.cluesGiven >= 4} current={state.cluesGiven === 4} points="1"></Clue></Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <Button color="success">
                            Reveal Answer
                        </Button>
                        <div className="float-end">
                            <Button color="primary" onClick={next} disabled={state.cluesGiven === 4}>
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
            <h1 id="tableLabel">Connections</h1>
            <p>What connects all four clues?</p>
            {contents}
        </div>
    );
}
