var PLAY = 1
var END = 0
var gameState = PLAY;

var mario,block1,block2
var background,ground

var score = 0;

var gameOver; restart;

function preload(){
 mario = loadAnimation("mario-corriendo.gif");

 block1 = loadImage("super-mario-block-png3.png");

 block2 = loadImage("unnamed.png");

 backgroundimg = loadImage("imD41l.jpg");
 gameOverImg = loadImage("d2ff97fd8442124a92acc4b0039fb36a.jpg");
 restart = loadImage("img_440194.png");
}
function setup() {
  createCanvas(600,400);
  mario = createSprite(50,180,20,50);
  ground = createSprite (200,180,400,20)
  ground.x = ground.width /2;
  ground.velocityX  = -(6 + 3*score/100);

  gameOver = createSprite(300,100)
  gameOver.addImage(gameOverImg);
  restart = createsprite(300,100);
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;

  ground = createSprite(200,190,400,10);
  ground.visible = false;

  blocksGroup = new Group();

  score = 0;
}

function draw() {
  background(backgroundimg)
  text ("score: " + score,500,50);

  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    }
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12;
    }

    trex.velocityX = trex.velocityX + 0.8;

   if (ground.x < 0){
     ground.x = ground.width/2;
   }
  
   trex.collide(ground);
   spawnBlocks();

   if(blocksGroup.isTouching(mario)){
     gameState === END;
   }
   
   else if (gameState === END ){
     gameOver.visible = true;
     restart.visible = true;

     ground.velocitiyX = 0;
     mario.velocityY = 0;
     blocksGroup.setVelcoityEach(0);
     
     blocksGroup.setLifetimeEach(-1);

     if(mousePressedOver(restart)){
       reset();
     }
     }

  drawSprites();
}
function spawnBlocks(){
  if (frameCount % 60 ===  0 )  {
    var block = createSprite (600,145,40,10);
    block.velocity = -(6 + 3*score/100);
   
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: block.addImage(block1);
              break;
      case 2: block.addImage(block2);
              break;
      default: break;        
    }

    block.scale = 0.5;
    block.liffetime = 300;

    blocksGroup.add(block);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  blocksGroup.destroyEach()

  score = 0;
}
