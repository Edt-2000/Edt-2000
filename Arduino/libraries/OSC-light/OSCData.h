#pragma once

enum class OSCDataType {
	f = 1, i = 2
};

struct OSCData {
public:
	OSCDataType type;

	union data {
		float f;
		int32_t i;
	} data;

	OSCData() {
		data.f = 0.0;
		data.i = 0;
	}

	// resetter
	void empty() {
		data.f = 0.0;
		data.i = 0;
		type = OSCDataType::i;
	}

	// getters
	void get(float output) {
		output = data.f;
	}
	void get(int output) {
		output = data.i;
	}

	// setters
	void set(float datum) {
		type = OSCDataType::f;

		data.f = datum;
	}
	void set(int datum) {
		type = OSCDataType::i;

		data.i = datum;
	}
};