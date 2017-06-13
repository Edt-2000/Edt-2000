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
#include "FastLEDColorScheduler.h"

#include "FastLED.h"

// TOD move to class
#define COLOR_ORDER BRG
#define NUM_LEDS 29
#define DATA_PIN 2   // ORANGE
#define CLOCK_PIN 3  // GREEN

#define MODE_SOLID 1
#define MODE_RAINBOW 2
#define MODE_FADE2BLACK 3

// TODO: move to lib and not app
class EdtTOP : public OSC::IMessageConsumer
{
public:
	struct Color {
		int h;
		int s;
		int l;

		CHSV chsv() {
			return CHSV(h, s, l);
		}
	};

	FastLEDColorScheduler colorScheduler;

	EdtTOP(const char * pattern, const int nrOfLeds) {
		_pattern = pattern;

		_leds = new CRGB[nrOfLeds];

		FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, COLOR_ORDER>(_leds, nrOfLeds);

		colorScheduler = FastLEDColorScheduler(_leds, nrOfLeds);
	}

	const char * address() {
		return _pattern;
	}

	bool l = false;

	void callback(OSC::Message * msg) {
		_mode = msg->getInt(0);

		digitalWrite(13, l);
		l = !l;

		switch (_mode) {

		case MODE_SOLID:



			_start = msg->getInt(1);
			_end = msg->getInt(2);

			_color1.h = msg->getInt(3);
			_color1.s = msg->getInt(4);
			_color1.l = msg->getInt(5);

			_duration = msg->getInt(6);

			if (_color1.l == 0) {
				colorScheduler.blackout(_start, _end, _duration);
			}
			else {
				colorScheduler.disableBlackout(_start, _end);

				fill_solid(_leds + _start, _end - _start, _color1.chsv());
			}

			break;

		case MODE_RAINBOW:

			_start = msg->getInt(1);
			_end = msg->getInt(2);

			_hue = msg->getInt(3);
			_deltahue = msg->getInt(4);
			_duration = msg->getInt(5);
			
			if (_deltahue == 0) {
				colorScheduler.blackout(_start, _end, _duration);
			}
			else {
				fill_rainbow(&_leds[_start], _end - _start, _hue, _deltahue);
			}

			break;
		}
	}

	inline void animationLoop() {
		colorScheduler.loop();

		FastLED.show();
	}
private:
	const char * _pattern;

	CRGB *_leds;

	Color _color1;
	Color _color2;
	int _mode;
	int _start;
	int _end;
	int _hue;
	int _deltahue;
	int _duration;

};

class TOPApplication : public AbstractApplication
{
public:
	EdtTOP top = EdtTOP(OSC_TOP, NUM_LEDS);
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
			top.animationLoop();
		}
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