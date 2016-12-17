#pragma once

#include <OSCArduino.h>

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
		leftX = 0;
		leftY = 0;
		leftZ = 0;
		rightX = 0;
		rightY = 0;
		rightZ = 0;
	};

	bool lowLeft() {
		return (leftZ < 5);
	};

	bool lowRight() {
		return (rightZ < 5);
	};
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

class EdtOSCTrak : public OSC::IMessageConsumer {
public:
	EdtTrakData data = EdtTrakData();

	EdtOSCTrak(const char * pattern) {
		_pattern = pattern;
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSC::Message * msg) {
		for (int i = 0; i < 6; i++) {
			data.buffer[i] = msg->getInt(i);
		}
	}
private:
	const char * _pattern;
};

class EdtAITrak : public OSC::IMessageProducer {
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

	void loop() {}

	OSC::Message * generateMessage() {
		for (int i = 0; i < 6; i++) {
			data.buffer[i] = analogRead(_config.buffer[i]) / 8;
			_message.add<int>(data.buffer[i]);
		}

		_currentEmpty = data.lowLeft() && data.lowRight();

		if (data.lowLeft()) {
			_message.set(0, 0);
			_message.set(1, 0);
			_message.set(2, 0);
		}
		if(data.lowRight()) {
			_message.set(3, 0);
			_message.set(4, 0);
			_message.set(5, 0);
		}

		_message.setValidData(!(_currentEmpty && _previousEmpty));

		_previousEmpty = _currentEmpty;

		return &_message;
	};
private:
	OSC::Message _message = OSC::Message();
	EdtAITrakConfig _config = EdtAITrakConfig();

	bool _previousEmpty = false;
	bool _currentEmpty = false;
};