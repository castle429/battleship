import ship from "./ship.js";
import Player from "./player.js";
import GameBoard from "./gameboard.js";
import DisplayController from "./displaycontroller.js";
import EventController from "./eventcontroller.js";

const Game = (() => {
    'use strict';
    let lastCoordinatesHit = -1;
    let turn = 0;

    function setupEvents(player1, player2) {
        document.addEventListener("click", (e) => {
            lastCoordinatesHit = EventController.registerHit(e);
            startLoop(player1, player2);
        });
    }

    function initialize() {

        let player1 = Player("player", "player");
        let player2 = Player("robot", "com");

        let playerBoard = GameBoard();
        let comBoard = GameBoard();

        player1.setOwnGameboard(playerBoard);
        player1.setOpponentGameboard(comBoard);

        player2.setOwnGameboard(comBoard);
        player2.setOpponentGameboard(playerBoard);

        setupShips(player1.getOwnGameboard());
        setupShips(player2.getOwnGameboard());

        DisplayController.displayGameboard(playerBoard.getGameMatrix(), player1.getName());
        DisplayController.displayGameboard(comBoard.getGameMatrix(), player2.getName());
        
        console.log(comBoard.getGameMatrix());
    
        setupEvents(player1, player2);

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

    function startLoop(player1, player2) {
        if(turn % 2 == 0) {
            player1.makeAttack(lastCoordinatesHit[0], lastCoordinatesHit[1]);
            DisplayController.updateGameboardDisplay(player2.getOwnGameboard().getGameMatrix(), "robot", lastCoordinatesHit[0], lastCoordinatesHit[1]);
            turn++;        
        
            
            let computerAttack = player2.makeComputerAttack();

            DisplayController.updateGameboardDisplay(player1.getOwnGameboard().getGameMatrix(), "player", computerAttack[0], computerAttack[1]);
            turn++;

            checkForWin(player1, player2);
        }
    }

    function checkForWin(player1, player2) {
        
    }


    return {
        initialize
    }

})();

Game.initialize();

