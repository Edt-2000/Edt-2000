#pragma once

class EdtTime
{
public:
	// tweakable ticks for when to do certain stuff
	bool tOSC;
	bool tVISUAL;

	// absolute ticks for when to do time sensitive stuff
	bool t100ms;
	bool t1000ms;

	void begin() {
		tOSC = false;
		t100ms = false;
		t1000ms = false;

		_previous = 0;
		_diff100ms = 0;
		_t1000ms = 0;
	};

	// Start time for the given slot.
	void startTiming(int slot) {
		_timings[slot] = micros();
	}

	// Output buffer must be 40 chars long.
	void addTimeEvent(int slot, const char * description, char * outputBuffer) {
		sprintf(outputBuffer, "%10lu: %1d: %24s", micros() - _timings[slot], slot, description);

		_timings[slot] = micros();
	}

	void loop() {
		_now = ::millis();

		t1000ms = false;
		t100ms = false;

		// visual tick is always behind the osc tick
		tVISUAL = tOSC;
		tOSC = (_now - _previous >= 12UL);

		if (tOSC) {
			_diff100ms += _now - _previous;

			// use 97 ms to counter bit of delay
			if (_diff100ms >= 97) {
				_diff100ms = 0;
				t100ms = true;

				if (++_t1000ms >= 10) {
					_t1000ms = 0;
					t1000ms = true;
				}
			}

			_previous = _now;
		}
	};

	unsigned long now() {
		return _now;
	}
private:
	unsigned long _now;
	unsigned long _previous;
	int _diff100ms;
	int _t1000ms;

	unsigned long _timings[4];
};