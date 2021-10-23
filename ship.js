const ship = (length) => {
    const hitArray = new Array(length);
    let sunk = false;
    
    const hit = (num) => {
        if(num >= 0 && num < length) {
            hitArray[num] = 'X';
        }
    }

    const isSunk = () => {
        for(let i = 0; i < length; i++) {
            if(hitArray[i] != 'X') {
                return;
            }
        }
        sunk = true;
    }

    return {
        hit,
        isSunk
    }
}

module.exports = ship;