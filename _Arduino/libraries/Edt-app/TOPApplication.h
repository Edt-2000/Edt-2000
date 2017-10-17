#pragma once

//#include <functional>

#include "AbstractApplication.h"

#include "Definitions.h"

#include "Arduino.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSCArduino.h"
#include "Statemachine.h"
#include "Time.h"
#include "Top.h"

#include "FastLED.h"

class TOPApplication : public AbstractApplication
{
public:
	EdtTOP top = EdtTOP(OSC_TOP, 29);
	EthernetUDP udp;
	int dot = 0;

	void setupStatus() {
		status.setup(13, HIGH);
	}

	void setupNetwork() {
		Ethernet.begin(MAC_PING);

		udp.begin(PORT_BROADCAST);
	}

	void setupOsc() {
		osc = OSC::Arduino(1, 0);
		osc.bindUDP(&udp, IP_BROADCAST, PORT_BROADCAST);
		osc.addConsumer(&top);
	}

	void applicationLoop() {
		if (time.tVISUAL) {

			// TODO: add this to time class just as osc
			top.animationLoop();
		}
	}
};