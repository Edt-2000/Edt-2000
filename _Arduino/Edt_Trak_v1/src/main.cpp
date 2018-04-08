/*
Edt-Trak

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

EdtAITrak Trak = EdtAITrak(2, 1, 0, 5, 4, 3, OSC_TRAK);
EdtDIPedal Pedal = EdtDIPedal(5, 6, 7, OSC_PEDAL);

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
		Osc.addProducer(&Trak);
		Osc.addProducer(&Pedal);

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();

			Osc.loop(Time.tOSC);
		}
	}
}