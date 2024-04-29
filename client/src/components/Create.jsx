// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, InputRow, Modal, Toolbar } from './';
import { v4 as uuidv4 } from 'uuid';
import './Create.css';

function getDate() {
    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const date = today.getDate();
    const year = today.getFullYear();
    return `${month} ${date}, ${year}`;
}

const Create = () => {
    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useState(getDate());
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [createdConnectionId, setCreatedConnectionId] = useState(null);
    const navigate = useNavigate();

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };
  
    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
    };

    // checks validity of submission & POSTS user created connections to API
    function createConnection() {
        const connectionId = uuidv4();
        const gameNameInput = document.querySelector('#game-name-input');
        const gameName = gameNameInput.value.trim();
        if (gameName === '') {
            setAlertMsg('Please enter a game title.');
            setIsAlertVisible(true);
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);
            return;
        }

        const rows = [];
        const difficulties = ['easy', 'medium', 'hard', 'extrahard'];
        const inputRows = document.querySelectorAll('.input-row');
        
        for (let i = 0; i < 4; i++) { 
            const difficulty = difficulties[i];
            const inputRow = inputRows[i];

            const categoryInput = inputRow.querySelector(`#category-input-${difficulty}`);
            const wordInputs = inputRow.querySelectorAll('.word-input');

            if (categoryInput) {
                const category = categoryInput.value.trim();
                const words = Array.from(wordInputs).map(input => input.value.trim()).filter(word => word !== '');

                // Validation for incomplete rows
                if (category === '' || words.length !== 4) {
                    setAlertMsg('Please fill out all fields in each row.');
                    setIsAlertVisible(true);
                    setTimeout(() => {
                        setIsAlertVisible(false);
                    }, 3000);
                    return;
                }

                // Validation for duplicate words
                const uniqueWords = new Set(words);
                if (uniqueWords.size !== words.length) {
                    setAlertMsg('Please ensure there are no duplicate words in each row.');
                    setIsAlertVisible(true);
                    setTimeout(() => {
                        setIsAlertVisible(false);
                    }, 3000);
                    return;
                }

                rows.push({ category, words, difficulty });
            }
        }

        const connection = {
            id: connectionId,
            name: gameName,
            rows
        };

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
            console.log('Connection created:', data, " with id: ", `${connectionId}`);
            setCreatedConnectionId(connectionId);
            openSuccessModal(true);
        })
        .catch(error => {
            console.error('Error creating connection:', error);
        });
    }

    const copyGameLink = () => {
        if (createdConnectionId) {
            const link = `${window.location.origin}/nyt-connections-clone/${createdConnectionId}`;
            navigator.clipboard.writeText(link)
                .then(() => {
                    setAlertMsg("Link copied to clipboard");
                    setIsAlertVisible(true);
                    setTimeout(() => {
                        setIsAlertVisible(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.error('Error copying text: ', error);
                });
        } else {
            console.log("No connection id created, unable to generate a link to the new game.");
        }
    }

    return (
        <>
            <div className='app'>
                <h1 id='game-header'>
                    <span className='game-name'>Connections</span>
                    <span id='date'>{date}</span>
                </h1>
                <Toolbar />

                <Alert message={alertMsg} isVisible={isAlertVisible} />

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

            <Modal isOpen={successModalOpen} onClose={closeSuccessModal} role="dialog" aria-modal="true">
                <div id='result-modal'>
                    <h1 id='result-title'>Game created!</h1>
                    <Button text="Copy link to new game" onClick={copyGameLink} disabled={false} role="button" aria-label="Copy Link To New Game"/>
                    <Button text="Go to new game" onClick={() => { navigate(`/${createdConnectionId}`); }} disabled={false} role="button" aria-label="Go To New Game"/>
                </div>
            </Modal>
        </>
    );
};

export default Create;