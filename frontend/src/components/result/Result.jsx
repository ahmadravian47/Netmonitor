import React from 'react';

const Result = ({ result }) => {
    return (
        <div>
            {result && <p>{result}</p>}
        </div>
    );
};

export default Result;
