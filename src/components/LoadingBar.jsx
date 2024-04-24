// eslint-disable-next-line no-unused-vars
import React from 'react';
import './LoadingBar.css';

const LoadingBar = () => {
    return (
        <>
            <div className='container' role="progressbar" aria-label="Loading">
                <div className="loading-bar-container">
                    <div className="loading-bar"></div>
                </div>
            </div>
        </>
    );
};

export default LoadingBar;