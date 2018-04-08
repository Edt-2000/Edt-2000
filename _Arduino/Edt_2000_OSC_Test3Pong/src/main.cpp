/*
Edt-2000 Test Pong
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
#include "Statemachine.h"
#include "Preset.h"
#include "Trak.h"
#include "Time.h"
#include "Memory.h"

EthernetUDP Udp;
EdtOSC OSC;

enum class states { init, waitingForStart, waitingForFinish, waitingForReset };
states state = states::init;

class OSCMessageWriter : public IOSCMessageProducer
{
public:
	OSCMessageWriter() {
		_message.reserve(6);
		_message.setAddress("/M");
	}
	OSCMessage * generateMessage() {
		_message.add<int>(++_messages);
		_message.add<int>(_messages + 1);
		_message.add<int>(_messages + 2);
		_message.add<int>(_messages + 3);
		_message.add<int>(_messages + 4);
		_message.add<int>(_messages + 5);

		return &_message;
	}
private:
	OSCMessage _message = OSCMessage();
	int _messages = 0;
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
		Time.addTimeEvent(SYS, "Edt-Trak Pong");

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

		OSC = EdtOSC(0, 1);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addProducer(&OSCWriter);

		Time.addTimeEvent(SYS, "Started code.");
		// /Pong code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();
			//OSC.loop();

			switch (state) {
			case states::init:
				Time.addTimeEvent(FULL, "Start cycle.");
				state = states::waitingForStart;
				break;

			case states::waitingForStart:
				if (digitalRead(STARTIO) == HIGH) {
					Time.addTimeEvent(FULL, "Received start.");
					state = states::waitingForFinish;
					OSC.loop();
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