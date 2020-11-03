
class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addAnimation("car1",car_1);
    car1.addImage("c1", start_img);
    car1.scale = 0.5;
    car2 = createSprite(50,400);
    car2.addAnimation("car2",car_2);
    car2.addImage("c2", start_img)
    car2.scale = 1;
    car3 = createSprite(100,600);
    car3.addImage("car3",car_3);
    car3.scale = 0.2;
    car4 = createSprite(100,800);
    car4.addImage("car4",car_4);
    car4.scale = 0.2;
      
    cars = [car1, car2, car3, car4]; 
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    if(allPlayers !== undefined){     
      background("lightgreen");

      image(track,0,400,displayWidth*2,400);
      car1.changeImage("c1", start_img);
      car2.changeImage("c2", start_img);
      car3.changeImage("c3", start_img);
      car4.changeImage("c4", start_img);

      var index = 0;
      var x;
      var y  = 200;
        

      for(var plr in allPlayers){ 
        index = index + 1;
        y = y + 200;
        x = allPlayers[plr].distance;

        if (index === player.index){
          stroke(10);
          fill("yellow");
          cars[index-1].position.x = x;
          cars[index-1].position.y = y;
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].position.x;
        }  
      }

      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        car1.changeAnimation("car1",car_1);
        car2.changeAnimation("car2",car_2);
        car3.changeAnimation("car3",car_3);
        car4.changeAnimation("car4",car_4);
        player.distance += 10;
        player.update();
      }
    }
      
    spawnObstacles();

    if(player.distance > 3000){
      gameState = 2;
    }

    car1.y = mouseY+300;
    drawSprites();
  }
}

function spawnObstacles(){
if(World.frameCount%100===0){
  obs1 = createSprite(3000,450,20,20);
  obs1.addImage("hurdle",obs_image);
  obs1.velocityX = -6;
  obs1.scale = 0.5;
}
}