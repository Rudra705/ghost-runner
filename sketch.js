var towerImg,tower;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroup;
var ghost,ghostImg;
var ibGroup,ib;
var gameState = "play";
var spookySound;
function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png")
  climberImg = loadImage("climber.png");
   spookySound = loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300,10,10);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);
  doorsGroup = new Group();
  ibGroup = new Group();  
  climbersGroup = new Group();
  spookySound.loop();
  
}

function draw() {
  background(0);
  if(gameState === "play") {
    
  
  if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x-3;
  }
    if(keyDown("right_arrow")) {
    ghost.x = ghost.x+3;
  }
    if(keyDown("space")) {
     ghost.velocityY = -5;
    }
  ghost.velocityY = ghost.velocityY+0.8;
  if (ibGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  
    
  spawnDoors();
  drawSprites();
    
  }
  if (gameState === "end"){
    textSize(30);
    stroke("yellow");
    fill("yellow");
    text ("GAME OVER",230,250);
  }
}

function spawnDoors() {
  if(frameCount%240 === 0) {
    door = createSprite(200,-50);
    door.addImage(doorImg);
    climber = createSprite(200,10);
   climber.addImage(climberImg);
    ib = createSprite(200,15);
    ib.width = climber.width;
    ib.height = 2;
    door.x = Math.round(random(120,400));
   door.velocityY = 1;
 
    climber.x = door.x;
    climber.velocityY = 1;
    
    ib.x = door.x;
    ib.velocityY = 1;
    
    
    door.lifeTime = 800;
    climber.lifeTime = 800;
    ib.lifeTime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    ib.debug = true;
    ibGroup.add(ib);
    
      ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
  }
}