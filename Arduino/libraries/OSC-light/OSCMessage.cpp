#include "OSCMessage.h"
#include "OSCMatch.h"

OSCMessage::OSCMessage() {
	_address = NULL;
}

OSCMessage::~OSCMessage() {
	if (_reservedCount > 0) {
		delete[] _data;
	}
}

void OSCMessage::setAddress(const char * address) {
	if (_address != nullptr) {
		delete[] _address;
	}

	_address = new char[strlen(address) + 1];
	strcpy(_address, address);
}

void OSCMessage::reserve(int count) {
	if (_reservedCount > 0) {
		delete[] _data;
	}	
	_reservedCount += count;
	_data = new OSCData[_reservedCount];
}

void OSCMessage::reserveAtLeast(int count) {
	if (_reservedCount < count) {
		reserve(count - _reservedCount);
	}
}

void OSCMessage::empty() {
	for (int i = 0; i < _reservedCount; ++i) {
		_data[i].empty();
	}
	_dataCount = 0;
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

	strcpy(buffer, _address);
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

	for (int i = 0; i < _dataCount; ++i) {
		_data[i].outputOSCData(buffer + bufferPosition);
		
		bufferPosition += 4;
	}
	
	p->write(buffer, bufferSize);

	delete[] buffer;
}

void OSCMessage::process()
{
	// make sure the message is empty
	empty();

	int addressLength = 0;
	int typeStart = 0;
	int typeLength = 0;
	int dataCount = 0;
	int dataStart = 0;
	
	// address
	strcpy(_subBuffer, processBuffer);
	addressLength = strlen(_subBuffer) + 1;

	setAddress(_subBuffer);

	// types
	typeStart = addressLength + _padSize(addressLength);
	strcpy(_subBuffer, processBuffer + typeStart);
	dataCount = strlen(_subBuffer) - 1;

	reserveAtLeast(dataCount);

	// type values
	typeLength = strlen(_subBuffer) + 1;
	dataStart = typeStart + typeLength + _padSize(typeLength);

	for (int i = 0; i < dataCount; ++i) {
		_data[i].inputOSCData(processBuffer + dataStart + (4 * i));
		
		switch (_subBuffer[i + 1]) {
		case 'i':
			_data[i].type = OSCDataType::i;
			break;
		case 'f':
			_data[i].type = OSCDataType::f;
			break;
		}

		++_dataCount;
	}
}
