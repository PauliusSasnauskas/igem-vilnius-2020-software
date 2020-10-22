import React from 'react';

export default function Autocomplete(props){
    const { suggestions, selected, setSelected } = props;

    const [userFilter, setUserFilter] = React.useState("");

    const filteredSuggestions = userFilter === "" ? [] : suggestions.filter(
        (suggestion) => {
			if (suggestion.partner_A === undefined || suggestion.partner_A === null) return false;
			return suggestion.partner_A.toLowerCase().startsWith(userFilter.toLowerCase());
		}
    );

    const changeUserFilter = (e) => {
        setUserFilter(e.target.value);
	};
	
	const clickSuggestion = (ind) => {
		setSelected(ind);
	};

    return (
        <div className="searchBlock">
            <input
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
					<li key={suggestion.id} onClick={()=>clickSuggestion(suggestion.id)}>
						{suggestion.partner_A}
					</li>
				))}
			</ul>)
			}
        </div>
    );
}