import processing.sound.*;
FFT fft;
AudioIn in;
int bands = 512;
float[] spectrum = new float[bands];
import oscP5.*;
import netP5.*;

import processing.serial.*;

Serial Arduino1;
Serial Arduino2;

void setup() {
  size(512, 360);
  background(255);

  // Create an Input stream which is routed into the Amplitude analyzer
  fft = new FFT(this);
  in = new AudioIn(this, 0);

  // start the Audio Input
  in.start();

  // patch the AudioIn
  fft.input(in);
  
  printArray(Serial.list());
  
  Arduino1 = new Serial(this, Serial.list()[0], 57600);
  Arduino2 = new Serial(this, Serial.list()[1], 57600);
}      

void draw() { 
  background(255);
  fft.analyze(spectrum);

  
for(int j = 0; j < 7; j++) {
  float sum = 0;
  for(int i = (73 * j) + 10; i < 73 * (j + 1); i++){
    sum += spectrum[i];
  // The result of the FFT is normalized
  // draw the line for frequency band i scaling it up by 5 to get more amplitude.
  } 
  float intensity = (sum / 73) * 25;
  line( j, height, j, intensity * height );
  
  println(intensity);
  
  OscMessage message = new OscMessage("/F" + j);
  message.add(4);
  message.add(0);
  message.add(127);
  message.add(63);
  message.add(95);
  message.add(128);
  message.add(constrain((int)(intensity * 2024), 0, 255));
  Arduino1.write(message.getBytes());
  Arduino2.write(message.getBytes());
}
println();
}
