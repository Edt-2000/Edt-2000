#include "OSCMessage.h"
#include "OSCMatch.h"

OSCMessage::OSCMessage() {
	_address = NULL;
}

OSCMessage::~OSCMessage() {
	free(_address);
	if (_reservedCount > 0) {
		delete[] _data;
	}
}

void OSCMessage::setAddress(const char * address) {
	free(_address);

	char * addressMemory = (char *)malloc((strlen(address) + 1) * sizeof(char));

	strcpy(addressMemory, address);
	_address = addressMemory;
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

	for (int i = 0; i < _dataCount; ++i) {
		_data[i].outputOSCData(buffer + bufferPosition);
		
		bufferPosition += 4;
	}
	
	p->write(buffer, bufferSize);

	delete[] buffer;
}

void OSCMessage::fill(OSCMessage * message, const char * data, int dataLength)
{
	// make sure it is empty
	message->empty();

	if (dataLength > _bufferLength) {
		delete[] _dataBuffer;

		_bufferLength = dataLength + 4;

		_dataBuffer = new char[dataLength];
	}

	int addressLength = 0;
	int typeStart = 0;
	int typeLength = 0;
	int dataCount = 0;
	int dataStart = 0;
	char dataType;
	
	// address
	strcpy(_dataBuffer, data);
	addressLength = strlen(_dataBuffer) + 1;

	message->setAddress(_dataBuffer);

	// types
	typeStart = addressLength + _padSize(addressLength);
	strcpy(_dataBuffer, data + typeStart);
	dataCount = strlen(_dataBuffer) - 1;

	message->reserveAtLeast(dataCount);

	// type values
	typeLength = strlen(_dataBuffer) + 1;
	dataStart = typeStart + typeLength + _padSize(typeLength);

	for (int i = 0; i < dataCount; i++) {
		message->_data[i].inputOSCData(data + dataStart + (4 * i));
		
		switch (_dataBuffer[i + 1]) {
		case 'i':
			message->_data[i].type = OSCDataType::i;
			break;
		case 'f':
			message->_data[i].type = OSCDataType::f;
			break;
		}

		message->_dataCount++;
	}
}
