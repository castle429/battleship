const ship = require("../scripts/ship");
const gameboard = require("../scripts/gameboard");
const Player = require("../scripts/player");


test("player can initialize their own gameboard (player gameboard is not null)", () => {
    let player1 = Player("jenkins", "player");
    let playerBoard = gameboard();

    player1.setOwnGameboard(playerBoard);
    expect(player1.getOwnGameboard()).toMatchObject(playerBoard);
});

test("player can set their opponent's gameboard (and opponent's gameboard is not null)", () => {
    let player1 = Player("jenkins", "player");
    let opponentBoard = gameboard();

    player1.setOpponentGameboard(opponentBoard);
    expect(player1.getOpponentGameboard()).toMatchObject(opponentBoard);
});

test("player can make attack against opponent gameboard (registers as hit)", () => {
    let player1 = Player("jenkins", "player");
    let opponentBoard = gameboard();

    player1.setOpponentGameboard(opponentBoard);
    opponentBoard = player1.getOpponentGameboard();

    let opponentShip = ship(5);
    opponentBoard.placeShip(0, 0, opponentShip);


    player1.makeAttack(0, 0);
    expect(opponentBoard.getGameMatrix()[0][0]).toBe('X');
});

test("player can make attack against opponent gameboard (registers as miss)", () => {
    let player1 = Player("jenkins", "player");
    let opponentBoard = gameboard();

    player1.setOpponentGameboard(opponentBoard);
    opponentBoard = player1.getOpponentGameboard();

    let opponentShip = ship(5);
    opponentBoard.placeShip(0, 0, opponentShip);

    player1.makeAttack(4, 4);
    expect(opponentBoard.getGameMatrix()[4][4]).toBe('M');
})

test("computer player makes random attack, and attack registers on enemy board", () => {
    let roboCop = Player("robocop", "com");
    let opponentBoard = gameboard();

    roboCop.setOpponentGameboard(opponentBoard);
    opponentBoard = roboCop.getOpponentGameboard();

    let opponentShip = ship(5);
    opponentBoard.placeShip(0, 0, opponentShip);

    let attackCoordinates = roboCop.makeComputerAttack();

    let gameBoardMatrix = opponentBoard.getGameMatrix();
    let valueOfAttack = gameBoardMatrix[attackCoordinates[1]][attackCoordinates[0]];

    expect(valueOfAttack == 'M' || valueOfAttack == 'X').toBe(true);
});

test("computer player does not attack same coordinate twice", () => {
    let roboCop = Player("robocop", "com");
    let opponentBoard = gameboard();
    let opponentMatrix = opponentBoard.getGameMatrix();

    roboCop.setOpponentGameboard(opponentBoard);

    while(opponentMatrix.some(row => row.includes(undefined))) {
        roboCop.makeComputerAttack();
    }

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            expect(opponentMatrix[i][j]).toBe("M");
        }
    }
});

test("player cannot make move if it is not their turn", () => {
    let player = Player("jeorgio jeffersonio", "player");
    let opponentBoard = gameboard();
    player.setOpponentGameboard(opponentBoard);

    player.makeAttack(4, 2);

    expect(player.makeAttack(3, 4)).toBe(false);
})