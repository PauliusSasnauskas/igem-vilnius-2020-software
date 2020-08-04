import React from 'react';

export default function MultipleInput(props){

    const [currentValue, setCurrentValue] = React.useState("");
    const changeCurrentValue = (e) => {
        setCurrentValue(e.target.value);
    };

    const {hint, data, onChange, ...other} = props;

    const changeFunc = () => {
        if (currentValue.trim() === "" ||
            data.includes(currentValue)) return;
        const newData = [...data, currentValue];
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

    return (<div className="multipleInputDropdown" {...other}>
        <div>
            {textInput}
            <datalist id="browsers">
                <option value="16S rRNA" />
                <option value="23S rRNA" />
                <option value="5S rRNA" />
            </datalist>
            <button onClick={changeFunc}>+</button>
        </div>
        {data.map((item, index) => (
            <span key={index}>{item}<button onClick={()=>remove(index)}>✕</button></span>
        ))}
    </div>);
}