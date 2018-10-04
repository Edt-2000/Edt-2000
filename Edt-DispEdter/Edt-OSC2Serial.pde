import oscP5.*;
import netP5.*;
OscP5 oscP5;

import processing.serial.*;

Serial Arduino1;
Serial Arduino2;

void setup() {
  size(400,400);
  frameRate(1);
  
  oscP5 = new OscP5(this, 12345);
 
  printArray(Serial.list());
  
  Arduino1 = new Serial(this, Serial.list()[4], 57600);
  Arduino2 = new Serial(this, Serial.list()[5], 57600);
}


void draw() {
  background(0);
}

void oscEvent(OscMessage OSC) {
  print(" addrpattern: "+OSC.addrPattern());
  Arduino1.write(OSC.getBytes());
  Arduino2.write(OSC.getBytes());
}
