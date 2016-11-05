#pragma once

#include "OSC.h"

class EdtDIPedal : public IOSCMessageProducer {
public:
	EdtDIPedal(int ground, int ring, int tip, const char * oscAddress) {
		_ring = ring;
		_tip = tip;
		_ground = ground;

		pinMode(ring, INPUT_PULLUP);
		pinMode(tip, INPUT_PULLUP);
		pinMode(ground, OUTPUT);

		digitalWrite(ground, LOW);

		_message.setAddress(oscAddress);
		_message.reserve(1);
	}

	void loop() {
		if (millis() > _disableUntil) {
			_value = 0;

			_value |= (digitalRead(_tip) == LOW) ? 1 : 0;
			_value |= (digitalRead(_ring) == LOW) ? 2 : 0;

			if (_value > 0) {
				_disableUntil = millis() + 300;
			}
		}
	}

	OSCMessage * generateMessage() {
		if (_value > 0) {
			_message.setValidData(true);
			_message.add<int>(_value);

			_value = 0;
		}
		else {
			_message.setValidData(false);
		}
		return &_message;
	}
private:
	OSCMessage _message = OSCMessage();
	int _ring;
	int _tip;
	int _ground;

	int _value = 0;
	long _disableUntil = 0;
};