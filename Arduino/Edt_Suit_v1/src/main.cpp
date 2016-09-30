/*
Edt-Suit

Using PlatformIO
*/
#define VERSION "v1"
//#define DEBUG

// include as first to avoid intellisense issues in visual studio
#include "ESP8266WiFi.h"

#include "Definitions.h"

#include "Arduino.h"
#include "WiFiUdp.h"
#include "OSC.h"
//#include "Time.h"
#include "Statemachine.h"
//#include "Preset.h"

#include "Chuk.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

WiFiUDP Udp;
EdtOSC OSC;

EdtI2CChuk Chuk = EdtI2CChuk(0x52, OSC_SUIT_CHUK);

void setup() {
	Statemachine.begin(5, HIGH);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		//Time.begin();

#ifdef DEBUG
		Serial.begin(9600);
#endif

		// Suit code
		int i = 0;
		while (++i < 500) {
			// add some delay
			delay(10);

			// keep updating status
			Statemachine.loop();
		}

		// Set WiFi mode to station
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);
		while (WiFi.status() != WL_CONNECTED)
		{
			// really wait for this
			delay(10);

			// keep updating status
			Statemachine.loop();
		}

#ifdef DEBUG
		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(WiFi.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();
#endif

#ifdef DEBUG
		Serial.println("Starting UDP..");
#endif

		Udp.begin(PORT_BROADCAST);

#ifdef DEBUG
		Serial.println("Started UDP.");

		Serial.println("Starting code..");
#endif
		OSC = EdtOSC(1, 0);
		//OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.bindUDP(&Udp, IPAddress(10, 0, 0, 201), 12345);
		OSC.addSource(&Chuk);

		Chuk.begin();

#ifdef DEBUG
		// /Suit code
		Serial.println("Started code.");
#endif

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			//Time.loop();
			OSC.loop();

#ifdef DEBUG
			//if (Time.t100ms) {
			//	Serial.print(Trak.data.leftX);
			//	Serial.print(" ");
			//	Serial.println(Chuk.data.buttonC());
			//}
#endif

			// yield to the mighty ESP8266 code 
			yield();
		}
	}
}