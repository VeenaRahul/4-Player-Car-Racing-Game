class Player{
    constructor(){
        this.name = null;
        this.distance = 0;
        // to see the index clearly
        this.index = 0;
        this.rank = 0;
    }

    getPlayerCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) =>{
            playerCount = data.val();
            console.log("PlayerCount in dB is : " + playerCount);
        })
    }

    updatePlayerCount(count){
        database.ref('/').update({
            playerCount: count
        })
    }

    // we want player info at once without refering to each player in a loop so create a static function that can be called for class 
    static getPlayerInfo(){
        database.ref('players').on("value", (data) => {
            allPlayers = data.val();
            
        })
    }

    updatePlayerInfo(){
        database.ref('players/player' + this.index).update({
            name: this.name,
            distance: this.distance,
            rank: this.rank,
            index: this.index
        })
    }

    getCarsAtEnd(){
        var carsRef = database.ref('carsAtEnd');
        carsRef.on("value", (data) => {
            carsAtEnd = data.val();
            console.log("Cars at end in dB : " + carsAtEnd);
            this.rank = carsAtEnd;
        })
    }

    // no need to create a static function each player will update his own rank
    updateCarsAtEnd(rank){
        database.ref('/').update({
            carsAtEnd: rank
        })
    }
}