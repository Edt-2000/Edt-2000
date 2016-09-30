/*
Edt-2000 Test Ping
*/
#define DEBUG

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
#include "Statemachine.h"
#include "Preset.h"
#include "Trak.h"
#include "Time.h"
#include "Memory.h"

EthernetUDP Udp;
EdtOSC OSC;

enum class states { init, waitingForStart, waitingForFinish, waitingForReset };
states state = states::init;

class OSCMessageWriter : public EdtOSCSourceObject
{
public:
	OSCMessageWriter() {
		message.reserve(1);
		message.setAddress("/M");
	}
	OSCMessage * generateMessage() {
		if (enabled) {

			message.add(++messages);

			enabled = false;

			return &message;
		}

		return nullptr;
	}
	void enable() {
		enabled = true;
	}
private:
	OSCMessage message = OSCMessage();
	float messages = 0;
	bool enabled = false;
} OSCWriter;

void setup() {
	Statemachine.begin(13, LOW);

	pinMode(STARTIO, INPUT_PULLUP);
	pinMode(FINISHIO, INPUT_PULLUP);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		Time.startTiming(SYS);
		Time.startTiming(STEP);
		Time.startTiming(FULL);

		Serial.begin(9600);

		// Pong code
		Time.addTimeEvent(SYS, "Edt-Trak Ping");

		Time.addTimeEvent(SYS, "Starting Ethernet..");

		Ethernet.begin(MAC_PONG);

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
		OSC.addSource(&OSCWriter);

		Time.addTimeEvent(SYS, "Started code.");
		// /Pong code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();
			OSC.loop();

			switch (state) {
			case states::init:
				Time.addTimeEvent(FULL, "Start cycle.");
				state = states::waitingForStart;
				break;

			case states::waitingForStart:
				if (digitalRead(STARTIO) == HIGH) {
					Time.addTimeEvent(FULL, "Received start.");
					state = states::waitingForFinish;
					OSCWriter.enable();
				}
				break;

			case states::waitingForFinish:
				if (digitalRead(FINISHIO) == HIGH) {
					Time.addTimeEvent(FULL, "Received finish.");
					state = states::waitingForReset;
				}
				break;

			case states::waitingForReset:
				if (digitalRead(STARTIO) == LOW && digitalRead(FINISHIO) == LOW) {
					Time.addTimeEvent(FULL, "Received reset.");
					state = states::init;
				}
				break;
			}
		}
	}
}