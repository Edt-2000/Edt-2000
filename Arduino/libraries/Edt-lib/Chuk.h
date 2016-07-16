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

union EdtOSCChuckData
{
public:
	float buffer[4];

	EdtOSCChuckData() {
		reset();
	}

	float joyX() { return _joyX; };
	float joyY() { return _joyY; };
	float buttonC() { return _buttonC; };
	float buttonZ() { return _buttonZ; };

	void reset() {
		_buttonC = 0.0;
		_buttonZ = 0.0;
		_joyX = 0.0;
		_joyY = 0.0;
	}

private:
	struct {
		float _buttonC;
		float _buttonZ;
		float _joyX;
		float _joyY;
	};
};

union EdtI2CChukData
{
public:
	byte buffer[6];

	EdtI2CChukData() {
		reset();
	};

	// normalization to -1.0 to 1.0 float (TouchOSC only supports floats)
	float joyX() {
		float x = ((((float)_joyX) / 128.0) - 1.0) / 0.70;
		return max(-1.0, min(1.0, x));
	};
	float joyY() {
		float y = ((((float)_joyY) / 128.0) - 1.0) / 0.70;
		return max(-1.0, min(1.0, y));
	};
	float buttonC() { return (float)!_buttonC; };
	float buttonZ() { return (float)!_buttonZ; };

	// this is not normalized and not calibrated
	/*float accellX() { return (((float)_accellX * 4.0 / 128.0) + ((float)_lsbAccellX / 128.0)); };
	float accellY() { return (((float)_accellY * 4.0 / 128.0) + ((float)_lsbAccellY / 128.0)); };
	float accellZ() { return (((float)_accellZ * 4.0 / 128.0) + ((float)_lsbAccellZ / 128.0)); };*/

	void reset() {
		// reset to center
		_joyX = 128.0;
		_joyY = 128.0;

		_accellX = 0;
		_accellY = 0;
		_accellZ = 0;

		_buttonC = false;
		_buttonZ = false;

		//_lsbAccellX = 0;
		//_lsbAccellY = 0;
		//_lsbAccellZ = 0;
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
		//unsigned int _lsbAccellX : 2;
		//unsigned int _lsbAccellY : 2;
		//unsigned int _lsbAccellZ : 2;
	};
};

class EdtOSCChuk : public EdtOSCObject
{
public:
	EdtOSCChuckData data = EdtOSCChuckData();

	EdtOSCChuk(const char * pattern) {
		_pattern = pattern;
	}

	const char * OSCPattern() {
		return _pattern;
	}

	void OSCCallback(OSCMessage &msg, int addrOffset) {
		for (int i = 0; i < 4; i++) {
			data.buffer[i] = msg.getFloat(i);
		}
	}
private:
	const char * _pattern;
};

class EdtI2CChuk : public EdtOSCSourceObject
{
public:
	EdtI2CChukData data = EdtI2CChukData();

	EdtI2CChuk(int i2cAddress, const char * oscAddress) {
		_i2cAddress = i2cAddress;
		_oscAddress = oscAddress;
		_requested = false;
	}

	void begin() {
		Wire.begin();
		Wire.beginTransmission(_i2cAddress);
		Wire.write((uint8_t)0x40);
		Wire.write((uint8_t)0x00);
		Wire.endTransmission();

		requestData();
	}

	OSCMessage generateMessage() {
		loop();

		OSCMessage message = new OSCMessage(_oscAddress);

		message
			.add<float>(data.buttonC())
			.add<float>(data.buttonZ())
			.add<float>(data.joyX())
			.add<float>(data.joyY());

		return message;
	}

private:
	int _i2cAddress;
	const char * _oscAddress;
	bool _requested;

	void requestData() {
		Wire.beginTransmission(_i2cAddress);
		Wire.write((uint8_t)0x00);
		Wire.endTransmission();
	}

	void loop() {
		int bytesReceived = 0;

		// Read 6 bytes from the nunchuck and check 6 bytes were received
		Wire.requestFrom(_i2cAddress, 6);
		while (Wire.available()) {
			data.buffer[bytesReceived++] = _decodeByte(Wire.read());
		}

		if (bytesReceived < 5) {
			data.reset();
		}

		requestData();
	}

	inline char _decodeByte(char x)
	{
		return (x ^ 0x17) + 0x17;
	}

};