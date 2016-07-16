#pragma once

#include "OSC.h"

class EdtPreset : public EdtOSCObject
{
public:
	EdtPreset(const char * node) {
		_preset = 0;
		_node = node;
	}

	int preset() {
		return _preset;
	}

	const char * OSCPattern() {
		char * buffer = new char[7 + sizeof(_node)];

		strcpy(buffer, "/Preset");
		strcpy(buffer + 7, _node);

		return buffer;
	}

	void OSCCallback(OSCMessage &msg, int addrOffset) {
		float preset = msg.getFloat(0);
		_preset = (int)preset;
	}
	
private:
	int _preset;
	const char * _node;
};