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

#include "OSCControlChange.h"
#include "OSCNote.h"
#include "MIDIStatus.h"

EthernetUDP Udp;
EdtOSC OSC;
EdtMIDIStatus Status;

MIDI_CREATE_DEFAULT_INSTANCE();

EdtOSCControlChange OSCControlChange = EdtOSCControlChange(OSC_MIDICONTROL, &MIDI, &Status);
EdtOSCNote OSCNote = EdtOSCNote(OSC_MIDINOTE, &MIDI, &Status);

void setup() {
	Statemachine.begin(13, LOW);

	pinMode(6, OUTPUT);
	pinMode(7, OUTPUT);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		Serial.begin(31250);
		//while (!Serial) {
		//	Statemachine.loop();
		//}

		// MOSCIDI code
		//sSerial.print("Edt-MOSCIDI ");
		//sSerial.println(VERSION);

	//	Serial.println("Starting Ethernet..");

		Ethernet.begin(MAC_MOSCIDI);
		/*Serial.println("Started Ethernet.");

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(Ethernet.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println(".");

		Serial.println("Starting UDP..");
		*/
		Udp.begin(PORT_BROADCAST);
		/*
		Serial.println("Started UDP.");

		Serial.println("Starting code..");
		*/
		MIDI.begin(1);

		OSC = EdtOSC(2, 0);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addConsumer(&OSCNote);
		OSC.addConsumer(&OSCControlChange);

		//		Serial.println("Started code.");

		// /MOSCIDI code

		Statemachine.ready();
	}
	else {

		while (Statemachine.isRun()) {
			Time.loop();
			OSC.loop(false);
		}
	}
}