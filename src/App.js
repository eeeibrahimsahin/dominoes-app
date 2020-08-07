import React, { useState } from 'react';
import './App.css';
import PlayGround from './components/PlayGround';
import DominoModal from './components/Modal';

function App() {
    const [isClicked, setIsClicked] = useState(false);
    const [playerOneName, setPlayerOneName] = useState('');
    const [playerTwoName, setPlayerTwoName] = useState('');
    const generateContainer = (maxTileNum, container) => {
        for (let firstElement = 0; firstElement <= maxTileNum; firstElement++) {
            for (
                let secondElement = firstElement;
                secondElement <= maxTileNum;
                secondElement++
            ) {
                container.push([firstElement, secondElement]);
            }
        }
        return container;
    };

    const randomSelector = (container, arr, size) => {
        for (let i = 0; i < size; i++) {
            let index = Math.floor(Math.random() * container.length);
            arr.push(container[index]);
            container.splice(index, 1);
        }
        return arr;
    };

    const [tileContainer, setTileContainer] = useState(() =>
        generateContainer(6, [])
    );

    const [playerOne, setPlayerOne] = useState(() =>
        randomSelector(tileContainer, [], 7)
    );
    const [playerTwo, setPlayerTwo] = useState(() =>
        randomSelector(tileContainer, [], 7)
    );

    const [board, setBoard] = useState(() =>
        randomSelector(tileContainer, [], 1)
    );

    const changeBoard = (newElement) => {
        console.log(newElement);
        setBoard(() => [...newElement]);
    };

    const clickHandler = () => {
        setIsClicked((old) => !old);
    };

    return (
        <div className="App">
            <DominoModal
                type="input"
                show={true}
                player=" One"
                click={(e) => setPlayerOneName(e)}
            />
            {playerOneName && (
                <DominoModal
                    type="input"
                    show={true}
                    player=" Two"
                    click={(e) => setPlayerTwoName(e)}
                />
            )}
            {playerOneName && playerTwoName && (
                <>
                    <div className="player">
                        <PlayGround
                            tiles={playerOne}
                            board={board}
                            container={tileContainer}
                            changeBoard={changeBoard}
                            disable={isClicked}
                            clickHandler={clickHandler}
                            name={playerOneName}
                        />
                    </div>
                    <div className="board">
                        <PlayGround tiles={() => board} name="BOARD" />
                    </div>
                    <div className="player">
                        <PlayGround
                            tiles={playerTwo}
                            board={board}
                            container={tileContainer}
                            changeBoard={changeBoard}
                            disable={!isClicked}
                            clickHandler={clickHandler}
                            name={playerTwoName}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
