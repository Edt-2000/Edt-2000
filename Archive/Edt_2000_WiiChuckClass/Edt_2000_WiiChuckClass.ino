#include <Time.h>
#include <Wire.h>
#include <Chuk.h>

static void nunchuck_setpowerpins()
{
#define pwrpin PORTC3
#define gndpin PORTC2
	DDRC |= _BV(pwrpin) | _BV(gndpin);
	PORTC &= ~_BV(gndpin);
	PORTC |= _BV(pwrpin);
	delay(100);  // wait for things to stabilize        
}

EdtChuk chuk = EdtChuk(0x52);

// the setup function runs once when you press reset or power the board
void setup() {
	Serial.begin(9600);

	nunchuck_setpowerpins();
	
	chuk.begin();
	
}

void loop()
{
	Time.loop();

	if (Time.t100ms) {
		chuk.loop();

		Serial.print(chuk.data.buttonC());
		Serial.print(" ");
		Serial.print(chuk.data.buttonZ());
		Serial.print(" ");
		Serial.print(chuk.data.joyX());
		Serial.print(" ");
		Serial.print(chuk.data.joyY());
		Serial.print(" ");
		Serial.print(chuk.data.accellX());
		Serial.print(" ");
		Serial.print(chuk.data.accellY());
		Serial.print(" ");
		Serial.print(chuk.data.accellZ());
		Serial.print(" ");
		Serial.println();

	}
}