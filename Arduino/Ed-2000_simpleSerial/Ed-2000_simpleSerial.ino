// Define analog pins
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

void setup() {
  Serial.begin(115200);
}

void loop() {
  // Read and remap the value to midi-like range 0-127 and print it to the serial, ending with a println
  // The Serial.println gives the analog converter some time to recover as well
  // normally you would have to call a delay(1) between reads
  Serial.print(map(analogRead(Left_X), 0, 1023, 0, 127));
  Serial.print(',');
  Serial.print(map(analogRead(Left_Y), 0, 1023, 0, 127));
  Serial.print(',');
  Serial.print(map(analogRead(Left_Z), 0, 1023, 0, 127));
  Serial.print(',');
  Serial.print(map(analogRead(Right_X), 0, 1023, 0, 127));
  Serial.print(',');
  Serial.print(map(analogRead(Right_Y), 0, 1023, 0, 127));
  Serial.print(',');
  Serial.println(map(analogRead(Right_Z), 0, 1023, 0, 127));
}
