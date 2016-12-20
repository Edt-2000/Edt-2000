#pragma once

#include <Arduino.h>

#define BEGIN 1
#define INITIAL_DELAY 4
#define READY 2
#define RUN 3

class EdtStatemachine {
public:
	bool isBegin() {
		return _state == BEGIN;
	}
	void setup(int statusLED, bool offState) {
		_state = 0;
		_readyLoops = 1;

		_statusLED = statusLED;
		_offState = offState;
		_onState = !offState;

		pinMode(_statusLED, OUTPUT);
		digitalWrite(_statusLED, offState);

		_currentState = offState;

		_state = BEGIN;
	}

	void begin() {
		_state = INITIAL_DELAY;

		int i = 0;
		while (++i < 5) {
			// add some delay
			delay(1000);

			// keep updating status
			loop();
		}

		_state = BEGIN;
	}

	bool isReady() {
		return _state == READY;
	}
	void ready() {
		_currentState = _offState;
		_previous = 0;

		_state = READY;
	}

	bool isRun() {
		return _state == RUN;
	}

	void restart() {
		_state = BEGIN;
		_readyLoops = 1;
	}

	void loop() {
		if (_state == BEGIN) {
			if (millis() - _previous > 100) {
				_currentState = !_currentState;

				_previous = millis();

				digitalWrite(_statusLED, _currentState);
			}
		}
		else if (_state == READY) {
			// increase blink rate with each loop
			if (millis() - _previous > (unsigned int)(1000 / _readyLoops)) {
				_currentState = !_currentState;

				_previous = millis();

				// after blinking ready, switch to run.
				if (++_readyLoops == 16) {
					_state = RUN;
					_currentState = _offState;
				}

				digitalWrite(_statusLED, _currentState);
			}
		}
	}
private:
	int _state;

	int _previous;
	int _readyLoops;

	int _statusLED;
	bool _offState;
	bool _onState;

	bool _currentState;
} Statemachine;