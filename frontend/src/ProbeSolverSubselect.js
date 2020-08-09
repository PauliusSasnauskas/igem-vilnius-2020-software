import React, { useEffect } from 'react';
import { Container, Label, Column, Loader } from './common';

export default function ProbeSolverSubselect(props) {

    const { subResults } = props;

    const [mySubResults, setMySubResults] = React.useState(undefined);

    useEffect(() => {
        setMySubResults(subResults.subResults)
    }, [subResults]);

    const toggleSelect = (index) => {
        const newResults = [...mySubResults];
        newResults.forEach((item)=>item.active = false);
        newResults[index].active = true;

        setMySubResults(newResults);
    };

    if (mySubResults === undefined){
        return (<Container style={{boxShadow: "unset", justifyContent: "start"}}>
            <Column style={{flexGrow: 1}}>
                <Loader inline />
                <br />
                <Label>Your request is being processed...</Label>
                <hr />
                <Label>Job ID: {subResults.jobId}</Label>
            </Column>
        </Container>);
    }else{
        console.log(mySubResults);
        return (<Container>
            <Column style={{flexGrow: 1}}>
                <Label>Select marker sequences</Label>
                {mySubResults.map((item, index)=>(
                    <div key={index} className={"selectResult" + (item.active ? " active" : "")} onClick={()=>toggleSelect(index)}>
                        <div className="title">{item.title}</div>
                        <div className={"eval eval" + item.seq_eval}>
                            <span>{item.embl_id}</span><span>{item.bac_name}</span><span>{item.length}bp</span>
                        </div>
                    </div>
                ))}
            </Column>
        </Container>)
    }
}

