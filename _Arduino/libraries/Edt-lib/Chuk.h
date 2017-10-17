/*
Adapted from:

This library is from the Bionic Arduino course :
http://todbot.com/blog/bionicarduino/
2007-11 Tod E. Kurt, http://todbot.com/blog/

The Wii Nunchuck reading code originally from Windmeadow Labs
http://www.windmeadow.com/node/42

*/
#pragma once

#include <OSCArduino.h>
#include <Wire.h>

union EdtOSCChuckData
{
public:
	int buffer[4];

	EdtOSCChuckData() {
		reset();
	}

	int joyX() { return _joyX; };
	int joyY() { return _joyY; };
	bool buttonC() { return _buttonC == 1; };
	bool buttonZ() { return _buttonZ == 1; };

	void reset() {
		_buttonC = 0;
		_buttonZ = 0;
		_joyX = 0;
		_joyY = 0;
	}

private:
	struct {
		int _buttonC;
		int _buttonZ;
		int _joyX;
		int _joyY;
	};
};

union EdtI2CChukData
{
public:
	byte buffer[6];

	EdtI2CChukData() {
		reset();
	};

	// normalization to -127 to 127 int
	int joyX() {
		float x = _joyX - 128;
		if (x < 5 && x > -5) {
			return 0.0;
		}
		else {
			return max(-127, min(127, x));
		}
	};
	int joyY() {
		int y = _joyY - 128;
		if (y < 5 && y > -5) {
			return 0.0;
		}
		else {
			return max(-127, min(127, y));
		}
	};
	bool buttonC() { return !_buttonC; };
	bool buttonZ() { return !_buttonZ; };

	// this is not normalized and not calibrated
	/*float accellX() { return (((float)_accellX * 4.0 / 128.0) + ((float)_lsbAccellX / 128.0)); };
	float accellY() { return (((float)_accellY * 4.0 / 128.0) + ((float)_lsbAccellY / 128.0)); };
	float accellZ() { return (((float)_accellZ * 4.0 / 128.0) + ((float)_lsbAccellZ / 128.0)); };*/

	void reset() {
		// reset to center
		_joyX = 128;
		_joyY = 128;

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

class EdtOSCChuk : public OSC::IMessageConsumer
{
public:
	EdtOSCChuckData data = EdtOSCChuckData();

	EdtOSCChuk(const char * pattern) {
		_pattern = pattern;
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSC::Message * msg) {
		for (int i = 0; i < 4; i++) {
			data.buffer[i] = msg->getInt(i);
		}
	}
private:
	const char * _pattern;
};

class EdtI2CChuk : public OSC::IMessageProducer
{
public:
	EdtI2CChukData data = EdtI2CChukData();
	EdtI2CChukData newData = EdtI2CChukData();

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

		_message.setAddress(_oscAddress);
		_message.reserve(4);

		_requestData();
	}

	void loop() {

	}

	OSC::Message * generateMessage() {
		_loop();

		_message.add<int>(data.buttonC());
		_message.add<int>(data.buttonZ());
		_message.add<int>(data.joyX());
		_message.add<int>(data.joyY());

		_message.setValidData(true);

		return &_message;
	}

private:
	int _i2cAddress;
	const char * _oscAddress;

	bool _requested;
	
	OSC::Message _message = OSC::Message();

	void _requestData() {
		Wire.beginTransmission(_i2cAddress);
		Wire.write((uint8_t)0x00);
		Wire.endTransmission();
	}

	void _loop() {
		int bytesReceived = 0;

		// Read 6 bytes from the nunchuck and check 6 bytes were received
		Wire.requestFrom(_i2cAddress, 6);
		while (Wire.available()) {
			newData.buffer[bytesReceived++] = _decodeByte(Wire.read());
		}

		if (bytesReceived == 6) {
			memcpy(&data, &newData, 6);
		}

		_requestData();
	}

	inline char _decodeByte(char x)
	{
		return (x ^ 0x17) + 0x17;
	}

};