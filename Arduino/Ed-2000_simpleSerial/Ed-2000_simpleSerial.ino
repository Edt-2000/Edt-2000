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

String divider = ",";

void setup() {
  Serial.begin(115200);
}

void loop() {
  // Read the values of each pin with a delay to give the analog converter time to recover in between
  Left_X_Val = analogRead(Left_X);
  delay(1);
  Left_Y_Val = analogRead(Left_Y);
  delay(1);
  Left_Z_Val = analogRead(Left_Z);
  delay(1);
  Right_X_Val = analogRead(Right_X);
  delay(1);
  Right_Y_Val = analogRead(Right_Y);
  delay(1);
  Right_Z_Val = analogRead(Right_Z);
  delay(1);
  // Print to a line seperated by divider
  Serial.println(Left_X_Val + divider + Left_Y_Val + divider + Left_Z_Val + divider + Right_X_Val + divider + Right_Y_Val + divider + Right_Z_Val);
}
