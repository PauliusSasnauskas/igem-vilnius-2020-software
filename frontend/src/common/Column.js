import React from 'react';

const Column = (props) => <div className="flexColumn" {...props}>{props.children}</div>;
export default Column;