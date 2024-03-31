// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Grid.css';
import { Alert, Attempts, Button, Countdown, Mistakes, Modal, Square, Row } from './';

const Grid = () => {
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [categories , setCategories] = useState([]);
  const [shuffledPrompts, setShuffledPrompts] = useState([]);
  const [mistakeStrikes, setMistakeStrike] = useState(0);
  const [rows, setRows] = useState([]);
  const [isMistake, setMistake] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [attempts, setNewAttempt] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

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

  // todo: this is hardcoded data for frontend testing
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
    // generate a flat list of all prompts from categories
    const allPrompts = categories.reduce((acc, curr) => acc.concat(curr.prompts), []);

    // shuffle the prompts randomly
    const shuffled = allPrompts.sort(() => Math.random() - 0.5);

    setShuffledPrompts(shuffled);
  };

  const handleSquareClick = (word) => {
    // if the word is selected, remove it from the selected array
    // elif the word is not selected and there are fewer than 4 selected, append it to the selected array
    if (selectedSquares.includes(word)) {
      setSelectedSquares(selectedSquares.filter((w) => w !== word));
    } else if (!selectedSquares.includes(word) && selectedSquares.length < 4) {
      setSelectedSquares([...selectedSquares, word])
    }
  };

  const handleSubmit = () => {
    if (selectedSquares.length == 4) {
      // is there a category that contains every selected square?
      const match = categories.find(category =>
        selectedSquares.every(square => category.prompts.includes(square))
      );

      processAttempt(selectedSquares);
  
      if (match) { // success: all words are from same category
        setCategories(categories.filter(category => category.name !== match.name));
        setSelectedSquares([]);
        setRows([...rows, match]);
        if (rows.length + 1 == 4) { // take into account async state
          setIsVisible(true);
          setAlertMsg(outcomeText[mistakeStrikes]);
          setTimeout(() => {
            setIsVisible(false);
          }, 3000);
        }
      } else { // mistake: words not from the same category
        setMistakeStrike(prevMistakeStrikes => prevMistakeStrikes + 1);
        
        // vibrate on mistake
        setMistake(true);
        setTimeout(() => {
          setMistake(false);

          // game ends: too many mistakes!
          if (mistakeStrikes + 1 >= 4) { // take into account async state
            setIsVisible(true);
            setAlertMsg(outcomeText[mistakeStrikes+1]);
            setTimeout(() => {
              setIsVisible(false);
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
  }

  const handleAnimationEnd = (event) => {
    if (event.animationName === 'shake') {
      setTimeout(() => {
        setMistake(false);
      }, 300);
    }
  };

  // attempts is a list of len 4 arrays with difficulty ratings of selected words
  const processAttempt = () => {
    var difficulties = []
    selectedSquares.forEach((word) => {
      const difficulty = categories.find(category => category.prompts.includes(word))?.difficulty;
      difficulties.push(difficulty);
    });
    setNewAttempt(prevAttempt => [...prevAttempt, difficulties]);
  }

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
    })
    .catch((error) => {
      console.error('Error copying text: ', error);
    });
  }

  const openResultModal = () => {
      setResultModalOpen(true);
  };

  const closeResultModal = () => {
      setResultModalOpen(false);
  };

  return (
    <>
      <Alert message={alertMsg} isVisible={isVisible} />

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

          <Button text="Shuffle" onClick={shufflePrompts} isActive={true} />
          <Button text="Deselect all" onClick={() => setSelectedSquares([])} isActive={selectedSquares.length > 0} />
          <Button text="Submit" onClick={handleSubmit} isActive={selectedSquares.length == 4} />
        </div>
      ) : (
        <div>
          <Button text="View Results" onClick={openResultModal} isActive={true} />
        </div>
      )}

      <Modal isOpen={resultModalOpen} onClose={closeResultModal}>
        <div id='result-modal'>
          <h1 id='result-title'>{outcomeText[mistakeStrikes]}</h1>
          <h3>Connections #290</h3> {/* TODO: fix or replace this */}
          <Attempts attempts={attempts}/>
          <h4 className='result-subtitle'>NEXT PUZZLE IN:</h4>
          <Countdown />
          <Button text="Share Your Results" onClick={shareResults} isActive={true} />
        </div>
      </Modal>
      
    </>
  );
};

export default Grid;