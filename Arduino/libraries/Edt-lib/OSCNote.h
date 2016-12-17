#pragma once
/*
#include <OSCArduino.h>
#include "MIDIStatus.h"
#include "Arduino.h"
#include "MIDI.h"

class EdtOSCNote : public OSC::IMessageConsumer {
public:
	EdtOSCNote(const char * pattern, midi::MidiInterface<HardwareSerial> * midi, EdtMIDIStatus * status) {
		_pattern = pattern;
		_midi = midi;
		_status = status;
	}

	const char * address() {
		return _pattern;
	}

	void callback(OSC::Message * msg) {
		_status->report();

		_midi->sendNoteOn(msg->getInt(2), msg->getInt(1), msg->getInt(0));
		_midi->sendNoteOff(msg->getInt(2), msg->getInt(1), msg->getInt(0));
	}
private:
	bool s = false;
	const char * _pattern;
	midi::MidiInterface<HardwareSerial> * _midi;
	EdtMIDIStatus * _status;
};
*/