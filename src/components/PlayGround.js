import React, { useState, useEffect } from 'react';
import Store from './Store';
import DominoModal from './Modal';
export default function PlayGround(props) {
    const [tiles, setTiles] = useState(props.tiles);
    const [board, setBoard] = useState(props.board || null);
    const [container, setContainer] = useState(props.container || null);
    const [connectedTiles, setConnectedTiles] = useState([]);
    const [finishControl, setFinishControl] = useState([]);
    const [playerName, setPlayerName] = useState(props.name);

    const randomSelector = (container, arr, size) => {
        for (let i = 0; i < size; i++) {
            let index = Math.floor(Math.random() * container.length);
            arr.push(container[index]);
            container.splice(index, 1);
        }
        return arr;
    };
    const findValidTile = (tileContainer, boardTiles, playerTiles) => {
        let isFinish = false;
        let validTile = [];
        while (!isFinish) {
            validTile = playerTiles.find((tile) => {
                return tile.includes(
                    boardTiles[0][0] || boardTiles[boardTiles.length - 1][1]
                );
            });
            validTile === undefined
                ? tileContainer.length > 0
                    ? randomSelector(tileContainer, playerTiles, 1)
                    : (isFinish = true)
                : (isFinish = true);
        }

        return validTile;
    };

    const boardHandler = (
        validTile,
        playerTiles,
        boardTiles,
        connectedTiles,
        finishControl
    ) => {
        if (validTile !== undefined) {
            let indexOfTile = playerTiles.indexOf(validTile);
            connectedTiles.splice(0, 1, validTile);
            if (boardTiles[0][0] === validTile[0]) {
                connectedTiles.splice(1, 2, boardTiles[0]);
                boardTiles.unshift(validTile.reverse());
            } else if (boardTiles[0][0] === validTile[1]) {
                connectedTiles.splice(1, 2, boardTiles[0]);
                boardTiles.unshift(validTile);
            } else if (boardTiles[boardTiles.length - 1][1] === validTile[0]) {
                connectedTiles.splice(1, 2, boardTiles[boardTiles.length - 1]);
                boardTiles.push(validTile);
            } else if (boardTiles[boardTiles.length - 1][1] === validTile[1]) {
                connectedTiles.splice(1, 2, boardTiles[boardTiles.length - 1]);
                boardTiles.push(validTile.reverse());
            }
            playerTiles.splice(indexOfTile, 1);
        } else finishControl.push(1);
    };

    const playHandler = async () => {
        let containerArr = [...container];
        let validTile = await findValidTile(containerArr, board, tiles);
        setContainer(() => containerArr);
        let arr = [...tiles];
        await boardHandler(
            validTile,
            arr,
            board,
            connectedTiles,
            finishControl
        );

        setTiles(() => arr);
        await props.changeBoard(board);
        await props.clickHandler();
    };

    return (
        <>
            <h1>{playerName}</h1>
            {props.board && (
                <button onClick={playHandler} disabled={props.disable}>
                    Play
                </button>
            )}

            {tiles.length === 0 && (
                <DominoModal
                    body={`${playerName} win...`}
                    title="Game is finished"
                    show={true}
                />
            )}
            {container !== null
                ? container.length === 0 && (
                      <DominoModal
                          show={true}
                          body={'Count your tiles'}
                          title="Tile is finished"
                      />
                  )
                : null}
            <Store tiles={tiles} />
        </>
    );
}
