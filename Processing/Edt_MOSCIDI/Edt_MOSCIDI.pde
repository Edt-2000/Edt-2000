import netP5.*;
import oscP5.*;
import themidibus.*;
import controlP5.*;

ControlP5 cp5;
MidiBus midi;
DropdownList midiInDropdown, midiOutDropdown;
Textarea logArea;

OscP5 osc;
NetAddress loc;

void setup() {
  size(240, 500);
  MidiBus.list();
  
  osc = new OscP5(this, 12346);
  loc = new NetAddress("127.0.0.1", 12345);
  osc.plug(this, "oscToMidiNote", "/midi/note");
  osc.plug(this, "oscToMidiCC", "/midi/cc");
  
  midi = new MidiBus(this, 0, 1);
  cp5 = new ControlP5(this);
  
  cp5.addTextfield("inputPort")
    .setPosition(20, nextY())
    .setSize(200,20)
    .setValue("12346")
    .setAutoClear(false);
    
  cp5.addTextfield("outputPort")
    .setPosition(20, nextY())
    .setSize(200, 20)
    .setValue("12345")
    .setAutoClear(false);
    
  midiInDropdown = cp5.addDropdownList("midiIn")
    .setPosition(20, nextY())
    .setSize(200, 50);
    
    
  midiOutDropdown = cp5.addDropdownList("midiOut")
    .setPosition(20, nextY())
    .setSize(200, 50);
    
  String[] inputs = MidiBus.availableInputs();
  for (int i = 0; i < inputs.length; i++) {
    midiInDropdown.addItem(inputs[i], i);
  }
  midiInDropdown.setValue(0);
  midiInDropdown.setOpen(false);
  
  String[] outputs = MidiBus.availableOutputs();
  for (int i = 0; i < outputs.length; i++) {
    midiOutDropdown.addItem(outputs[i], i);
  }
  midiInDropdown.setValue(1);
  midiOutDropdown.setOpen(false);
  
  cp5.addButton("Update")
    .setValue(0)
    .setPosition(20, nextY())
    .setSize(200, 20);
    
  logArea = cp5.addTextarea("Logs")
    .setPosition(20, nextY())
    .setSize(200, 200);
  
}
int y = 20;
private int nextY() {
  int tempY = y;
  y += 50;
  return tempY;
}

void draw() {
  background(0);
  fill(255);
}

public void Update() {
  if (midi != null) {
    midi.clearAll();
  }
  midi = new MidiBus(this, (int)midiInDropdown.getValue(), (int)midiOutDropdown.getValue());
  midi.sendNoteOn(0, 44, 127);
}

// OSC -> MIDI

public void oscToMidiNote(int note, int value) {
  log("Got OSC Note: " + note + " Velocity: " + value); 
  midi.sendNoteOn(0, note, value);
}

public void oscToMidiCC(int control, int value) {
  log("Got OSC CC: " + control + " Value: " + value);
   midi.sendControllerChange(0, control, value);
}

// MIDI -> OSC

void noteOn(int channel, int pitch, int velocity) {
  log("Got MIDI Note On: " + pitch + " Velocity: " + velocity);
  OscMessage msg = new OscMessage("/midi/note");
  msg.add(channel);
  msg.add(pitch);
  msg.add(velocity);
  osc.send(msg, loc);
}

void noteOff(int channel, int pitch, int velocity) {
  log("Got MIDI Note Off: " + pitch + " Velocity: " + velocity);
  OscMessage msg = new OscMessage("/midi/note");
  msg.add(channel);
  msg.add(pitch);
  msg.add(velocity);
  osc.send(msg, loc);
}

void controllerChange(int channel, int number, int value) {
  log("Got MIDI CC: " + number + " Velocity: " + value);
  OscMessage msg = new OscMessage("/midi/note");
  msg.add(channel);
  msg.add(number);
  msg.add(value);
  osc.send(msg, loc);
}

private void log(String msg) {
  println("Debug: " + msg);
  logArea.setText(msg + "\n" + logArea.getText());
}
