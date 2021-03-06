import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createGame as createGameApi } from '../../apis';

import { withRouter } from 'react-router';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    innerGroup: {
        margin: '20px'
    },
    outlined: {
        color: 'white',
        borderColor: 'white'
    }
});

const createGame = ({ players, dimension, history }) => {
    createGameApi({ dimension, players })
        .then(({ id }) => {
            history.push(`/${id}`);
        })
        .catch(err => console.error(err));
};

const Config = ({ history }) => {
    const [players, setPlayers] = useState(2);
    const [dimension, setDimension] = useState(3);

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h2>Welcome to Tic Tac Toe</h2>
            <div className={classes.innerGroup}>
                <div>
                    <span>Select Players number</span>
                </div>
                <ToggleButtonGroup
                    value={players}
                    exclusive
                    onChange={e => setPlayers(parseInt(e.currentTarget.value))}
                    aria-label="Players"
                >
                    <ToggleButton value={2} aria-label="2">
                        <span>Two Players</span>
                    </ToggleButton>
                    <ToggleButton value={3} aria-label="3">
                        <span>Three Players</span>
                    </ToggleButton>
                    <ToggleButton value={4} aria-label="4">
                        <span>Four Players</span>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className={classes.innerGroup}>
                <div>
                    <span>Select Grid dimensions</span>
                </div>
                <ToggleButtonGroup
                    value={dimension}
                    exclusive
                    onChange={e => setDimension(parseInt(e.currentTarget.value))}
                    aria-label="Size"
                >
                    <ToggleButton value={3} aria-label="3 x 3">
                        <span>3 x 3</span>
                    </ToggleButton>
                    <ToggleButton value={5} aria-label="5 x 5">
                        <span>5 x 5</span>
                    </ToggleButton>
                    <ToggleButton value={10} aria-label="10 x 10">
                        <span>10 x 10</span>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <Button
                variant="outlined"
                onClick={() => createGame({ dimension, players, history })}
                classes={{ outlined: classes.outlined }}
            >
                <span>Create Game</span>
            </Button>
        </div>
    );
};

export default withRouter(Config);
