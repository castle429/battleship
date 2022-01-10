
const Player = (name, type) => {
    let ownGameBoard;
    let opponentGameBoard;
    const possibleMoves = [];

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            possibleMoves.push([i, j]);
        }
    }

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

    const getIndexOfMove = (x, y) => {
        for(let i = 0; i < possibleMoves.length; i++) {
            if(possibleMoves[i][0] == x && possibleMoves[i][1] == y) {
                return i;
            }
        }

        return -1;
    }

    const makeAttack = (x, y) => {
        let index = getIndexOfMove(x, y);
        console.log("Index:" + index);

        if(index != -1) {
            possibleMoves.splice(index, 1);
            opponentGameBoard.receiveAttack(x, y);
        }
        else {
            alert("not a valid move");
        }


    }

    const makeComputerAttack = () => {
        if(type == "com") {
            let randIndex = Math.floor(Math.random() * possibleMoves.length);
            let randValue = possibleMoves[randIndex];
            let x = randValue[0];
            let y = randValue[1];

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