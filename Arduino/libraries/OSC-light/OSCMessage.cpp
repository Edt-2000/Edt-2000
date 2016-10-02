#include "OSCMessage.h"
#include "OSCMatch.h"

// TODO: use own implementation of OSCMatch
OSCMessage::OSCMessage() {
	_address = NULL;

	_isBigEndian = _determineIsBigEndian();
}

void OSCMessage::setAddress(const char * address) {
	free(_address);

	char * addressMemory = (char *)malloc((strlen(address) + 1) * sizeof(char));

	strcpy(addressMemory, address);
	_address = addressMemory;
}

void OSCMessage::reserve(int count) {
	_reservedCount += count;
	OSCData * dataMemory = (OSCData *)realloc(_data, sizeof(OSCData) * (_reservedCount));
	_data = dataMemory;
}

void OSCMessage::empty() {
	for (int i = 0; i < _reservedCount; ++i) {
		_data[i].empty();
	}
	_dataCount = 0;
}

bool OSCMessage::route(const char * pattern) {
	return _isMatch(pattern);
}

void OSCMessage::send(Print * p) {
	char nullChar = '\0';
	int addressLength = strlen(_address) + 1;
	int addressPadding = _padSize(addressLength);
	int typePadding = _padSize(_dataCount + 1);
	if (typePadding == 0) {
		typePadding = 4;
	}

	int bufferPosition = 0;

	int bufferSize = addressLength + addressPadding + 1 + _dataCount + typePadding + (_dataCount * 4);

	char * buffer = new char[bufferSize];

	memcpy(buffer, _address, addressLength);
	bufferPosition = addressLength;

	while (addressPadding--) {
		buffer[bufferPosition++] = nullChar;
	}

	buffer[bufferPosition++] = ',';

	for (int i = 0; i < _dataCount; ++i) {
		switch (_data[i].type) {
		case OSCDataType::i:
			buffer[bufferPosition++] = 'i';
			break;
		case OSCDataType::f:
			buffer[bufferPosition++] = 'f';
			break;
		}
	}

	while (typePadding--) {
		buffer[bufferPosition++] = nullChar;
	}

	if (_isBigEndian) {
		for (int i = 0; i < _dataCount; ++i) {
			uint32_t f = _data[i].data.i;
			uint8_t * ptr = (uint8_t *)&f;

			memcpy(buffer + bufferPosition, ptr, 4);

			bufferPosition += 4;
		}
	}
	else {
		for (int i = 0; i < _dataCount; ++i) {
			uint32_t f = _makeBigEndian(_data[i].data.i);
			uint8_t * ptr = (uint8_t *)&f;

			memcpy(buffer + bufferPosition, ptr, 4);

			bufferPosition += 4;
		}
	}

	p->write(buffer, bufferSize);

	delete[] buffer;
}

void OSCMessage::fill(const char * data, int dataLength)
{

}

bool OSCMessage::_isMatch(const char * pattern) {
	int pattern_offset;
	int address_offset;
	int ret = osc_match(_address, pattern, &pattern_offset, &address_offset);

	return ret == 3;
	/*
	char * next = (char *)(_address + pattern_offset);
	if (ret == 3) {
		return pattern_offset;
	}
	else if (pattern_offset > 0 && *next == '/') {
		return pattern_offset;
	}
	else {
		return 0;
	}
	*/
}
