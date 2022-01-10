
const DisplayController = (() => {
    'use strict';

    let gameboardDisplay;

    function displayGameboard(gameBoardMatrix, playerName) {
        let gameboardTable = document.createElement("table");
        gameboardTable.classList.add("gameboard");
        gameboardTable.setAttribute("id", playerName);
        
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
        gameboardDisplay = gameboardTable;
    }

    function updateGameboardDisplay(gameBoardMatrix, tableID, x, y) {
        let spotInMatrix = gameBoardMatrix[y][x];
        let table = document.getElementById(tableID);
        let updatedCell = table.querySelector(`[x="${x}"][y="${y}"]`);

        updatedCell.innerHTML = spotInMatrix;
    }



    return {
        displayGameboard,
        updateGameboardDisplay
    }
    
})();

export default DisplayController;