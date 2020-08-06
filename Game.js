class Game{
  constructor(){

  }

  getGameState(){
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", (data) =>{
      gameState = data.val();
      console.log("GameState in dB is : " + gameState);
    })
  }

  updateGameState(state){
    database.ref('/').update({
      gameState: state
    })
  }

 start(){
   // as the gameState value is not fetched 
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", (data) =>{
      gameState = data.val();

      if(gameState == 0){
        console.log("in start");
        player = new Player();
        player.getPlayerCount();

        form = new Form();
        form.display();
      }

    })

    car1 = createSprite(350, 600);
    car1.addImage(car1_img);

    car2 = createSprite(550, 600);
    car2.addImage(car2_img);

    car3 = createSprite(750, 600);
    car3.addImage(car3_img);

    car4 = createSprite(950, 600);
    car4.addImage(car4_img);

    cars = [car1, car2, car3, car4];
  
  }

  play(){
    form.hide();

    background(146, 124, 111);
    imageMode (CENTER);
    image (tracks, (displayWidth- 50)/2, (displayHeight - 100)/2, displayWidth- 50, displayHeight*5);

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    // for allPlayers JSON
    var plr;
    var ySpacing = 50;

    // for cars array
    var index = 0;
    var x = 350;
    var y;

    for(plr in allPlayers){

      // spot the car
      if(player.index == index + 1){

        cars[index].x = x;
        y = displayHeight - player.distance;
        cars[index].y = y;
       
        camera.position.y = cars[index].y;

        fill ("red");
        circle(x, y, 60);
      }

      // so that only the current car text is in red
      else fill ("black");
      

      x += 200;
      index ++;

      // redundant
      text (allPlayers[plr].name + " : " + allPlayers[plr].distance, (displayWidth- 50)/2, ySpacing);
      ySpacing += 50;
    }

    // move cars up
    if(keyIsDown(UP_ARROW)){
      player.distance += 50;
      player.updatePlayerInfo();
    }

    // ranks
    if(player.distance >= 2000){
      gameState = 2;
      player.rank ++;

      // update rank in database for each player
      player.updatePlayerInfo();

      player.updateCarsAtEnd(player.rank);
    }

  }

  end(){
    console.log("Game Ends");
    console.log("Rank is: " + player.rank);
  }

}