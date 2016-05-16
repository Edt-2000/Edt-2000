#include <Wire.h>
#include "nunchuck_funcs.h"

int loop_cnt = 0;

byte accx, accy, zbut, cbut, joyx, joyy;
#define LED 13;


void setup()
{
    Serial.begin(19200);
    nunchuck_setpowerpins();
    nunchuck_init(); // send the initilization handshake
    
    Serial.print("WiiChuckDemo ready\n");
}

void loop()
{
    if( loop_cnt > 50) { // every 100 msecs get new data
        loop_cnt = 0;

        nunchuck_get_data();

        accx  = nunchuck_accelx(); // ranges from approx 70 - 182
        accy  = nunchuck_accely(); // ranges from approx 65 - 173
        joyx = nunchuck_joyx();
        joyy = nunchuck_joyy();
        zbut = nunchuck_zbutton();
        cbut = nunchuck_cbutton(); 
        
        Serial.print("accx: "); Serial.print((byte)accx,DEC);
        Serial.print("\taccy: "); Serial.print((byte)accy,DEC);
        Serial.print("joyx: "); Serial.print((byte)joyx,DEC);
        Serial.print("\tjoyy: "); Serial.print((byte)joyy,DEC);
        Serial.print("\tzbut: "); Serial.print((byte)zbut,DEC);
        Serial.print("\tcbut: "); Serial.println((byte)cbut,DEC);
    }
    loop_cnt++;
    delay(1);
}
