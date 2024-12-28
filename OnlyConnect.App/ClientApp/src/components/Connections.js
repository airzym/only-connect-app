import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Col, Row} from "reactstrap";
import {Hieroglyph} from "./Hieroglyph";

export class Connections extends Component {
    static displayName = Connections.name;

    constructor(props) {
        super(props);
        this.state = { connections: null, loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(connections) {
        return (
            <div>
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

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Connections.renderForecastsTable(this.state.connections);

        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem active>
                        Connections
                    </BreadcrumbItem>
                </Breadcrumb>
                <h1 id="tableLabel">Connections</h1>
                <p>What connects all four clues?</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('api/connections');
        const data = await response.json();
        this.setState({ connections: data, loading: false });
    }
}
