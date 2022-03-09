var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup= new Group()

  
}

function draw() {
  background(0);
  if (gameState=='play'){

    if (keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-3
    }

    if (keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+3
    }

    if(keyDown("space")){
      ghost.velocityY = -10
    }

    ghost.velocityY=ghost.velocityY+0.5;

    obstacles()

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      gameState="end"

    }




    if(tower.y > 400){
      tower.y = 300
    }
  drawSprites()

  }
  else if (gameState=='end'){
    textSize(30)
    fill("yellow")
    stroke("yellow")
    text('GAME OVER',230,250)
  }
}

function obstacles(){
  if(frameCount%200==0){
    var door= createSprite(Math.round(random(100,500)),0)
    door.addImage(doorImg)
    door.velocityY=1
    door.lifetime=600
    ghost.depth=door.depth+1
    doorsGroup.add(door)


    var climber= createSprite(door.x,door.y+50)
   climber.addImage(climberImg)
   climber.velocityY=1
   climber.lifetime=600
   climber.scale=0.8
   climbersGroup.add(climber)

   var invisibleBlock= createSprite(door.x,door.y+70,climber.width,15)
   invisibleBlock.velocityY=1
   invisibleBlock.lifetime=600
  invisibleBlock.visible=false
   invisibleBlockGroup.add(climber)
   
  }
}
