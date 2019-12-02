export const resolveUserSymbol = userId => {
    switch (userId) {
        case 0:
            return "X";
        case 1:
            return "0";
        case 2:
            return "Y";
        case 3:
            return "T";
        default:
            return null;
    }
};

export const resolveSymbol = move => {
    if (move) {
        return resolveUserSymbol(move.user);
    }
    return null;
};
