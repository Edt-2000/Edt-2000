#include "FastLED.h"

class FastLEDColorScheduler
{
public:
	struct Color {
		int h;
		int s;
		int l;

		CHSV chsv() {
			return CHSV(h, s, l);
		}
	};

	FastLEDColorScheduler() {

	}

	FastLEDColorScheduler(CRGB* leds, int nrOfLeds) {
		_leds = leds;
		_ledState = new LedState[nrOfLeds];
		_nrOfLeds = nrOfLeds;

		for (int i = 0; i < nrOfLeds; i++) {
			_ledState[i].blackoutSpeed = 0;
		}
	}

	void blackout(int start, int stop, int speed) {
		for (int i = start; i < stop; i++) {
			_ledState[i].blackoutSpeed = speed;
		}
	}
	void disableBlackout(int start, int stop) {
		for (int i = start; i < stop; i++) {
			_ledState[i].blackoutSpeed = 0;

		}
	}

	void strobo(int hue, int fps) {
		disableBlackout(0, _nrOfLeds);

		fill_solid(_leds, _nrOfLeds, 0);

		_strobo.active = fps > 0;
		_strobo.loop = 0;
		_strobo.fpl = (255.0 / fps);
		if (hue == 0) {
			_strobo.color.h = 0;
			_strobo.color.s = 0;
			_strobo.color.l = 255;
		}
		else {
			_strobo.color.h = hue;
			_strobo.color.s = 255;
			_strobo.color.l = 255;
		}
	}

	void loop() {
		if (_strobo.active) {

			fill_solid(_leds, _nrOfLeds, 0);

			if((_strobo.loop++) > _strobo.fpl)
			{
				_strobo.loop = 0;

				fill_solid(_leds, _nrOfLeds, _strobo.color.chsv());
			}
		}
		else {
			for (int i = 0; i < _nrOfLeds; i++) {
				if (_ledState[i].blackoutSpeed > 0) {

					fadeToBlackBy(_leds + i, 1, _ledState[i].blackoutSpeed);

					if (_ledState[i].blackoutSpeed < 255) {
						_ledState[i].blackoutSpeed += ((_ledState[i].blackoutSpeed / 2) + 1);
					}
				}
			}
		}
	}
private:
	struct LedState {
	public:
		uint8_t blackoutSpeed;
	};

	struct Strobo {
		bool active;
		int loop;
		float fpl;
		Color color;
	};

	CRGB *_leds;
	LedState *_ledState;
	int _nrOfLeds;

	Strobo _strobo;
};
