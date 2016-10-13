/*
Edt-2000 Test Ping
*/

#define STARTIO 5
#define FINISHIO 6

#define SYS 0
#define STEP 1
#define FULL 2

#include "Definitions.h"

#include "Arduino.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSC.h"
#include "OSCMessage.h"
#include "Statemachine.h"
#include "Preset.h"
#include "Trak.h"
#include "Time.h"
#include "Memory.h"

EthernetUDP Udp;
EdtOSC OSC;

enum class states { init, writeStart, awaitMessage, writeFinish, reset };
states state = states::init;

class OSCMessageReader : public IOSCMessageConsumer
{
	const char * address() {
		return "/M";
	}

	void callback(OSCMessage * msg) {
		/*Serial.print(msg->getInt(0));
		Serial.print(" ");
		Serial.print(msg->getInt(1));
		Serial.print(" ");
		Serial.print(msg->getInt(2));
		Serial.print(" ");
		Serial.print(msg->getInt(3));
		Serial.print(" ");
		Serial.print(msg->getInt(4));
		Serial.print(" ");
		Serial.println(msg->getInt(5));*/

		state = states::writeFinish;
	}
} OSCReader;

void setup() {
	Statemachine.begin(13, LOW);

	pinMode(STARTIO, OUTPUT);
	pinMode(FINISHIO, OUTPUT);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		Time.startTiming(SYS);
		Time.startTiming(STEP);
		Time.startTiming(FULL);

		Serial.begin(9600);

		// Ping code
		Time.addTimeEvent(SYS, "Edt-Trak Ping");

		Time.addTimeEvent(SYS, "Starting Ethernet..");

		Ethernet.begin(MAC_PING);

		Time.addTimeEvent(SYS, "Started Ethernet.");

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(Ethernet.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Time.addTimeEvent(SYS, "Starting UDP..");

		Udp.begin(PORT_BROADCAST);

		Time.addTimeEvent(SYS, "Started UDP.");
		Time.addTimeEvent(SYS, "Starting code..");

		OSC = EdtOSC(1, 0);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addConsumer(&OSCReader);

		Time.addTimeEvent(SYS, "Started code.");
		// /Ping code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();
			OSC.loop();

			switch (state) {
			case states::init:
				Time.addTimeEvent(FULL, "Start cycle.");
				state = states::writeStart;
				break;

			case states::writeStart:
				Time.addTimeEvent(FULL, "Writing start signal.");
				digitalWrite(STARTIO, HIGH);
				state = states::awaitMessage;
				break;

			case states::awaitMessage:
				break;

			case states::writeFinish:
				digitalWrite(FINISHIO, HIGH);
				Time.addTimeEvent(FULL, "Writing finish signal.");
				state = states::reset;
				break;

			case states::reset:
				Time.addTimeEvent(FULL, "Waiting to reset.");

				// wait to reset IO 
				delay(500);
				digitalWrite(STARTIO, LOW);
				digitalWrite(FINISHIO, LOW);
				delay(500);

				state = states::init;

				Time.addTimeEvent(FULL, "Reset.");

				break;
			}
		}
	}
}