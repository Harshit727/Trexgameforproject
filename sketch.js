var trex,ground,treximage,groundimage,cloudimage,obstacle1image,obstacle2image,obstacle3image,obstacle4image,obsctacle5image,obstacle6image,count,GameState,ObstacleGroup,CloudGroup,restartimage,GameOverimage,GameOver,Restart

function preload() {
  treximage = loadAnimation("trex1.png","trex3.png","trex4.png")
 groundimage =  loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  obstacle1image = loadImage("obstacle1.png")
  obstacle2image = loadImage("obstacle2.png")
  obstacle3image = loadImage("obstacle3.png")
  obstacle4image = loadImage("obstacle4.png")
  obsctacle5image = loadImage("obstacle5.png")
  obstacle6image = loadImage("obstacle6.png")
  restartimage = loadImage("restart.png")
  GameOverimage = loadImage("gameOver.png")
}




function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200,384,400,10);
  ground.addImage("ground",groundimage)
  trex = createSprite(20,359,20,50);
  trex.addAnimation("trex",treximage)
  count = 0;
  GameState = "PLAY";
   ObstacleGroup = new Group();
   CloudGroup = new Group();
  Restart = createSprite(208,294,20,20)
  Restart.addImage("restart",restartimage)
  GameOver = createSprite(200,200,20,10)
  GameOver.addImage("GameOver",GameOverimage)
trex.scale = 0.5;
}

function draw() {
  background(0);
  
   if(GameState === "PLAY"){
   
  // Make T-rex jump
  if (keyDown("space")&& trex.y >= 354) {
      trex.velocityY = -12 ;
    
    
  }
  
     Restart.visible = false;
     GameOver.visible = false;
     
    text("Score: "+ count, 250, 100);
  // add Gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  trex.collide(ground);
 
  count = count + Math.round(World.frameRate/60);
  
  ground.velocityX = -2;
  ground.velocityY = 0;
  
  if (ground.x <0) {
    ground.x = 200
  }
  
  spawnClouds();
  spawnObstacles();
   }
  
  else if(GameState === "END") {
 GameOver.visible = true;
    Restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
  
    
    //set lifetime of the game objects so that they are never destroyed
    ObstacleGroup.setLifetimeEach(-1);
    CloudGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(Restart)) {
    reset();
  }
     }
drawSprites();
if(trex.isTouching(ObstacleGroup)) {
  GameState = "END";
}
 text("Score: "+ count, 250, 100);
  
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = random(280,320);
    cloud.addImage("cloud",cloudimage)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudGroup.add(cloud);
  }

}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
      
    switch(rand){
case 1 : obstacle.addImage("obstacle1",obstacle1image)
        break;
        
case 2 : obstacle.addImage("obstacle2",obstacle2image)
       break;
        
case 3 : obstacle.addImage("obstacle3",obstacle3image)
        break;
        
case 4 : obstacle.addImage("obstacle4",obstacle4image)
        break;
        
case 5 : obstacle.addImage("obstacle5",obsctacle5image)
        break;
        
case 6 : obstacle.addImage("obstacle6",obstacle6image)
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
   obstacle.lifetime = 70;
 
    ObstacleGroup.add(obstacle);
    
  console.log(rand);
  }
}

function reset(){
  GameState = "PLAY";
  
  
 
  
  ObstacleGroup.destroyEach();
  CloudGroup.destroyEach();
  
 
  
  count = 0;
}