import React, { useState } from 'react';

const Form = ({ checkStatus }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        checkStatus(url);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <button type="submit">Check Status</button>
        </form>
    );
};

export default Form;
