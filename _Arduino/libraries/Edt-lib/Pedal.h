#pragma once

#include <Arduino.h>
#include <OSCArduino.h>

class EdtOSCPedal : public OSC::IMessageConsumer{
public:
	bool left = false;
	bool middle = false;
	bool right = false;

	EdtOSCPedal(const char * pattern) {
		_pattern = pattern;
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSC::Message * msg) {
		int value = msg->getInt(0);

		left = value == 1;
		middle = value == 2;
		right = value == 3;
	}

private:
	const char * _pattern;
};

class EdtDIPedal : public OSC::IMessageProducer {
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
				_disableUntil = millis() + 300UL;
			}
		}
	}

	OSC::Message * generateMessage() {
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
	OSC::Message _message = OSC::Message();
	int _ring;
	int _tip;
	int _ground;

	int _value = 0;
	unsigned long _disableUntil = 0;
};