import netP5.*;
import oscP5.*;

/**
 * Simple Read
 * 
 * Read data from the serial port and change the color of a rectangle
 * when a switch connected to a Wiring or Arduino board is pressed and released.
 * This example works with the Wiring / Arduino program that follows below.
 */


import processing.serial.*;

Serial myPort;  // Create object from Serial class
int val;      // Data received from the serial port

OscP5 oscP5;
NetAddress myRemoteLocation;

void setup() 
{
  size(200, 200);
  myRemoteLocation = new NetAddress("127.0.0.1", 8000);
  oscP5 = new OscP5(this, 12000);
  
  myPort = new Serial(this, "/dev/cu.usbmodem14141", 1000000);
  myPort.bufferUntil(':');
}

void draw()
{
  rect(50, 50, 100, 100);
}

void serialEvent (Serial myPort) {
  // Read until our separator
  String input  = myPort.readStringUntil(':');
  // Remove : at the end
  String[] inputs = input.substring(0, input.length() - 1).split("-");
  // Create an int holder
  int[] values = new int[inputs.length];
  
  // Parse to ints, or set to 0 if garbage data
  for(int i = 0; i < inputs.length; i++) {
    try {
      values[i] = Integer.parseInt(inputs[i]);
    } catch (NumberFormatException e) {
      values[i] = 0;
    }
  }
  
  // Send to Max
  OscMessage myMessage = new OscMessage("/edt");
  myMessage.add(values);
  oscP5.send(myMessage, myRemoteLocation); 
}