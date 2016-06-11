// Define analog pins
#define Left_X A3
#define Left_Y A4
#define Left_Z A5

#define Right_X A0
#define Right_Y A2
#define Right_Z A1

#define LED 13

// Define value variables
int Left_X_Val = 0;
int Left_Y_Val = 0;
int Left_Z_Val = 0;

int Right_X_Val = 0;
int Right_Y_Val = 0;
int Right_Z_Val = 0;

String divider = " ";

void setup() {
  Serial.begin(57600);
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
  // Read the values of each pin
  Left_X_Val = analogRead(Left_X);
  Left_Y_Val = analogRead(Left_Y);
  Left_Z_Val = analogRead(Left_Z);
  Right_X_Val = analogRead(Right_X);
  Right_Y_Val = analogRead(Right_Y);
  Right_Z_Val = analogRead(Right_Z);
  digitalWrite(LED, LOW);
  // Print to a line seperated by divider
  Serial.println(Left_X_Val + divider + Left_Y_Val + divider + Left_Z_Val + divider + Right_X_Val + divider + Right_Y_Val + divider + Right_Z_Val);
}
