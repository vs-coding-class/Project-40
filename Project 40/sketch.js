var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var car_1,car_2,car_3,car_4,track,track_img;

function preload(){
  car_1 = loadAnimation("images/r1.png","images/r2.png","images/r3.png","images/r4.png");
  start_img = loadImage("images/start1.png");
  car_2 = loadAnimation("images/runner22.png","images/runner23.png","images/runner24.png");
  car_3 = loadImage("images/plr1.png");
  car_4 = loadImage("images/plr2.png");
  track = loadImage("images/track.png");
  obs_image = loadImage("images/hurdle.png");
}

function setup(){
  canvas = createCanvas(displayWidth-30, 400);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }
}
