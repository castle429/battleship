
const EventController = (() => {

    function registerHit(event) {
        let cellX = event.target.getAttribute("x");
        let cellY = event.target.getAttribute("y");
        let boardHit = event.target.parentNode.parentNode.getAttribute("id");
        if(cellX != null && cellY != null) {
            console.log("Parent board: " + boardHit);
            return [Number(cellX), Number(cellY)];          
        }
    }

    

    return {
        registerHit,
    }


})();

export default EventController;