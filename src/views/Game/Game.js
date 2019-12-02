import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { performMove, getGame, resetGame as resetGameApi } from "../../apis";
import { resolveSymbol, resolveUserSymbol } from "../../utils";

const useStyles = makeStyles({
    box: {
        minHeight: "40px",
        minWidth: "40px",
        flexGrow: 1,
        border: "1px white solid",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    gridRow: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
    },
    grid: {
        minHeight: "50vh",
        minWidth: "50vh",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "20px 0",
    },
    outlined: {
        color: "white",
        borderColor: "white",
    },
});

const Game = ({ match }) => {
    const { gameId } = match.params;
    const classes = useStyles();
    const [game, setGame] = useState();

    const selectItem = (x, y) => {
        performMove(x, y, game.currentPlayer, gameId)
            .then(returnedGame => setGame(returnedGame))
            .catch(err => console.error(err));
    };

    const resetGame = () => {
        resetGameApi(gameId)
            .then(returnedGame => setGame(returnedGame))
            .catch(err => console.error(err));
    };

    const buildRow = (extIndex, dimension, moves) => {
        const arr = new Array(dimension);
        return arr.fill().map((_, index) => (
            <Box
                color="text.primary"
                className={classes.box}
                onClick={() => selectItem(index, extIndex)}
            >
                {resolveSymbol(
                    moves.find(
                        ({ xPos, yPos }) => xPos === index && yPos === extIndex,
                    ),
                )}
            </Box>
        ));
    };

    const buildGrid = (dimension, moves) => {
        const arr = new Array(dimension);
        return arr
            .fill(1)
            .map((_, index) => (
                <div className={classes.gridRow}>
                    {buildRow(index, dimension, moves)}
                </div>
            ));
    };

    useEffect(() => {
        getGame(gameId)
            .then(game => {
                setGame(game);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <div>
            <h2>TicTacToe</h2>
            <div className={classes.header}>
                <div>
                    <span>
                        {game && game.winner !== null
                            ? "Winner: "
                            : "Next Player: "}
                    </span>
                    <span>{resolveUserSymbol(game && game.currentPlayer)}</span>
                </div>
                <Button
                    variant="outlined"
                    onClick={resetGame}
                    classes={{ outlined: classes.outlined }}
                >
                    Reset
                </Button>
            </div>
            <div className={classes.grid}>
                {game && buildGrid(game.dimension, game.moves)}
            </div>
        </div>
    );
};

export default Game;
