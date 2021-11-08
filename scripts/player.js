import { GameBoard } from "./gameboard";


const Player = () => {
    let enemyGameboard;
    let ownGameBoard;

    const setOwnGameboard = (gameboard) => {
        ownGameBoard = gameboard;
    }

    const setEnemyGameboard = (gameboard) => {
        enemyGameboard = gameboard;
    }

    const placeShipOnBoard = (x, y, ship) => {
        ownGameBoard.placeShip(x, y, ship);
    }

    const makeAttack = (xCoord, yCoord) => {
        enemyGameboard.receiveAttack(xCoord, yCoord);
    }

    return {
        setOwnGameboard,
        setEnemyGameboard,
        makeAttack
    }


}