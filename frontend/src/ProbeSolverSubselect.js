import React, { useEffect } from 'react';
import { Container, Label, Column, Loader } from './common';

export default function ProbeSolverSubselect(props) {

    useEffect(() => {
        // Run! Like go get some data from an API.
    }, []);

    const { jobId } = props;

    return (<Container style={{boxShadow: "unset", justifyContent: "start"}}>
        <Column style={{flexGrow: 1}}>
            <Loader inline />
            <br />
            <Label>Your request is being processed.</Label>
            <hr />
            <Label>Job ID: {jobId}</Label>
        </Column>
    </Container>);
}

