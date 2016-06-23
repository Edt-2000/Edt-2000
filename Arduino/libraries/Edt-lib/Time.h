#include <Arduino.h>

class EdtTime
{
public:
	bool t10ms;
	bool t100ms;
	bool t1000ms;

	int diff100ms = 100;

	void begin() {
		t10ms = false;
		t100ms = false;
		t1000ms = false;

		_previous = 0;
		_t100ms = 0;
		_t1000ms = 0;
	};

	void loop() {
		long now = ::millis();

		t1000ms = false;
		t100ms = false;
		t10ms = (now - _previous >= 10U);

		if (t10ms) {
			diff100ms += now - _previous;

			// use 97 ms to counter bit of delay
			if (diff100ms >= 97) {
				_t100ms = 0;
				diff100ms = 0;
				t100ms = true;

				if (++_t1000ms >= 10) {
					_t1000ms = 0;
					t1000ms = true;
				}
			}

			_previous = now;
		}
	};
private:
	long _previous;
	int _t100ms;
	int _t1000ms;
};