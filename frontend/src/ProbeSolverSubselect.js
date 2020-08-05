import React from 'react';
import { Container, Label, Column } from './common';

export default function ProbeSolverSubselect(props) {

    const { queryId } = props;

    return (<Container style={{boxShadow: "unset", justifyContent: "start"}}>
        <Column>
            <Label>Your request is being processed.</Label>
            <hr />
            <Label>Query ID: {queryId}</Label>
        </Column>
    </Container>);
}

