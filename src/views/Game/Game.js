import React, { useState, useEffect } from 'react';
import { Box, Button } from '@material-ui/core';

const getGame = async id => {
    const resp = await fetch(`https://ttoe.herokuapp.com/games/${id}`);
    return await resp.json();
};

const performMove = async (xPos, yPos, user, gameId) => {
    const resp = await fetch(`https://ttoe.herokuapp.com/games/${gameId}/move`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ xPos, yPos, user })
    });
    return await resp.json();
};

const resolveUserSymbol = userId => {
    switch (userId) {
        case 0:
            return 'X';
        case 1:
            return '0';
        case 2:
            return 'Y';
        case 3:
            return 'T';
        default:
            return null;
    }
};

const resolveSymbol = move => {
    if (move) {
        return resolveUserSymbol(move.user);
    }
    return null;
};

const Game = ({ match }) => {
    const { gameId } = match.params;
    const [game, setGame] = useState();

    const selectItem = (x, y) => {
        performMove(x, y, game.currentPlayer, gameId).then(returnedGame => setGame(returnedGame));
    };

    const buildRow = (extIndex, dimension, moves) => {
        const arr = new Array(dimension);
        return arr.fill().map((_, index) => (
            <Box
                color="text.primary"
                style={{
                    minHeight: '40px',
                    minWidth: '40px',
                    flexGrow: 1,
                    border: '1px white solid',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={() => selectItem(index, extIndex)}
            >
                {resolveSymbol(moves.find(({ xPos, yPos }) => xPos === index && yPos === extIndex))}
            </Box>
        ));
    };

    const buildGrid = (dimension, moves) => {
        const arr = new Array(dimension);
        return arr.fill(1).map((_, index) => {
            return (
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                    {buildRow(index, dimension, moves)}
                </div>
            );
        });
    };

    useEffect(() => {
        getGame(gameId).then(game => {
            setGame(game);
        });
    }, []);
    return (
        <div>
            TicTacToe
            <div>
                <span>{game && game.winner !== null ? 'Winner' : 'Next Player'}: </span>
                <span>{resolveUserSymbol(game && game.currentPlayer)}</span>
            </div>
            <div style={{ minHeight: '50vh', minWidth: '50vh', display: 'flex', flexDirection: 'column' }}>
                {game && buildGrid(game.dimension, game.moves)}
            </div>
        </div>
    );
};

export default Game;
