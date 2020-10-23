import React from 'react';

export default function Autocomplete(props){
    const { suggestions, setSelected, childParam, disabled, filterCondition } = props;
    const filterConditionF = (filterCondition === undefined) ? ()=>true : filterCondition;

    const [userFilter, setUserFilter] = React.useState("");

    const filteredSuggestions = userFilter === "" ? [] : suggestions.filter(
        (suggestion) => {
            if (suggestion[childParam] === undefined || suggestion[childParam] === null) return false;
            if (!filterConditionF(suggestion)) return false;
			return suggestion[childParam].toLowerCase().startsWith(userFilter.toLowerCase());
		}
    ).map((suggestion)=>suggestion[childParam]) // get only name of partner
    .filter((value, index, self)=>self.indexOf(value) === index); // filter out only unique

    const changeUserFilter = (e) => {
        setUserFilter(e.target.value);
	};
	
	const clickSuggestion = (name) => {
        setSelected(name);
        setUserFilter("");
	};

    return (
        <div className="searchBlock">
            <input
                disabled={disabled}
                type="search"
                onChange={changeUserFilter}
                value={userFilter}
            />
            {filteredSuggestions.length <= 0 ? 
                <div className="no-suggestions">
                    <em>No suggestions</em>
                </div>
            : (<ul className="suggestions">
				{filteredSuggestions.slice(0, 4).map((suggestion)=>(
					<li key={suggestion} onClick={()=>clickSuggestion(suggestion)}>
						{suggestion}
					</li>
				))}
			</ul>)
			}
        </div>
    );
}