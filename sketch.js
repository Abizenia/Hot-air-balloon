var balloon, balloonImg,bg;
var database;
var height;

function preload(){
  bg=loadImage("City.png");
  balloonImg=loadAnimation("hotairballoon01.png","hotairballoon01.png","hotairballoon01.png","hotairballoon02.png","hotairballoon02.png","hotairballoon02.png","hotairballoon03.png","hotairballoon03.png","hotairballoon03.png")
}

function setup() {
  createCanvas(1500,700);
  database=firebase.database();
 balloon= createSprite(250, 650, 150, 150);
 balloon.addAnimation("hotairballoon", balloonImg);
 balloon.scale=0.5;

 var balloonHeight = database.ref('balloon/height');
 balloonHeight.on("value",readHeight,showError)
 textSize(20);
}

function draw() {

  background(bg);  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotairballoon", balloonImg)
  }

  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotairballoon", balloonImg)
  }

  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotairballoon", balloonImg)
    balloon.scale=balloon.scale+0.005
  }

  if(keyDown(Down_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotairballoon", balloonImg)
    balloon.scale=balloon.scale-0.005
  }
  drawSprites();
  fill (0);
  stroke("white");
  textSize(25);
  text("use arrow keys to move your balloon",40,40);
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}

function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("error in writing to the database");
}