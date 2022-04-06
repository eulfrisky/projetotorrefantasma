var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("path.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("cone.png");
  ghostImg = loadImage("moto.png");
  spookySound = loadSound("musicalegal.mp3");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite (200,200,50,50)
  ghost.scale = 1 ;
  ghost.addImage ("so eu sei" , ghostImg)
  spookySound.loop();
}

function draw() {
  background(0);
  if (gameState=="play") {    
  if(tower.y > 400){
      tower.y = 300
    }
   if (keyDown("left_arrow")){
     ghost.x = ghost.x - 3
   }
   if (keyDown("right_arrow")){
    ghost.x = ghost.x + 3
   } 
   if (keyDown ("space")){
    ghost.velocityY = -10
  
   }
   if (climbersGroup.isTouching(ghost)){
   ghost.velocityY = 0  
   }
   if (climbersGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
     tower.destroy();
     doorsGroup.destroyEach();
     climbersGroup.destroyEach();
     invisibleBlockGroup.destroyEach();
     gameState = ("end")

   }
   createDoors();
  }
  if (gameState == "end"){
    tower.velocityY = 0
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  ghost.velocityY = ghost.velocityY + 0.8
  
  drawSprites();
}

function createDoors () {
 if (frameCount%240 == 0) {
  door = createSprite (200,-50)  
  door.addImage(doorImg)
  door.visible = false

  climber = createSprite (200,5)
  climber.addImage(climberImg)
  invisibleBlock = createSprite (200,10)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2;
  door.x = Math.round(random(120,400))
  door.velocityY = 1
  climber.x = door.x
  climber.velocityY = 1
  invisibleBlock.x = door.x
  invisibleBlock.velocityY = 1
  ghost.depth = door.depth
  ghost.depth +=1
  door.lifetime = 800
  climber.lifetime = 800
  invisibleBlock.lifetime = 800
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlock.debug = false
  invisibleBlock.visible = false
  invisibleBlockGroup.add(invisibleBlock)


 }
}

















































