#pragma once

#include <OSCArduino.h>
#include <FastLED.h>
#include <FastLEDColorScheduler.h>

class EdtTOP : public OSC::IMessageConsumer
{
public:
	FastLEDColorScheduler colorScheduler;

	EdtTOP(const char * pattern, uint8_t const nrOfLeds) {
		_pattern = pattern;

		_leds = new CRGB[nrOfLeds];

		FastLED.addLeds<APA102, 2, 3, BRG>(_leds, nrOfLeds);

		colorScheduler = FastLEDColorScheduler(_leds, nrOfLeds);
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSC::Message * msg) {
		_mode = (Mode)msg->getInt(0);

		_start = msg->getInt(1);
		_end = msg->getInt(2);

		switch (_mode) {

		case SinglePulse:
		case SingleSolid:

			_color1.h = msg->getInt(3);
			_color1.s = msg->getInt(4);
			_color1.l = msg->getInt(5);

			if (_color1.l > 0) {

				fill_solid(_leds + _start, _end - _start, _color1.chsv());
			}

			if (_mode == SinglePulse || _color1.l == 0) {
				_duration = msg->getInt(6);

				colorScheduler.blackout(_start, _end, _duration);
			}
			else {
				colorScheduler.disableBlackout(_start, _end);
			}

			break;

		case RainbowPulse:
		case RainbowSolid:

			_hue = msg->getInt(3);
			_deltahue = msg->getInt(4);

			if (_deltahue > 0) {
				fill_rainbow(&_leds[_start], _end - _start, _hue, _deltahue);
			}

			if (_mode == RainbowPulse || _deltahue == 0) {
				_duration = msg->getInt(5);

				colorScheduler.blackout(_start, _end, _duration);
			}
			else {
				colorScheduler.disableBlackout(_start, _end);
			}

			break;


		case VUMeter:

			_center = msg->getInt(3);
			_hue = msg->getInt(4);
			_deltahue = msg->getInt(5);
			_intensity = (float)(msg->getInt(6));

			if (_start != _center) {
				
				int leds = (_center - _start) * (_intensity / 255.0);

				colorScheduler.blackout(_start, _center - leds, 127);
				colorScheduler.disableBlackout(_center - leds, _center);

				fill_rainbow_reverse(&_leds[_center - leds - 1], leds, _hue, _deltahue / (_center - _start));
			}

			if (_center != _end) {

				int leds = (_end - _center) * (_intensity / 255.0);

				colorScheduler.blackout(_end - (_end - _center - leds), _end, 127);
				colorScheduler.disableBlackout(_center, _center + leds);

				fill_rainbow(&_leds[_center], leds, _hue, _deltahue / (_end - _center));
			}

			break;

		case Twinkle:

			colorScheduler.disableBlackout(_start, _end);

			_color1.h = msg->getInt(3);
			_color1.s = 255;
			_color1.l = 255;
			_intensity = (float)(msg->getInt(4));

			_color2.l = 0;

			if (_intensity > 0) {

				for (int i = _start; i < _end; i++) {
					if (_intensity > random8()) {
						_leds[i] = _color1.chsv();
					}
					else {
						_leds[i] = _color2.chsv();
					}
				}
			}
			else {
				colorScheduler.blackout(_start, _end, 127);
			}

			break;

		case Strobo:
			// stobo only has 2 parameters
			_hue = _start;
			_intensity = _end;

			colorScheduler.strobo(_hue, _intensity);

			break;
		}
	}

	void animationLoop() {
		FastLED.show();
		colorScheduler.loop();
	}
private:
	enum Mode {
		SingleSolid = 1,
		SinglePulse = 2,
		RainbowSolid = 3,
		RainbowPulse = 4,
		VUMeter = 100,
		Twinkle = 101,
		Strobo = 200
	};

	struct Color {
		int h;
		int s;
		int l;

		CHSV chsv() {
			return CHSV(h, s, l);
		}
	};

	const char * _pattern;

	CRGB *_leds;

	Color _color1;
	Color _color2;
	int _mode;
	int _start;
	int _end;
	int _center;
	int _hue;
	int _deltahue;
	int _duration;
	float _intensity;
};
