// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, InputRow, Toolbar } from './';
import { v4 as uuidv4 } from 'uuid';
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
    const connectionId = uuidv4();
    const gameNameInput = document.querySelector('#game-name-input');
    const gameName = gameNameInput.value.trim();

    const rows = [];
    const difficulties = ['easy', 'medium', 'hard', 'extrahard']; // Array of difficulties
    const inputRows = document.querySelectorAll('.input-row');
    
    for (let i = 0; i < 4; i++) { // Loop through 4 times
        const difficulty = difficulties[i]; // Get difficulty at current index
        const inputRow = inputRows[i]; // Get input row at current index

        const categoryInput = inputRow.querySelector(`#category-input-${difficulty}`);
        const wordInputs = inputRow.querySelectorAll('.word-input');

        if (categoryInput) {
            const category = categoryInput.value.trim();
            const words = Array.from(wordInputs).map(input => input.value.trim()).filter(word => word !== '');

            // Only add a row if both category and at least one word is provided
            if (category !== '' && words.length > 0) {
                rows.push({ category, words, difficulty });
            }
        }
    }

    // Construct the JSON object
    const connection = {
        id: connectionId,
        name: gameName,
        rows
    };

    console.log(connection);

    // POST request to API endpoint
    fetch('http://localhost:5010/connections', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(connection),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create connection');
        }
        return response.json();
    })
    .then(data => {
        console.log('Connection created:', data);
    })
    .catch(error => {
        console.error('Error creating connection:', error);
    });
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
                    <label htmlFor="game-name-input">
                        TITLE: <input id="game-name-input" name="game-name-input" aria-label="Game name input" />
                    </label>
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