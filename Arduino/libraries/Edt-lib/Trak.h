#pragma once

#include "OSC.h"

union EdtTrakData
{
	float buffer[6];
	struct {
		float leftX;
		float leftY;
		float leftZ;
		float rightX;
		float rightY;
		float rightZ;
	};

	EdtTrakData() {
		leftX = 0.0;
		leftY = 0.0;
		leftZ = 0.0;
		rightX = 0.0;
		rightY = 0.0;
		rightZ = 0.0;
	}
};

union EdtAITrakConfig
{
	int buffer[6];
	struct {
		int leftX;
		int leftY;
		int leftZ;
		int rightX;
		int rightY;
		int rightZ;
	};
};

class EdtOSCTrak : public EdtOSCObject {
public:
	EdtTrakData data = EdtTrakData();

	EdtOSCTrak(const char * pattern) {
		_pattern = pattern;
	}

	const char * OSCPattern() {
		return _pattern;
	}

	void OSCCallback(OSCMessage &msg, int addrOffset) {
		for (int i = 0; i < 6; i++) {
			data.buffer[i] = msg.getFloat(i);
		}
	}
private:
	const char * _pattern;
};

class EdtAITrak : public EdtOSCSourceObject {
public:
	EdtTrakData data = EdtTrakData();

	EdtAITrak(int leftX, int leftY, int leftZ, int rightX, int rightY, int rightZ, const char * oscAddress) {
		_config.leftX = leftX;
		_config.leftY = leftY;
		_config.leftZ = leftZ;
		_config.rightX = rightX;
		_config.rightY = rightY;
		_config.rightZ = rightZ;

		message.setAddress(oscAddress);
		message.reserve(6);
	};

	OSCMessage * generateMessage() {
		for (int i = 0; i < 6; i++) {
			data.buffer[i] = (float)analogRead(_config.buffer[i]) / 1023.0;
			message.add(data.buffer[i]);
		}
	
		return &message;
	};
private:
	OSCMessage message = OSCMessage();
	EdtAITrakConfig _config = EdtAITrakConfig();
};