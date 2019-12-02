// const baseUrl = "https://ttoe.herokuapp.com";
const baseUrl = "http://localhost:3000";

export const getGame = async id => {
    const resp = await fetch(`${baseUrl}/games/${id}`);
    return await resp.json();
};

export const resetGame = async id => {
    const resp = await fetch(`${baseUrl}/games/${id}/reset`, {
        method: "POST",
    });
    return await resp.json();
};

export const performMove = async (xPos, yPos, user, gameId) => {
    const resp = await fetch(`${baseUrl}/games/${gameId}/move`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ xPos, yPos, user }),
    });
    return await resp.json();
};

export const createGame = async ({ players, dimension }) => {
    const resp = await fetch(`${baseUrl}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dimension, players }),
    });
    return await resp.json();
};
