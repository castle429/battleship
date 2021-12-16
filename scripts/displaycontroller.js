
const DisplayController = (() => {
    'use strict';

    function displayGameboard(gameBoardMatrix, player) {
        let gameboardTable = document.createElement("table");
        gameboardTable.id = player;
        let gameboardRow;
        for(let i = 0; i < gameBoardMatrix.length; i++) {
            gameboardRow = document.createElement("tr");
            for(let j = 0; j < gameBoardMatrix[0].length; j++) {
                let gameboardCell = document.createElement("td");
                gameboardCell.setAttribute("x", i);
                gameboardCell.setAttribute("y", j);
                
                if(gameBoardMatrix[i][j] != undefined) {
                    gameboardCell.innerHTML = gameBoardMatrix[i][j];
                }
                gameboardRow.appendChild(gameboardCell);
            }
            gameboardTable.appendChild(gameboardRow);
        }
        document.body.appendChild(gameboardTable);
    }

    function registerAttack(gameboard, x, y) {
        if(gameboard[x][y] == undefined) {

        }
    }

    return {
        displayGameboard
    }
    
})();

export default DisplayController;