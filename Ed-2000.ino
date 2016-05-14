// http://arduinomidilib.fortyseveneffects.com/a00015.html

// https://www.midi.org/specifications/item/table-1-summary-of-midi-message

#include <MIDI.h>

// Define pins
#define Left_X A3
#define Left_Y A4
#define Left_Z A5

#define Right_X A0
#define Right_Y A2
#define Right_Z A1

// Define value variables
int Left_X_Val = 0;
int Left_Y_Val = 0;
int Left_Z_Val = 0;

int Right_X_Val = 0;
int Right_Y_Val = 0;
int Right_Z_Val = 0;

// Initialize midi library
MIDI_CREATE_DEFAULT_INSTANCE();

void setup() {
  // Initialize MIDI
  MIDI.begin(1);
}

void loop() {
  // Read and remap the value to midi range 0-127 and give the Analog converter some time to recover
  Left_Z_Val = map(analogRead(Left_Z), 0, 1023, 0, 127);
  MIDI.sendControlChange(7, Left_Z_Val, 1);
  
  Right_Z_Val = map(analogRead(Right_Z), 0, 1023, 0, 127);
  MIDI.sendControlChange(1, Left_Y_Val, 1);
}
