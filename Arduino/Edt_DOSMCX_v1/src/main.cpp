/*
Edt-Tree

Using PlatformIO
*/
#define VERSION "v1"
#define DEBUG

#include "Definitions.h"

#include "Arduino.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSCArduino.h"
#include "Statemachine.h"
#include "Time.h"

#include "Chuk.h"

EthernetUDP Udp;
OSC::Arduino Osc;

EdtOSCChuk Chuk = EdtOSCChuk(OSC_SUIT_CHUK);

void setup() {
	Statemachine.begin(5, HIGH);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

#ifdef DEBUG
		Serial.begin(345600);

		// Trak code
		Serial.print("Edt-DOSMCX");
		Serial.println(VERSION);

		Serial.println("Starting Ethernet..");
#endif
		Ethernet.begin(MAC_DOSMCX);
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

		Osc = OSC::Arduino(1, 0);
		Osc.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		Osc.addConsumer(&Chuk);

#ifdef DEBUG
		Serial.println("Started code.");
#endif
		// /Trak code

		Statemachine.ready();
	}
	else {

		int output = 0;
		bool strobo = false;
		unsigned int stroboCycle = 0;
		unsigned int stroboLength = 8096;

		while (Statemachine.isRun()) {
			Time.loop();

			Osc.loop(Time.tOSC);

			if (!Chuk.data.buttonC() && !Chuk.data.buttonZ()) {
				output = 255;

				strobo = Chuk.data.joyY() > 0;

				if (strobo) {
					stroboLength = 8096 - (Chuk.data.joyY() * 48);
				}
				else {
					stroboLength = 8096;
				}

				if (Chuk.data.joyY() < 0) {
					output += max(-255, Chuk.data.joyY() * 3);
				}

				if (Chuk.data.joyX() > 40) {
					output = max(output, pow(((double)stroboCycle) / ((double)stroboLength), 2.0) * 255);
				}
			}
			else {
				strobo = false;
				output = 0;
			}

			stroboCycle++;

			if (strobo) {
				//PWM.set((stroboCycle < stroboLength) ? output : 0);
			}
			else {
				//PWM.set(output);
			}

			if (stroboCycle > 2 * stroboLength) {
				stroboCycle = 0;
			}

			//PWM.loop();
		}
	}
}

