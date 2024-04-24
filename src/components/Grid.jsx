// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Grid.css';
import { Alert, Attempts, Button, Countdown, Mistakes, Modal, Square, Row } from './';

const Grid = () => {
  const [selectedSquares, setSelectedSquares] = useState([]); // array of selected squares
  const [categories, setCategories] = useState([]); // array of categories & prompts
  const [shuffledPrompts, setShuffledPrompts] = useState([]); // array of prompts for the grid
  const [mistakeStrikes, setMistakeStrike] = useState(0); // number of strikes used
  const [rows, setRows] = useState([]); // rows solved by user
  const [isMistake, setMistake] = useState(false); // controls square mistake animation
  const [resultModalOpen, setResultModalOpen] = useState(false); // controls result modal
  const [attempts, setNewAttempt] = useState([]); // array of arrays of attempt difficulties
  const [isAlertVisible, setIsAlertVisible] = useState(false); // controls visibility of alerts
  const [alertMsg, setAlertMsg] = useState(""); // controls message in alerts
  const [submitInTimeout, setSubmitInTimeout] = useState(false); // controls submit button use after a mistake

  // index using mistakeStrikes
  const outcomeText = ["Perfect!", "Impressive", "Solid", "Phew", "Next Time"];
  // tool to create copy paste tool
  const emojiMap = { 
    'easy': '🟨',
    'medium': '🟩',
    'hard': '🟦',
    'extrahard': '🟪'
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // TODO: this is hardcoded data for frontend testing
  const fetchCategories = () => {
    const data = [
      {
        name: "UPDATE FOR ACCURACY",
        prompts: ["AMEND", "CORRECT", "FIX", "REVISE"],
        difficulty: "easy"
      },
      {
        name: "QUARREL",
        prompts: ["FIGHT", "ROW", "SCRAP", "TIFF"],
        difficulty: "medium"
      },
      {
        name: "GAMES OF CHANCE",
        prompts: ["BINGO", "LOTTERY", "ROULETTE", "WAR"],
        difficulty: "hard"
      },
      {
        name: "___ CHIP",
        prompts: ["BLUE", "COMPUTER", "POKER", "POTATO"],
        difficulty: "extrahard"
      }
    ];
    setCategories(data);
  }

  useEffect(() => {
    shufflePrompts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]); // shuffle once when the component is changed?

  const shufflePrompts = () => {
    const allPrompts = categories.reduce((acc, curr) => acc.concat(curr.prompts), []);
    const shuffled = allPrompts.sort(() => Math.random() - 0.5);
    setShuffledPrompts(shuffled);
  };

  // square click: selects the square
  const handleSquareClick = (word) => {
    if (selectedSquares.includes(word)) {
      setSelectedSquares(selectedSquares.filter((w) => w !== word));
      setSubmitInTimeout(false); // reset if a square gets deselected
    } else if (!selectedSquares.includes(word) && selectedSquares.length < 4) {
      setSelectedSquares([...selectedSquares, word])
    }
  };

  // handle submission of an attempt, mistakes, and state
  const handleSubmit = () => {
    if (selectedSquares.length == 4 && !submitInTimeout) {
      const match = categories.find(category =>
        selectedSquares.every(square => category.prompts.includes(square))
      );

      processAttempt(selectedSquares);
  
      if (match) { // success: all words are from same category
        setCategories(categories.filter(category => category.name !== match.name));
        setSelectedSquares([]);
        setRows([...rows, match]);
        if (rows.length + 1 == 4) { // take into account async state
          setIsAlertVisible(true);
          setAlertMsg(outcomeText[mistakeStrikes]);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
        }
      } else { // mistake: words not from the same category
        const closeMatch = categories.find(category => {
          const matchingWords = selectedSquares.filter(square => category.prompts.includes(square));
          return matchingWords.length == 3;
        });
    
        if (closeMatch) {
          setIsAlertVisible(true);
          setAlertMsg("One away...");
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
        }

        setSubmitInTimeout(true);
        setMistakeStrike(prevMistakeStrikes => prevMistakeStrikes + 1);
        
        // vibrate on mistake
        setMistake(true);
        setTimeout(() => {
          setMistake(false);

          // game ends: too many mistakes!
          if (mistakeStrikes + 1 >= 4) { // take into account async state
            setIsAlertVisible(true);
            setAlertMsg(outcomeText[mistakeStrikes+1]);
            setTimeout(() => {
              setIsAlertVisible(false);
            }, 3000);
            setSelectedSquares([]);
            // add each row with a delay between them
            categories.forEach((category, index) => {
              setTimeout(() => {
                setRows(rows => [...rows, category]);
                setCategories(categories => categories.filter(cat => cat.name !== category.name));
              }, index * 1000);
            });
          }
        }, 1500);
      }
    }
  };

  // collects newest submission difficulties into array of attempts
  const processAttempt = () => {
    var difficulties = []
    selectedSquares.forEach((word) => {
      const difficulty = categories.find(category => category.prompts.includes(word))?.difficulty;
      difficulties.push(difficulty);
    });
    setNewAttempt(prevAttempt => [...prevAttempt, difficulties]);
  };

  // turns attempts into an array of emojis
  const shareResults = () => {
    var s = "Connections\nPuzzle #290\n"; // TODO: fix hardcoded puzzle number
    attempts.forEach((attempt) => {
      attempt.forEach((difficulty) => {
        s += emojiMap[difficulty]
      });
      s += '\n';
    });
    
    navigator.clipboard.writeText(s).then(() => {
      console.log('Text copied to clipboard');
      setIsAlertVisible(true);
          setAlertMsg("Copied to clipboard");
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 3000);
    })
    .catch((error) => {
      console.error('Error copying text: ', error);
    });
  };

  // passed into Square, restore state after animation
  const handleAnimationEnd = (event) => {
    if (event.animationName === 'shake') {
      setTimeout(() => {
        setMistake(false);
      }, 300);
    }
  };

  const openResultModal = () => {
      setResultModalOpen(true);
  };

  const closeResultModal = () => {
      setResultModalOpen(false);
  };

  return (
    <>
      <Alert message={alertMsg} isVisible={isAlertVisible} />

      <p id='instructions'>Create four groups of four!</p>

      <div className="grid-container">
        {rows.map((row, index) => (
          <Row
            key={index}
            category={row.name}
            words={row.prompts.join(', ')}
            difficulty={row.difficulty}
          />
        ))}

        {shuffledPrompts.length > 0 && (
          <>
            {[0, 1, 2, 3].map((rowIndex) => (
              <div className="grid-row" key={rowIndex}>
                {shuffledPrompts.slice(rowIndex * 4, (rowIndex + 1) * 4).map((word, index) => (
                  <Square
                    key={index}
                    word={word}
                    isSelected={selectedSquares.includes(word)}
                    onClick={handleSquareClick}
                    isMistake={isMistake}
                    handleAnimationEnd={handleAnimationEnd}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      {rows.length < 4 ? (
        <div>
          <Mistakes strikes={mistakeStrikes}/>

          <Button text="Shuffle" onClick={shufflePrompts} disabled={false} role="button" aria-label="Shuffle Grid" />
          <Button text="Deselect all" onClick={() => setSelectedSquares([])} disabled={selectedSquares.length == 0} role="button" aria-label="Deselect All Squares" />
          <Button text="Submit" onClick={handleSubmit} disabled={!(selectedSquares.length == 4 && !submitInTimeout)} role="button" aria-label="Submit Selection" />
        </div>
      ) : (
        <div>
          <Button text="View Results" onClick={openResultModal} disabled={false} role="button" aria-label="View Results" />
        </div>
      )}

      <Modal isOpen={resultModalOpen} onClose={closeResultModal} role="dialog" aria-modal="true">
        <div id='result-modal'>
          <h1 id='result-title'>{outcomeText[mistakeStrikes]}</h1>
          <h3>Connections #290</h3> {/* TODO: fix or replace this */}
          <Attempts attempts={attempts}/>
          <h4 className='result-subtitle'>NEXT PUZZLE IN:</h4>
          <Countdown />
          <Button text="Share Your Results" onClick={shareResults} disabled={false} role="button" aria-label="Close Modal"/>
        </div>
      </Modal>
      
    </>
  );
};

export default Grid;