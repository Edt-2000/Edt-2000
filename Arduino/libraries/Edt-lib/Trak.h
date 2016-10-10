#pragma once

#include "OSC.h"

union EdtTrakData
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

class EdtOSCTrak : public IOSCMessageConsumer {
public:
	EdtTrakData data = EdtTrakData();

	EdtOSCTrak(const char * pattern) {
		_pattern = pattern;
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSCMessage * msg) {
		for (int i = 0; i < 6; i++) {
			data.buffer[i] = msg->getInt(i);
		}
	}
private:
	const char * _pattern;
};

class EdtAITrak : public IOSCMessageProducer {
public:
	EdtTrakData data = EdtTrakData();

	EdtAITrak(int leftX, int leftY, int leftZ, int rightX, int rightY, int rightZ, const char * oscAddress) {
		_config.leftX = leftX;
		_config.leftY = leftY;
		_config.leftZ = leftZ;
		_config.rightX = rightX;
		_config.rightY = rightY;
		_config.rightZ = rightZ;

		_message.setAddress(oscAddress);
		_message.reserve(6);
	};

	OSCMessage * generateMessage() {
		for (int i = 0; i < 6; i++) {
			data.buffer[i] = analogRead(_config.buffer[i]) / 8;
			_message.add<int>(data.buffer[i]);
		}
	
		return &_message;
	};
private:
	OSCMessage _message = OSCMessage();
	EdtAITrakConfig _config = EdtAITrakConfig();
};