#pragma once

#include "Arduino.h"

class EdtMIDIStatus {
public:
	void report() {
		_status = !_status;

		digitalWrite(6, _status);
		digitalWrite(7, !_status);
	}
private:
	bool _status = false;
};