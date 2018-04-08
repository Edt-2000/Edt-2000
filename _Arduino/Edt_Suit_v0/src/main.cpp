/*
Edt-Suit

Using PlatformIO
*/
#define VERSION "v0"
#define DEBUG

#include "Definitions.h"

#include "Arduino.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSC.h"
#include "Statemachine.h"
#include "Preset.h"

#include "Trak.h"

EthernetUDP Udp;
EdtOSC OSC;

EdtOSCTrak Trak = EdtOSCTrak(OSC_TRAK);

void setup() {
	Statemachine.begin(13, LOW);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
#ifdef DEBUG
		Serial.begin(9600);

		while (!Serial) {

		}

		// Trak code
		Serial.print("Edt-Trak ");
		Serial.println(VERSION);

		Serial.println("Starting Ethernet..");
#endif
		Ethernet.begin(MAC_TRAK);
#ifdef DEBUG
		Serial.println("Started Ethernet.");

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(Ethernet.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Serial.println("Starting UDP..");
#endif
		Udp.begin(PORT_BROADCAST);
#ifdef DEBUG
		Serial.println("Started UDP.");

		Serial.println("Starting code..");
#endif
		OSC = EdtOSC(0, 1);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addObject(&Trak);

#ifdef DEBUG
		Serial.println("Started code.");
#endif
		// /Trak code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			OSC.loop();
		}
	}
}