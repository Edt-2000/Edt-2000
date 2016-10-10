#pragma once

class Print {
public:
	char * buffer;
	int bufferSize = 0;

	void write(const char * data, int dataCount) {
		if (bufferSize > 0) {
			delete[] buffer;
		}

		buffer = new char[dataCount];
		bufferSize = dataCount;

		memcpy(buffer, data, dataCount);
	}
};