var database;
var player, form, game;
var allPlayers;
var resetButton;
var gameState, playerCount, carsAtEnd;
var cars, car1, car2, car3, car4;
var tracks, car1_img, car2_img, car3_img, car4_img;

function preload(){
  tracks = loadImage("track.jpg");
  car1_img = loadImage("car1.png");
  car2_img = loadImage("car2.png");
  car3_img = loadImage("car3.png");
  car4_img = loadImage("car4.png");
}

function setup(){
  createCanvas(displayWidth- 50, displayHeight - 100);

  database = firebase.database();
  console.log(database);

  game = new Game();
  game.getGameState();
  game.start();

  // easy reseting of values
  resetButton = createButton('Reset');
  resetButton.position(50, 50);

}

function draw(){

  background(146, 124, 111);
  imageMode (CENTER);
  image (tracks, (displayWidth- 50)/2, (displayHeight - 100)/2, displayWidth- 50, displayHeight*5);

  resetButton.mousePressed(() =>{
    console.log("Reset button pressed");
    game.updateGameState(0);
    player.updatePlayerCount(0);
    player.updateCarsAtEnd(0);
    database.ref('players').remove();
  })

  if(playerCount == 4){
    game.updateGameState(1);
    
  }

  if(gameState == 1){
    clear ();
    game.play();
  }

  if(gameState == 2){
    game.end();
    // If you update gameState in database then car doesn't stop some glitch
    //game.updateGameState(2);
  }

  drawSprites();
}