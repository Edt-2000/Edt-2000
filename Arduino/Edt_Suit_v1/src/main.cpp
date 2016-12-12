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
#include "Statemachine.h"
#include "Time.h"

#include "Trak.h"
#include "Chuk.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

WiFiUDP Udp;
EdtOSC OSC;

//EdtAITrak Trak = EdtAITrak(4,4,4,4,4,4,OSC_TRAK);
EdtI2CChuk Chuk = EdtI2CChuk(0x52, OSC_SUIT_CHUK);

void setup() {
	Statemachine.begin(5, HIGH);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

#ifdef DEBUG
		Serial.begin(9600);
#endif

		// Suit code
		int i = 0;
		while (++i < 5) {
			// add some delay
			delay(1000);

			// keep updating status
			Statemachine.loop();
		}

		// Set WiFi mode to station
		WiFi.disconnect();
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);
		while (WiFi.status() != WL_CONNECTED)
		{
			// really wait for this
			Time.loop();

			if (Time.t100ms) {
				// keep updating status
				Statemachine.loop();
			}

			yield();
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
		OSC = EdtOSC(0, 1);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		//OSC.addProducer(&Trak);
		OSC.addProducer(&Chuk);

		Chuk.begin();

#ifdef DEBUG
		// /Suit code
		Serial.println("Started code.");
#endif

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();

			OSC.loop(Time.tOSC);

			//if (Time.t100ms) {
			//	Serial.println("Jeej");
			//}

			// yield to the mighty ESP8266 code 
			yield();
		}
	}
}