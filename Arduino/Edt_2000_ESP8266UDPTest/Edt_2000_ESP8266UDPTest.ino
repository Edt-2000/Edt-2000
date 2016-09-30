void setup() { 
  pinMode(5,OUTPUT);
}
void loop() { 
  pinMode(5,LOW);
  delay(1000);
  pinMode(5,HIGH);
  delay(1000);
}

