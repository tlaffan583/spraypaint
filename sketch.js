let sprayColor;
let alphaValue = 200; // Default transparency
let capturer; // CCapture instance
let recording = false; // Flag to check if recording

function setup() {
  createCanvas(800, 600);
  background(240);
  sprayColor = color(0, alphaValue);
  capturer = new CCapture({ format: 'webm', framerate: 30 }); // Setup CCapture
}

function draw() {
  if (mouseIsPressed) {
    spray(mouseX, mouseY); // Draw spray effect
  }

  // If recording, capture each frame
  if (recording) {
    capturer.capture(canvas);
  }
}

// Spray effect function
function spray(x, y) {
  noStroke();
  fill(sprayColor);
  for (let i = 0; i < 50; i++) {
    let offsetX = random(-20, 20);
    let offsetY = random(-20, 20);
    ellipse(x + offsetX, y + offsetY, random(1, 4));
  }
}

// Toggle recording with key presses
function keyPressed() {
  if (key === 's' || key === 'S') {
    if (!recording) {
      recording = true;
      capturer.start(); // Start recording
      console.log('Recording started');
    } else {
      recording = false;
      capturer.stop(); // Stop recording
      capturer.save(); // Save the video
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
