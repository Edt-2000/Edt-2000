#include "FastLED.h"

class FastLEDColorScheduler
{
public:
	FastLEDColorScheduler() {

	}

	FastLEDColorScheduler(CRGB* leds, int nrOfLeds) {
		_leds = leds;
		_ledState = new int[nrOfLeds];
		_nrOfLeds = nrOfLeds;

		for (int i = 0; i < nrOfLeds; i++) {
			_ledState[i] = 0;
		}
	}

	void blackout(int start, int stop, int duration) {
		for (int i = start; i < stop; i++) {
			_ledState[i] = duration;
		}
	}
	void disableBlackout(int start, int stop) {
		for (int i = start; i < stop; i++) {
			_ledState[i] = 0;

		}
	}

	void loop() {
		for (int i = 0; i < _nrOfLeds; i++) {
			if (_ledState[i] > 0) {

				fadeToBlackBy(_leds + i, 1, _ledState[i]);

				if (_ledState[i] < 255) {
					_ledState[i] += ((_ledState[i] / 2) + 1);
				}
			}
		}
	}
private:
	CRGB *_leds;
	int *_ledState;
	int _nrOfLeds;

};