/*
Edt-Trak

Using PlatformIO
*/
#define VERSION "v1"

#include "Definitions.h"

#include "Arduino.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSC.h"
#include "Time.h"
#include "Statemachine.h"
#include "Preset.h"
#include "Trak.h"

EthernetUDP Udp;

EdtAITrak Trak = EdtAITrak(0, 0, 0, 0, 0, 0, OSC_TRAK);

void setup() {
	Statemachine.begin(13, LOW);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		Serial.begin(9600);

		// Trak code
		Serial.print("Edt-Trak ");
		Serial.println(VERSION);

		Serial.println("Starting Ethernet..");
		Ethernet.begin(MAC_TRAK);
		Serial.println("Started Ethernet.");

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(Ethernet.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Serial.println("Starting UDP..");
		Udp.begin(PORT_BROADCAST);
		Serial.println("Started UDP.");
		
		Serial.println("Starting code..");

		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addSource(&Trak);

		Serial.println("Started code.");
		// /Trak code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();
			OSC.loop();

			Serial.println("loop");
		}
	}
}