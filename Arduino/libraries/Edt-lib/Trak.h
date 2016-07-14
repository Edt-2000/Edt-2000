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
};

class EdtTrak : public EdtOSCSourceObject {
public:
	EdtTrakData data = EdtTrakData();

	EdtTrak(int leftX, int leftY, int leftZ, int rightX, int rightY, int rightZ) {
		data.leftX = leftX;
		data.leftY = leftY;
		data.leftZ = leftZ;
		data.rightX = rightX;
		data.rightY = rightY;
		data.rightZ = rightZ;
	};

	OSCMessage generateMessage() {
		OSCMessage message = OSCMessage(OSC_TRAK);

		for (int i = 0; i < 6; i++) {
			message.add<float>((float)analogRead(data.buffer[i] / 1023.0));
		}

		return message;
	};
};