/*
Edt-MOSCIDI

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
#include "MIDI.h"

#include "Trak.h"
//#include "Chuk.h"

EthernetUDP Udp;

EdtOSCTrak Trak = EdtOSCTrak(OSC_TRAK);
//EdtOSCChuk Chuk = EdtOSCChuk(OSC_SUIT_CHUK);

MIDI_CREATE_DEFAULT_INSTANCE();

void setup() {
	Statemachine.begin(13, LOW);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		//Serial.begin(9600);

		// MOSCIDI code
		//Serial.print("Edt-MOSCIDI ");
		//Serial.println(VERSION);

		//Serial.println("Starting Ethernet..");
		Ethernet.begin(MAC_MOSCIDI);
		//Serial.println("Started Ethernet.");

		//Serial.print("IP: ");
		//for (byte thisByte = 0; thisByte < 4; thisByte++) {
		//	Serial.print(Ethernet.localIP()[thisByte], DEC);
		//	Serial.print(".");
		//}
		//Serial.println(".");

		//Serial.println("Starting UDP..");
		Udp.begin(PORT_BROADCAST);
		//Serial.println("Started UDP.");

		//Serial.println("Starting code..");

		//OSC.bindUDP(&Udp, IPAddress(10, 0, 0, 202), PORT_BROADCAST);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addObject(&Trak);
		//OSC.addObject(&Chuk);

		//Serial.println("Started code.");

		MIDI.begin(1);
		// /MOSCIDI code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();
			OSC.loop();


			if (Trak.data.rightX > 0.75) {
				MIDI.sendNoteOn(36, 127, 1);
			} else {
				MIDI.sendNoteOff(36, 127, 1);
			}

			//MIDI.sendPitchBend((int)((Trak.data.leftZ - 0.75) * 127.0 * 4.0), 1);
		}
	}
}