// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, InputRow, Toolbar } from './';
import './Create.css';

function getDate() {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const date = today.getDate();
    const year = today.getFullYear();
    return `${month} ${date}, ${year}`;
}

// checks validity of submission & POSTS user created connections to API
function createConnection() {
    // todo
    return true
}

const Create = () => {
    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useState(getDate());
    // const [rows, setRows] = useState([]);

    return (
        <>
            <div className='app'>
                <h1 id='game-header'>
                    <span className='game-name'>Connections</span>
                    <span id='date'>{date}</span>
                </h1>
                <Toolbar />

                <div className='create-container'>
                    <p>create and share your own connections!</p>
                    <InputRow difficulty="easy" />
                    <InputRow difficulty="medium" />
                    <InputRow difficulty="hard" />
                    <InputRow difficulty="extrahard" />
                    <Button text="Share new connection" onClick={createConnection} disabled={false} />
                </div>
            </div>
        </>
    );
};

export default Create;