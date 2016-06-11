#include "Wire.h"
#include "wiichuck.h"

//constants
#define readDelay 50 

//controllers
WiiChuck chuck;

//globals
unsigned long previous_read_time = 0;
int sweepIncrement = 10;
boolean autonomous = false;

void setup()
{
	Wire.begin();
	Serial.begin(9600);
	previous_read_time = millis();
}

void loop()
{
	if (!chuck.inSync)
	{
		chuck.init();
	}

	if (chuck.inSync && (millis() - previous_read_time > readDelay))
	{
		previous_read_time = millis();
		if (chuck.readData())
		{

			Serial.println(chuck.btn_z);
		}
	}
}

