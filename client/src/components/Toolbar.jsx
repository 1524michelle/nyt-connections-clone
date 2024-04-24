// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import settingsIcon from '../assets/settings.png';
import questionIcon from '../assets/question.png';
import Modal from './Modal';
import './Toolbar.css';

const Toolbar = () => {
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(true);

    const openSettingsModal = () => {
        setSettingsModalOpen(true);
    };

    const closeSettingsModal = () => {
        setSettingsModalOpen(false);
    };

    const openInfoModal = () => {
        setInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setInfoModalOpen(false);
    };

    const handleSettingsKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openSettingsModal();
        }
    };

    const handleInfoKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openInfoModal();
        }
    };

    return (
        <>
            <hr />
            <div id="toolbar">
                <button
                    className="toolbar-button"
                    onClick={openSettingsModal}
                    onKeyDown={handleSettingsKeyDown}
                >
                    <img className='toolbar-img' src={settingsIcon} alt="Settings" />
                </button>
                <button
                    className="toolbar-button"
                    onClick={openInfoModal}
                    onKeyDown={handleInfoKeyDown}
                >
                    <img className='toolbar-img' src={questionIcon} alt="Question" />
                </button>
            </div>
            <Modal isOpen={settingsModalOpen} onClose={closeSettingsModal}>
                <div>
                    <p className='settings-title'>SETTINGS</p>
                    <p className='settings-row'>
                        <span className='left'>Feedback</span>
                        <span className='right'><a href="https://github.com/1524michelle/nyt-connections-clone/issues">GitHub Issue</a></span>
                    </p>
                    <br />
                    <hr />
                    <p className='settings-row'>
                        <span className='left'>Report a Bug</span>
                        <span className='right'><a href="https://github.com/1524michelle/nyt-connections-clone/issues">Github Issue</a></span>
                    </p>
                    <br />
                    <hr />
                    <p className='settings-row'>
                        <span className='left'>Questions</span>
                        <span className='right'><a href="https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles">FAQ</a></span>
                    </p>
                </div>
            </Modal>

            <Modal isOpen={infoModalOpen} onClose={closeInfoModal}>
                <div id='info-modal'>
                    <h2 id='info-title'>How to Play</h2>
                    <h3 id='info-subtitle'>Find groups of four items that share something in common.</h3>
                    <ul className='info-list'>
                        <li>Select four items and tap &apos;<span className='bold'>Submit</span>&apos; to check if your guess is correct.</li>
                        <li>Find the groups without making 4 mistakes!</li>
                    </ul>
                    <p className='info-examples-title bold'>Category Examples</p>
                    <ul className='info-list'>
                        <li>FISH: Bass, Flounder, Salmon, Trout</li>
                        <li>FIRE ___: Ant, Drill, Island, Opal</li>
                    </ul>
                    <p>Categories will always be more specific than &quot;5-LETTER-WORDS,&quot; &quot;NAMES&quot; or &quot;VERBS.&quot;</p>
                    <p>Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!</p>
                    <p>Each group is assigned a color, which will be revealed as you solve:</p>
                    <div id='scale-container'>
                        <span className='scale-row'>
                            <span className="block easy"></span>
                            <p className='scale-text'>Straightforward</p>
                        </span>
                        <span className="block medium"></span>
                        <span className="block hard"></span>
                        <span className='scale-row'>
                            <span className="block extrahard"></span>
                            <p className='scale-text'>Tricky</p>
                        </span>
                    </div>
                </div>
            </Modal>
            <hr />
        </>
    );
};

export default Toolbar;