const ship = require("../scripts/ship.js");
const gameboard = require("../scripts/gameboard");



// Testing ship placement

test("placing ship on gameboard horizontally (in bounds)", () => {
    let testShip = ship(3);
    let testBoard = gameboard();

    testBoard.placeShip(2, 3, testShip);

    let testMatrix = testBoard.getGameMatrix();
    for(let i = 2; i < 5; i++) {
        expect(testMatrix[3][i]).toBe("S");
    }
});

test("placing ship on gameboard vertically (in bounds)", () => {
    let testShip = ship(3);
    testShip.setOrientation("V");

    let testBoard = gameboard();
    let x = 3;
    let y = 1;

    testBoard.placeShip(x, y, testShip);

    let testMatrix = testBoard.getGameMatrix();
    for(let i = y; i < y + 3; i++) {
        expect(testMatrix[i][x]).toBe("S");
    }
});

test("placing ship on gameboard horizontally (out-of-bounds)", () => {
    let testShip = ship(4);
    let testBoard = gameboard();

    expect(testBoard.placeShip(7, 2, testShip)).toBe(false);
});

test("placing ship on gameboard vertically (out-of-bounds)", () => {
    let testShip = ship(4);
    let testBoard = gameboard();
    testShip.setOrientation("V");

    expect(testBoard.placeShip(3, 8, testShip)).toBe(false);
});

test("should not be able to place a ship over another ship", () => {
    let ship1 = ship(3);
    let ship2 = ship(3);
    let testBoard = gameboard();

    ship1.setOrientation("V");
    testBoard.placeShip(3, 1, ship1);

    expect(testBoard.placeShip(2, 2, ship2)).toBe(false);

});




// Testing out-of-bounds for start coordinates

test("x coordinate for placing ship cannot be out of bounds", () => {
    let testShip = ship(3);
    let testBoard = gameboard();

    expect(testBoard.placeShip(11, 2, testShip)).toBe(false);
});

test("y coordinate for placing ship cannot be out of bounds", () => {
    let testShip = ship(3);
    let testBoard = gameboard();

    expect(testBoard.placeShip(2, 11, testShip)).toBe(false);
});


test('does not through out-of-bounds error when parameters are in bounds', () => {
    let testShip = ship(3);
    let testBoard = gameboard();

    expect(testBoard.placeShip(2, 2, testShip)).not.toBe(false);
});



// Testing receiveAttack() on the gameboard

test("successful hit of ship registers in the ship object (horizontal)", () => {
    let testShip = ship(4);
    let testBoard = gameboard();
    let hitArray = testShip.getHitArray();

    testBoard.placeShip(2, 2, testShip);
    testBoard.receiveAttack(2, 2);
    expect(hitArray[0]).toBe("X");
});

test("successful hit of ship registers in the ship object (vertical)", () => {
    let testShip = ship(3);
    let testBoard  = gameboard();
    let hitArray = testShip.getHitArray();

    testShip.setOrientation("V");
    testBoard.placeShip(3, 1, testShip);
    testBoard.receiveAttack(3, 3);

    expect(hitArray[2]).toBe("X");
});

test("miss registers as 'M' at attack location on game matrix", () => {
    let testShip = ship(4);
    let testBoard = gameboard();
    let hitArray = testShip.getHitArray();
    let gameMatrix = testBoard.getGameMatrix();

    testBoard.placeShip(2, 3, testShip);
    testBoard.receiveAttack(3, 5);
    
    for(let i = 0; i < hitArray.length; i++) {
        expect(hitArray[i]).toBe("S");
    }

    expect(gameMatrix[5][3]).toBe("M");
});

test("ship is sunk when all its positions on the gameboard are hit", () => {
    let testShip = ship(4);
    let testBoard = gameboard();
    
    testBoard.placeShip(0, 0, testShip);

    testBoard.receiveAttack(0, 0);
    testBoard.receiveAttack(1, 0);
    testBoard.receiveAttack(2, 0);
    testBoard.receiveAttack(3, 0);

    expect(testShip.isSunk()).toBe(true);
});

test("gameboard should tell if all ships are sunk", () => {
    let testBoard = gameboard();

    for(let i = 0; i < 5; i++) {
        let newShip = ship(2);
        newShip.setOrientation("V");
        testBoard.placeShip(i, 0, newShip);
    }

    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 2; j++) {
            testBoard.receiveAttack(i, j);
        }
    }

    expect(testBoard.allShipsSunk()).toBe(true);
});

