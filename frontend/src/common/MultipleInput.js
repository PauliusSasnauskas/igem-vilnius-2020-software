import React from 'react';

export default function MultipleInput(props){

    const [currentValue, setCurrentValue] = React.useState("");
    const changeCurrentValue = (e) => {
        setCurrentValue(e.target.value);
    };

    const {numbersOnly, hint, data, onChange, ...other} = props;

    const changeFunc = () => {
        let value;
        if (numbersOnly){
            try {
                value = parseInt(currentValue);
            } catch (e) {
                return;
            }
            if (Number.isNaN(value)){
                return;
            }
        }else{
            value = currentValue;
        }

        if (data.includes(value)) return;
        const newData = [...data, value];
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

    const textInput = (<input placeholder={hint} type={numbersOnly ? "number" : "text"} value={currentValue} onChange={changeCurrentValue} onKeyUp={pressedEnter} />);

    return (<div className="multipleInput" {...other}>
        {textInput}
        <button onClick={changeFunc}>+</button>
        <br />
        {data.map((item, index) => (
            <span key={index}>{item}<button onClick={()=>remove(index)}>✕</button></span>
        ))}
    </div>);
}