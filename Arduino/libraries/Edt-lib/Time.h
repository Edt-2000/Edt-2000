#include <Arduino.h>

class Time
{
public:
	bool t10ms;
	bool t100ms;

	int diff100ms = 100;

	void begin() {
		t10ms = false;
		t100ms = false;

		_previous = 0;
		_t100ms = 0;
	};

	void loop() {
		long now = ::millis();

		t100ms = false;
		t10ms = (now - _previous >= 10U);

		if (t10ms) {
			diff100ms += now - _previous;

			// use 97 ms to counter bit of delay
			if (diff100ms >= 97U) {
				_t100ms = 0;
				diff100ms = 0;
				t100ms = true;
			}

			_previous = now;
		}
	};
private:
	long _previous;
	int _t100ms;
};