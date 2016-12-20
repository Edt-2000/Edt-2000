/*
Edt-Suit

Using PlatformIO
*/
#define VERSION "v1"

// include as first to avoid intellisense issues in visual studio
#include "ESP8266WiFi.h"

#include "Definitions.h"

#include "Arduino.h"
#include "WiFiUdp.h"
#include "OSCArduino.h"
#include "Statemachine.h"
#include "Time.h"

#include "Chuk.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

WiFiUDP Udp;
OSC::Arduino Osc;

EdtI2CChuk Chuk = EdtI2CChuk(0x52, OSC_SUIT_CHUK);

void setup() {
	Statemachine.setup(5, HIGH);
}

void loop() {
	if (Statemachine.isBegin()) {
		Time.begin();
		Statemachine.begin();

		WiFi.disconnect();
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);
		while (WiFi.status() != WL_CONNECTED)
		{
			// really wait for this
			Statemachine.loop();
			yield();
		}

		Udp.begin(PORT_BROADCAST);

		Osc = OSC::Arduino(0, 1);
		Osc.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		Osc.addProducer(&Chuk);

		Chuk.begin();

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();

			Osc.loop(Time.tOSC);

			// yield to the mighty ESP8266 code 
			yield();
		}
	}
}