#include <Wire.h>
#include "nunchuck_funcs.h"

int loop_cnt = 0;

byte accx, accy, zbut, cbut, joyx, joyy;
#define LED 13;

String divider = " ";


void setup()
{
  Serial.begin(57600);
  nunchuck_setpowerpins();
  nunchuck_init(); // send the initilization handshake
}

void loop()
{
  nunchuck_get_data();

  joyx = nunchuck_joyx();
  joyy = nunchuck_joyy();
  zbut = nunchuck_zbutton();
  cbut = nunchuck_cbutton(); 
  Serial.println(
      int((byte)joyx) + divider +
      int((byte)joyy) + divider +
      int((byte)zbut) + divider +
      int((byte)cbut)
    );

delay(1);
}
