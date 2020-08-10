import React from 'react';

import { Label, NumberInput } from '.';
import textVals from './textVals';

const Row = (props) => <div className="flexRow" {...props}>{props.children}</div>;

export default function MultipleInput(props){

    const {hint, data, onChange, setErrorValue, ...other} = props;

    const [minLength, setMinLength] = React.useState(undefined);
    const [maxLength, setMaxLength] = React.useState(undefined);
    const changeMinLength = (newVal) => {
        setMinLength(newVal);
        if (maxLength !== undefined && newVal > maxLength){
            setErrorValue(textVals.minMaxConstraint);
        }else{
            setErrorValue("");
        }
    };
    const changeMaxLength = (newVal) => {
        setMaxLength(newVal);
        if (minLength !== undefined && newVal < minLength){
            setErrorValue(textVals.maxMinConstraint);
        }else{
            setErrorValue("");
        }
    }

    const [currentValue, setCurrentValue] = React.useState("");
    const changeCurrentValue = (e) => {
        setCurrentValue(e.target.value);
    };

    const changeFunc = () => {
        if (currentValue.trim() === "") return;
        for (let item of data){
            if (item.val === currentValue) return;
        }
        const newData = [...data, {val: currentValue, min: minLength, max: maxLength}];
        onChange(newData);
        setCurrentValue("");
    };

    const pressedEnter = (e) => {
        e.preventDefault();
        if (e.keyCode !== 13) return;
        changeFunc();
    };

    const remove = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        onChange(newData);
    };

    const textInput = (<input list="browsers" placeholder={hint} value={currentValue} onChange={changeCurrentValue} onKeyUp={pressedEnter} />);

    return (<>
        <Label>Marker sequence length</Label>
        <Row style={{justifyContent: "space-between", width: "100%", margin: "8px 0 16px"}}>
            <NumberInput
                style={{width: "48%"}}
                label="Min"
                value={minLength}
                onChange={changeMinLength} />
            <NumberInput
                style={{width: "48%"}}
                label="Max"
                value={maxLength}
                onChange={changeMaxLength} />
        </Row>
        <Label>Marker sequence type</Label>
        <div className="multipleInputDropdown" {...other}>
            <div>
                {textInput}
                <datalist id="browsers">
                    <option value="16S rRNA" />
                    <option value="23S rRNA" />
                    <option value="5S rRNA" />
                </datalist>
                <button onClick={changeFunc}>+</button>
            </div>
            {data.map((item, index) => {
                let maxDisplay = item.max;
                if (item.min === undefined) item.min = 10;
                if (maxDisplay === undefined) maxDisplay = "∞";
                return (<span key={index}>{item.val} [{item.min}, {maxDisplay}]<button onClick={()=>remove(index)}>✕</button></span>)
            })}
        </div>
    </>);
}