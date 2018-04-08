#pragma once

//#include <functional>

#include <Arduino.h>
#include "Udp.h"
#include "Statemachine.h"
#include "Time.h"
#include "OSCArduino.h"

class AbstractApplication
{
public:
	AbstractApplication() : status(Status(this)), 
		statemachine(EdtStatemachine()),
		time(EdtTime()){};

	void setup() {
		time.begin();
		statemachine.begin();

		setupStatus();
		setupNetwork();
		setupOsc();

		statemachine.step();
	};

	virtual void setupStatus() = 0;
	virtual void setupNetwork() = 0;
	virtual void setupOsc() = 0;
	virtual void applicationLoop() = 0;

	void loop() {
		time.loop();

		switch (statemachine.current()) {
		case State::run:

			osc.loop(time.tOSC);
			applicationLoop();

			break;
		case State::starting:

			if (status.start()) {
				statemachine.step();
			}
			delay(100);

			break;
		case State::begin:

			status.blink();
			delay(100);

			break;
		}
	};

	EdtStatemachine statemachine;
	EdtTime time;
	OSC::Arduino osc;

protected:
	/*void continueWhen(std::function<bool(void)> isOk) {
		while (!isOk()) {
			loop();
		}
	};*/

	class Status {
	public:
		Status(AbstractApplication * parent) : _parent(parent) {};

		void setup(int ledPin, int offState) {
			_ledPin = ledPin;
			_offState = offState;

			pinMode(_ledPin, OUTPUT);
		}

		void blink() {
			auto now = _parent->time.now();

			if (now - _previousTime > 100) {
				_currentState = !_currentState;

				_previousTime = now;
			}

			led();
		}

		bool start() {
			auto now = _parent->time.now();

			if (now - _previousTime > (1000 / _startLoops)) {
				_currentState = !_currentState;

				_startLoops++;
				_previousTime = now;
			}

			led();

			if (_startLoops >= 16) {
				_startLoops = 1;

				return true;
			}

			return false;
		}

		void led() {
			digitalWrite(_ledPin, _currentState ? !_offState : _offState);
		}
	private:
		bool _currentState = false;
		unsigned long _previousTime = 0;
		unsigned long _startLoops = 1;
		int _ledPin = 0;
		int _offState = LOW;

		AbstractApplication* _parent;
	} status;
};

