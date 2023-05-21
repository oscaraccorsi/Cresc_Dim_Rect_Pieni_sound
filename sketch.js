let baseURLSound = 'https://oscaraccorsi.github.io/mp3_files/';
let soundList = ['ac.mp3',
                 'ti.mp3',
                 'tic.mp3',
                 'ticahh.mp3',
                 'ticMin.mp3',
                 'glitch01.mp3',
                 'electro.mp3',
                 'grat.mp3',
                 'nsy.mp3'];
let soundChoice;

let baseUrlPictures = ' https://oscaraccorsi.github.io/tartan/';
let pictureList = ['tartan01.jpeg', 
                   'tartan02.jpeg', 
                   'tartan03.jpeg', 
                   'tartan04.jpg',
                   'tartan05.jpeg', 
                   'tartan06.jpg', 
                   'tartan07.jpg',  
                   'tartan08.jpeg', 
                   'tartan09.jpg', 
                   'tartan10.jpeg', 
                   'tartan11.jpg',
                   'tartan12.png'];

let baseURLImage = "https://oscaraccorsi.github.io/pictures/";

let palette = [];
let logo;
let img;

let squares = [];
let numObjct;
let col;

//--------------------------------------preload
function preload() {
  
  let periodImg = minute() %12;
  let periodSound = minute() % 9 ;
  
  img = loadImage(baseUrlPictures + pictureList[periodImg]);
  logo = loadImage(baseURLImage + "good one white.png");
  soundChoice = loadSound(baseURLSound + soundList[periodSound]);
  console.log(pictureList[periodImg], soundList[periodSound]);
}


//--------------------------------------------------windowResized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let lungArray = [3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
let hiArray; 
let lph = 0;
let alpha, coeffAlpha;
let x, y, lung, vel;
let velArray = [-1, -0.5,-0.25, -0.125, 0.125, -0.05, 0.05,  0.25, 0.5, 1];
let timeArray = [13, 21, 34, 55, 89];
let timeChoice;
let bgColor;

//------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  numObjct = round(random(width / 200, width / 100));
  
  console.log(numObjct);
  
  timeChoice = random(timeArray);
  setInterval(reloadPage, 1000*timeChoice);
  hiArray = [windowHeight, windowHeight/1.5, windowHeight/2, windowHeight/3, windowHeight/5, windowHeight/8, windowHeight/13];
  //------------------------------------------------palette
  img.resize(100, 0);
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let alpha = round(random(0, 255));
    let c = [r, g, b, alpha];
    palette.push(c);
  } 
//--------------------------------------------------------
  
  bgColor = random(palette);
  
  reverb = new p5.Reverb();
  reverb.process(soundChoice, 6, 0, false);
  
  //---------------------------------------------------objects
  for (let i = 0; i < numObjct; i++) {
    squares[i] = {
      lung: random(lungArray),
      x: random(200, width-200),
      y: height/2,//random(0, height),
      col: random(palette),
      vel: random(velArray),
      //alpha: 0,
      coeffAlpha: random(2, 5),
      vert: round(random(5, 30)),
      coeffHi: random(hiArray),
      
      display: function() {
        //stroke(this.col);
        //noFill();
        
        fill(this.col, this.alpha);
        noStroke();
        this.alpha = this.alpha + this.coeffAlpha;
        
        if(this.alpha > 150 || this.alpha < 0) {
        this.coeffAlpha = this.coeffAlpha * -1;
        }
        if(this.alpha < 0) {
          this.x = random(0, width); //----scatto avanti o dietro  
        }
        //console.log(this.col);
        rect(this.x, this.y, this.lung, this.coeffHi)//, this.vert);
    },
      
      move: function() {
        
        this.x += this.vel;
        if(this.x > width-this.lung/2 || this.x < this.lung/2) {
           this.vel = this.vel * -1;
           
          soundChoice.play(0, 1-(this.coeffHi/1000));
          soundChoice.setVolume(1*this.lung/50);
          this.col = random(palette);
       }
    }
  }
}
  
}
//--------------------------------------------DRAW
function draw() {
  background(bgColor, this.alpha);
  
  for (let i = 0; i < squares.length; i++) {
    let r = squares[i];
    squares[i].move();
    squares[i].display();
  } 
}
//--------------------------------space bar
function keyPressed() {
   if (keyCode === 32 ) {
     reloadPage();
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
function reloadPage() {
   window.location.reload();
}

