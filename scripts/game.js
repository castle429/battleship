import ship from "./ship.js";
import Player from "./player.js";
import GameBoard from "./gameboard.js";
import DisplayController from "./displaycontroller.js";

const Game = (() => {
    'use strict';

    function startGame(player1Name) {
        let player1 = Player(player1Name, "player");
        let comPlayer = Player("robot", "com");

        let playerBoard = GameBoard();
        let comBoard = GameBoard();

        player1.setOwnGameboard(playerBoard);
        player1.setOpponentGameboard(comBoard);

        comPlayer.setOwnGameboard(comBoard);
        comPlayer.setOpponentGameboard(playerBoard);

        setupShips(player1.getOwnGameboard());
        setupShips(comPlayer.getOwnGameboard());

        DisplayController.displayGameboard(playerBoard.getGameMatrix(), player1.getName());
    }

    function setupShips(gameboard) {

        let patrolBoat = ship(2);
        gameboard.placeShip(0, 0, patrolBoat);

        let submarine = ship(3);
        gameboard.placeShip(0, 2, submarine);

        let destroyer = ship(3);
        gameboard.placeShip(0, 4, destroyer);

        let battleship = ship(4);
        gameboard.placeShip(0, 6, battleship);

        let carrier = ship(5);
        gameboard.placeShip(0, 8, carrier)
    }

    return {
        startGame
    }

})();

Game.startGame();