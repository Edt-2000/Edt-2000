/*
Edt-Trak

Using PlatformIO
*/
#define VERSION "v1"
//#define DEBUG

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

EdtAITrak Trak = EdtAITrak(2, 1, 0, 5, 4, 3, OSC_TRAK);

// Define various ADC prescaler
// http://www.microsmart.co.za/technical/2014/03/01/advanced-arduino-adc/
const unsigned char PS_16 = (1 << ADPS2);
const unsigned char PS_32 = (1 << ADPS2) | (1 << ADPS0);
const unsigned char PS_64 = (1 << ADPS2) | (1 << ADPS1);
const unsigned char PS_128 = (1 << ADPS2) | (1 << ADPS1) | (1 << ADPS0);

void setup() {
	// set up the ADC
	ADCSRA &= ~PS_128;
	ADCSRA |= PS_16;

	Statemachine.begin(13, LOW);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		//Time.begin();

#ifdef DEBUG
		Serial.begin(345600);

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

		OSC = EdtOSC(1, 0);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addSource(&Trak);
		
#ifdef DEBUG
		Serial.println("Started code.");
#endif
		// /Trak code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			//Time.loop();
			OSC.loop();
		}
	}
}