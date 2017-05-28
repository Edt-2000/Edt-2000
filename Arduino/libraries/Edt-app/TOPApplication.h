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

#include "FastLED.h"

#define COLOR_ORDER BRG
#define NUM_LEDS 29
#define DATA_PIN 2   // ORANGE
#define CLOCK_PIN 3  // GREEN
CRGB leds[NUM_LEDS];

#define MODE_SOLID 1

struct Color {
	int h;
	int s;
	int l;

	CHSV chsv() {
		return CHSV(h, s, l);
	}
};

class EdtTOP : public OSC::IMessageConsumer
{
public:
	Color color1;
	Color color2;
	int mode;
	int start;
	int end;
	
	EdtTOP(const char * pattern) {
		_pattern = pattern;

		FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, COLOR_ORDER>(leds, NUM_LEDS);
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSC::Message * msg) {
		mode = msg->getInt(0);

		switch (mode) {

		case MODE_SOLID:

			start = msg->getInt(1);
			end = msg->getInt(2);

			color1.h = msg->getInt(3);
			color1.s = msg->getInt(4);
			color1.l = msg->getInt(5);

			fill_solid(&leds[start], end - start, color1.chsv());

			break;
		}

		FastLED.show();
	}
private:
	const char * _pattern;
};

class TOPApplication : public AbstractApplication
{
public:
	EdtTOP top = EdtTOP(OSC_TOP);
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
		//if (time.tVISUAL) {
			
			// clear this led for the next time around the loop
			//leds[dot] = CRGB::Black;
		//}
	}
};


/*
#include <FastLED.h>

//---LED SETUP STUFF
#define COLOR_ORDER BRG
#define NUM_LEDS 29
#define DATA_PIN 2   // ORANGE
#define CLOCK_PIN 3  // GREEN

// + => BROWN
// - => BLUE

CRGB leds[NUM_LEDS];

void setup() {
FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, COLOR_ORDER>(leds, NUM_LEDS);
}

void loop() {
for(int dot = 0; dot < NUM_LEDS; dot++) {
leds[dot] = CRGB::Blue;
FastLED.show();
// clear this led for the next time around the loop
leds[dot] = CRGB::Black;
delay(30);
}
}


*/