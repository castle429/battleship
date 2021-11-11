const Player = (name, type) => {
    let ownGameBoard;

    const setOwnGameboard = (gameboard) => {
        ownGameBoard = gameboard;
    }

    const getOwnGameboard = () => {
        return ownGameBoard;
    }

    return {
        setOwnGameboard,
        getOwnGameboard,
    }
}

module.exports = Player;
