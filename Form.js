class Form{
    constructor(){
        this.title = createElement('h1');
        this.input = createInput('Name');
        this.button = createButton('Play');
        this.greeting = createElement('h2');
    }

    hide(){
        // hide all the elements
        this.title.hide();
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
    }

    display(){
        this.title.html('Car Racing Game');
        this.title.position((displayWidth- 50)/2, 0);

        this.input.position((displayWidth- 50)/2, 150);
        this.button.position((displayWidth- 50)/2, 200);

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();

            // get name of the player, increase pC as it starts from 0 and update the database
            var name = this.input.value();

            this.greeting.html('Hello ' + name);
            this.greeting.position((displayWidth- 50)/2, 150);

            player.name = name;
            playerCount ++;
           
            player.index = playerCount;
            player.updatePlayerCount(playerCount);
            player.updatePlayerInfo();
        })
    }
}