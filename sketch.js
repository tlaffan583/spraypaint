let sprayColor;
let alphaValue = 200; 
let capturer; 
let recording = false; 

function setup() {
  createCanvas(800, 600);
  background(240);
  sprayColor = color(0, alphaValue);
  capturer = new CCapture({ format: 'webm', framerate: 30 }); 
}

function draw() {
  if (mouseIsPressed) {
    spray(mouseX, mouseY); 
  }

  
  if (recording) {
    capturer.capture(canvas);
  }
}


function spray(x, y) {
  noStroke();
  fill(sprayColor);
  for (let i = 0; i < 50; i++) {
    let offsetX = random(-20, 20);
    let offsetY = random(-20, 20);
    ellipse(x + offsetX, y + offsetY, random(1, 4));
  }
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    if (!recording) {
      recording = true;
      capturer.start(); 
      console.log('Recording started');
    } else {
      recording = false;
      capturer.stop(); 
      capturer.save(); 
      console.log('Recording saved');
    }
  }

  if (key === 'r' || key === 'R') {
    sprayColor = (red(sprayColor) === 255) ? color(0, alphaValue) : color(255, 0, 0, alphaValue);
  }

  if (key === 't' || key === 'T') {
    alphaValue = min(255, alphaValue + 20);
    sprayColor.setAlpha(alphaValue);
  }

  if (key === 'y' || key === 'Y') {
    alphaValue = max(0, alphaValue - 20);
    sprayColor.setAlpha(alphaValue);
  }
}
