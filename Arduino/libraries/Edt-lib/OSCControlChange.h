#pragma once

#include "OSC.h"
#include "MIDIStatus.h"
#include "Arduino.h"
#include "MIDI.h"

class EdtOSCControlChange : public IOSCMessageConsumer {
public:
	EdtOSCControlChange(const char * pattern, midi::MidiInterface<HardwareSerial> * midi, EdtMIDIStatus * status) {
		_pattern = pattern;
		_midi = midi;
		_status = status;
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSCMessage * msg) {
		_status->report();

		_midi->sendControlChange(msg->getInt(0), msg->getInt(2), msg->getInt(1));
	}
private:
	bool s = false;
	const char * _pattern;
	midi::MidiInterface<HardwareSerial> * _midi;
	EdtMIDIStatus * _status;
};