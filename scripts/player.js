
const Player = (name, type) => {
    let ownGameBoard;
    let opponentGameBoard;
    let prevMoves = [];
    let isTurn = true;

    const setOwnGameboard = (gameboard) => {
        ownGameBoard = gameboard;
    }

    const getOwnGameboard = () => {
        return ownGameBoard;
    }

    const setOpponentGameboard = (gameboard) => {
        opponentGameBoard = gameboard;
    }

    const getOpponentGameboard = () => {
        return opponentGameBoard;
    }

    const getName = () => {
        return name;
    }

    const makeAttack = (x, y) => {
        if(!prevMoves.includes([x, y]) && isTurn) {
            opponentGameBoard.receiveAttack(x, y);
            prevMoves.push([x, y]);
            isTurn = false;
        }

        else if(!isTurn) {
            isTurn = true;
            return false;
        }

        else {
            return false;
        }
    }

    const makeComputerAttack = () => {
        if(type == "com") {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            makeAttack(x, y);
            return [x, y];
        }
        
        else {
            return false;
        }
    }

    return {
        setOwnGameboard,
        getOwnGameboard,
        setOpponentGameboard,
        getOpponentGameboard,
        makeAttack,
        makeComputerAttack,
        getName,
    }
}

export default Player;