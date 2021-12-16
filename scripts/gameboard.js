
const GameBoard = () => {
    const gameMatrix = [];
    let ships = [];
    let numShipsSunk = 0;

    for(let i = 0; i < 10; i++) {
        gameMatrix[i] = new Array(10);
    }

    const coordsAreValid = (x, y) => {
        return x > -1 && y > -1 && x < gameMatrix.length && y < gameMatrix.length;
    }

    const spaceIsUnoccupied = (x, y, orient, length) => {
        if(orient == 'H') {
            for(let i = x; i < x + length; i++) {
                if(gameMatrix[y][i] == 'S') {
                    return false;
                } 
            }
        }
        
        if(orient == 'V') {
            for(let i = y; i < y + length; i++) {
                if(gameMatrix[i][x] == 'S') {
                    return false;
                }
            }
        }

        return true;
    }

    const addShipToList = (ship, y, x) => {
        let shipArr = [ship, y, x];
        ships.push(shipArr);
    }

    const placeShip = (xCoord, yCoord, ship) => {
        let orientation = ship.getOrientation();
        let shipLength = ship.getHitArray().length;

        if(!coordsAreValid(xCoord, yCoord) || !spaceIsUnoccupied(xCoord, yCoord, orientation, shipLength)) {
           return false;
        }

        if(orientation == 'H') {
            for(let i = xCoord; i < xCoord + shipLength; i++) {
                gameMatrix[yCoord][i] = ship.getHitArray()[i-xCoord];
            }
        }
        if(orientation == 'V') {
            for(let i = yCoord; i < yCoord + shipLength; i++) {
                gameMatrix[i][xCoord] = ship.getHitArray()[i-yCoord];
            }
        }

        addShipToList(ship, yCoord, xCoord);
        return true;
    }

    const receiveAttack = (x, y) => {
        let positionToHit;

        for(let i = 0; i < ships.length; i++) {
            let ship = ships[i][0];
            let shipY = ships[i][1];
            let shipX = ships[i][2];

            if(ship.getOrientation() == 'H') {
                if(y == shipY) {
                    positionToHit = x - shipX;
                    let attack = ship.hit(positionToHit);
                    if(attack == "miss") {
                        gameMatrix[y][x] = "M";
                    }
                    else {
                        gameMatrix[y][x] = "X";
                    }
                }
                else {
                    gameMatrix[y][x] = "M";
                }
            }

            if(ship.getOrientation() == 'V') {
                if(x == shipX) {
                    positionToHit = y - shipY;
                    let attack = ship.hit(positionToHit);
                    if(attack == "miss") {
                        gameMatrix[y][x] = "M";
                    }
                    else {
                        gameMatrix[y][x] = "X";
                    }
                }
                else {
                    gameMatrix[y][x] = "M";
                }
            }

            if(ship.isSunk()) {
                numShipsSunk++;
            }
        }

        if(gameMatrix[y][x] == undefined) {
            gameMatrix[y][x] = "M";
        }
    }

    const getGameMatrix = () => {
        return gameMatrix;
    }

    const allShipsSunk = () => {
        return numShipsSunk / 5 == 5;
    }

    return {
        placeShip,
        getGameMatrix,
        receiveAttack,
        allShipsSunk
    }
}

export default GameBoard;