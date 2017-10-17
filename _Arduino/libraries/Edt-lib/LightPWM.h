#pragma once

#include <Arduino.h>

// simple PWM class for soft PWM in ESP8266s
class EdtLightPWM {
public:
	int _pin;
	unsigned char _cycle;
	unsigned char _level;

	// sets the output pin of the PWM object
	void start(int pin) {
		_pin = pin;
		_cycle = 0;

		pinMode(pin, OUTPUT);
	}

	// sets the output level of the output pin
	void set(unsigned char level) {
		_level = level;
	}

	void loop() {
		_cycle++;

		digitalWrite(_pin, _cycle < _level);
	}
};