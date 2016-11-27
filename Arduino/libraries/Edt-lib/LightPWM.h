#pragma once

#include <Arduino.h>

class EdtLightPWM {
public:
	int _pin;
	unsigned char _cycle;
	unsigned char _level;

	void start(int pin) {
		_pin = pin;
		_cycle = 0;

		pinMode(pin, OUTPUT);
	}

	void set(unsigned char level) {
		_level = level;
	}

	void loop() {
		_cycle++;

		digitalWrite(_pin, _cycle < _level);
	}
};