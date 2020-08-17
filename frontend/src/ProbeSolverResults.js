import React from 'react';
import { Container, Label, Column, Loader } from './common';

export default function ProbeSolverResults(props) {
    const { jid } = props;

    return (<Container style={{boxShadow: "unset", justifyContent: "start"}}>
        <Column style={{flexGrow: 1}}>
            <Loader visible inline />
            <br />
            <Label>Your request is being processed.</Label>
            <hr />
            <Label>Job ID: {jid}</Label>
        </Column>
    </Container>);
}