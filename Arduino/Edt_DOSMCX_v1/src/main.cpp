/*
Edt-DOSMCX

Using PlatformIO
*/
#define VERSION "v1"

#include "Definitions.h"

#include "Arduino.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSCArduino.h"
#include "Statemachine.h"
#include "Time.h"

#include "Trak.h"
#include "Pedal.h"

EthernetUDP Udp;
OSC::Arduino Osc;

void setup() {
	Statemachine.setup(13, LOW);
}

void loop() {
	if (Statemachine.isBegin()) {
		Time.begin();
		Statemachine.begin();

		Ethernet.begin(MAC_TRAK);

		Udp.begin(PORT_BROADCAST);

		Osc = OSC::Arduino(0, 2);
		Osc.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();

			Osc.loop(Time.tOSC);
		}
	}
}