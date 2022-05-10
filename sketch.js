var sam_running
var sam_jumping
var sam_standing
var sam
var backgroundImg
var score 
var obstacle1 
var obstacle2
var obstacle
var invisible
var obsGroup
var fell
  // var checkpoint
  //  var die
  //  var jump


var PLAY = 1;
var END = 0;

var gameState = PLAY;
//serve

function preload(){

sam_running  = loadAnimation("run1.png", "run2.png","run3.png","run4.png","run5.png","run6.png") 
sam_standing = loadImage("stand.png")
backgroundImg = loadImage("background .png")

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");

fell = loadAnimation("fell.png");



// jump = loadSound ("jump.mp5")
 // die = loadSound ("die.mp5")
// checkpoint = loadSound ("checkpoint.mp5")

}

function setup() {

createCanvas(windowWidth, windowHeight);

backGROUND = createSprite (windowWidth / 2 , windowHeight / 2  , windowWidth , windowHeight)
backGROUND.addImage (backgroundImg)
backGROUND.scale = 2.1;
backGROUND.velocityX = -12

sam = createSprite(400,height-250,20,50);
sam.addAnimation("running", sam_running)


sam.scale = 0.8

invisible = createSprite(width/2,height-181,windowWidth,-1)

sam.addAnimation("fell", fell);
sam.addAnimation("stand",sam_standing);
obsGroup = createGroup();

score = 0

}

function draw() {
background(0);

console.log (sam.y)

  sam.debug = true
  sam.setCollider("rectangle",0,0,sam.width,sam.height)

if (gameState== PLAY){

  if (backGROUND.x < -55){
    backGROUND.x = backGROUND.width/2

}

if (frameCount % 25 == 0){
  score = score+1
}

            //  if ( score>0 && score % 10 === 0) {
            // checkpoint.play()
            //
            // }

spawnObstacles()
obsGroup.setVelocityXEach (-12)

if((touches.length > 0 || keyDown("SPACE")) && sam.y>= 455)  {
   sam.velocityY = -20
   touches = [];
}

sam.velocityY = sam.velocityY + 0.8;

sam.collide (invisible)
invisible.visible = false

if(sam.y< 450){
  sam.changeAnimation("stand",sam_standing)
}

if(sam.y> 450){
  sam.changeAnimation("running", sam_running)
}



if(obsGroup.isTouching(sam)){


  backGROUND.velocityX = 0
  obsGroup.setVelocityXEach (0)
  gameState = END;

  // sam.velocityY = -20

}

}

else if (gameState == END){
  

  backGROUND.velocityX = 0;
  obsGroup.setVelocityXEach (0)
  sam.changeAnimation ("fell", fell);
  sam.y = height-220

  textSize(20);
fill ("black");


}



//console.log(sam.y);





drawSprites();

textSize(20);
fill ("black");
text("Score : " + score , 30,50)

}



function spawnObstacles(){

if (frameCount % 100 == 0){
 var obstacle = createSprite(width+10,height-203,20,50)
 
obstacle.scale = 1

 var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }

    obsGroup.add(obstacle);  
}
}

