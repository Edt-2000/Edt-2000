#include <Arduino.h>

class EdtStatemachine {
public:
	void begin() {
		begin(13, LOW);
	}
	
	bool isBegin() {
		return _state == 1;
	}
	void begin(int statusLED, bool offState) {
		_state = 0;
		_readyLoops = 1;

		_statusLED = statusLED;
		_offState = offState;
		_onState = !offState;

		pinMode(_statusLED, OUTPUT);
		digitalWrite(_statusLED, offState);

		_currentState = offState;

		_state = 1;
	}

	bool isReady() {
		return _state == 2;
	}
	void ready() {
		_currentState = _offState;
		_previous = 0;

		_state = 2;
	}

	bool isRun() {
		return _state == 3;
	}

	void restart() {
		_state = 1;
		_readyLoops = 1;
	}

	void loop() {
		if (_state == 1) {
			if (millis() - _previous > 100) {
				_currentState = !_currentState;

				_previous = millis();

				digitalWrite(_statusLED, _currentState);
			}
		}
		else if (_state == 2) {
			// increase blink rate with each loop
			if (millis() - _previous > (1000 / _readyLoops)) {
				_currentState = !_currentState;

				_previous = millis();

				// after blinking ready for 3 times, switch to run.
				if (++_readyLoops == 16) {
					_state = 3;
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