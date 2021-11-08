const ship = require("../scripts/ship");


// tests for hit()

test("hit in bounds should mark as hit", () => {
    testShip = ship(5);
    expect(testShip.hit(3)).toBe("hit");
});

test("hit out of bounds should mark as miss", () => {
    testShip = ship(5);
    expect(testShip.hit(1000)).toBe("miss");
});

test("hit marks 'X' at hit position in hit array", () => {
    testShip = ship(5);
    testShip.hit(3);
    expect(testShip.getHitArray()[3]).toBe("X");
});

test("hit doesn't mark 'X' at given position if position is outside of ship", () => {
    testShip = ship(5);
    testShip.hit(6);
    expect(testShip.getHitArray()[6]).toBeUndefined();
});




// tests for isSunk()

test("ship is sunk if all values of hit array are 'X'", () => {
    testShip = ship(5);
    for(let i = 0; i < 5; i++) {
        testShip.hit(i);
    }
    expect(testShip.isSunk()).toBe(true);
});

test("ship not sunk if not all values in hit array are 'X'", () => {
    testShip = ship(5);
    testShip.hit(0);
    testShip.hit(1);
    testShip.hit(3);
    testShip.hit(4);
    expect(testShip.isSunk()).toBe(false);
});



// tests for getOrientation() and setOrientation()

test("initial orientation is horizontal, denoted by 'H'", () => {
    testShip = ship(5);
    expect(testShip.getOrientation()).toBe("H");
});

test("orientation can be set to 'V'", () => {
    testShip = ship(5);
    testShip.setOrientation('V');
    expect(testShip.getOrientation()).toBe("V");
});

test("return null when orientation not set to 'V' or 'H'", () => {
    testShip = ship(5);
    expect(testShip.setOrientation("hello world")).toBeNull();
});
