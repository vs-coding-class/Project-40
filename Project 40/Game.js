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

    car1 = createSprite(300,200,100,135);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,400);
    car2.addImage("car2",car2_img);
    car3 = createSprite(300,600);
    car3.addImage("car3",car3_img);
    car4 = createSprite(300,800);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0,0,displayWidth*5, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300;
      var y = 200;

      for(var plr in allPlayers){
        index = index + 1 ;

        y = y + 200;

        x = displayWidth - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }

    if(player.distance > 7700){
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
