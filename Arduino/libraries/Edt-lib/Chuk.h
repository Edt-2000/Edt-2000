/*
Adapted from:

This library is from the Bionic Arduino course :
http://todbot.com/blog/bionicarduino/
2007-11 Tod E. Kurt, http://todbot.com/blog/

The Wii Nunchuck reading code originally from Windmeadow Labs
http://www.windmeadow.com/node/42

*/
#pragma once

#include "Arduino.h"
#include "OSC.h"
#include "Wire.h"

union EdtOSCChukData
{
public:
	byte buffer[6];

	EdtOSCChukData() {
		reset();
	};

	// normalization to -1.0 to 1.0 float (TouchOSC only supports floats)
	float joyX() { return max(-1.0, min(1.0, ((_joyX / 128.0) - 1.0) / 0.70)); };
	float joyY() { return max(-1.0, min(1.0, ((_joyY / 128.0) - 1.0) / 0.70)); };
	float buttonC() { return (float)!_buttonC; };
	float buttonZ() { return (float)!_buttonZ; };

	// this is not normalized and not calibrated
	float accellX() { return (((float)_accellX * 4.0 / 128.0) + ((float)_lsbAccellX / 128.0)); };
	float accellY() { return (((float)_accellY * 4.0 / 128.0) + ((float)_lsbAccellY / 128.0)); };
	float accellZ() { return (((float)_accellZ * 4.0 / 128.0) + ((float)_lsbAccellZ / 128.0)); };

	void reset() {
		_joyX = 0;
		_joyY = 0;
		_accellX = 0;
		_accellY = 0;
		_accellZ = 0;
		_buttonC = false;
		_buttonZ = false;
		_lsbAccellX = 0;
		_lsbAccellY = 0;
		_lsbAccellZ = 0;
	};

private:
	// the actual data structure of the 6 bytes
	struct {
		unsigned int _joyX : 8;
		unsigned int _joyY : 8;
		
		unsigned int _accellX : 8;
		unsigned int _accellY : 8;
		unsigned int _accellZ : 8;

		bool _buttonZ : 1;
		bool _buttonC : 1;

		// LSB bits of accellerometer data
		unsigned int _lsbAccellX : 2; 
		unsigned int _lsbAccellY : 2;
		unsigned int _lsbAccellZ : 2;
	};
};

class EdtOSCChuk : public EdtOSCRoutingObject
{
public:
	EdtOSCChukData data = EdtOSCChukData();
};

class EdtChuk
{
public:
	EdtOSCChukData data = EdtOSCChukData();

	EdtChuk(int address) {
		_address = address;
		_requested = false;
	}

	void begin() {
		Wire.begin();
		Wire.beginTransmission(_address);
		Wire.write((uint8_t)0x40);
		Wire.write((uint8_t)0x00);
		Wire.endTransmission();

		requestData();
	}

	void loop() {
		int bytesReceived = 0;

		// Read 6 bytes from the nunchuck and check 6 bytes were received
		Wire.requestFrom(_address, 6);
		while (Wire.available()) {
			data.buffer[bytesReceived++] = _decodeByte(Wire.read());
		}

		if (bytesReceived < 5) {
			data.reset();
		}

		requestData();
	}

private:
	int _address;
	bool _requested;

	void requestData() {
		Wire.beginTransmission(_address);
		Wire.write((uint8_t)0x00);
		Wire.endTransmission();
	}

	inline char _decodeByte(char x)
	{
		return (x ^ 0x17) + 0x17;
	}

};