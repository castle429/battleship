const ship = require("../scripts/ship");
const gameboard = require("../scripts/gameboard");
const player = require("../scripts/player");


test("player can initialize their own gameboard (player gameboard is not null)", () => {
    let player1 = player("jenkins", "player");
    let playerBoard = gameboard();
    let testBoard = gameboard();

    player1.setOwnGameboard(playerBoard);
    expect(player1.getOwnGameboard()).toMatchObject(testBoard);
});