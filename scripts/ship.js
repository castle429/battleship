const ship = (length) => {
    const hitArray = new Array(length);
    for(let i = 0; i < length; i++) {
        hitArray[i] = 'S';
    }
    let sunk = false;
    let orientation = 'H';


    const hit = (num) => {
        if(num >= 0 && num < length) {
            hitArray[num] = 'X';
            return "hit";
        }
        return "miss";
    }

    const isSunk = () => {
        sunk = true;
        for(let i = 0; i < length; i++) {
            if(hitArray[i] != 'X') {
                sunk = false;
                break;
            }
        }
        return sunk;
    }

    const getHitArray = () => {
        return hitArray;
    }

    const setOrientation = (newOrientation) => {
        if(newOrientation == "H" || newOrientation == "V") {
            orientation = newOrientation;
        }
        else {
            return null;
        }
    }

    const getOrientation = () => {
        return orientation;
    }

    return {
        hit,
        isSunk,
        getHitArray,
        setOrientation,
        getOrientation
    }
}

export default ship;