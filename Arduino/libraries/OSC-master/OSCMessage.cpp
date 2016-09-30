/*
 Written by Yotam Mann, The Center for New Music and Audio Technologies,
 University of California, Berkeley.  Copyright (c) 2012, The Regents of
 the University of California (Regents).

 Permission to use, copy, modify, distribute, and distribute modified versions
 of this software and its documentation without fee and without a signed
 licensing agreement, is hereby granted, provided that the above copyright
 notice, this paragraph and the following two paragraphs appear in all copies,
 modifications, and distributions.

 IN NO EVENT SHALL REGENTS BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
 SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING
 OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF REGENTS HAS
 BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 REGENTS SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 PURPOSE. THE SOFTWARE AND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED
 HEREUNDER IS PROVIDED "AS IS". REGENTS HAS NO OBLIGATION TO PROVIDE
 MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.

 For bug reports and feature requests please email me at yotam@cnmat.berkeley.edu
 */

#include "OSCMessage.h"
#include "OSCMatch.h"

 /*=============================================================================
	 CONSTRUCTORS / DESTRUCTOR
 =============================================================================*/

 //constructor with address
OSCMessage::OSCMessage(const char * _address) {
	setupMessage();
	setAddress(_address);
}

//constructor with nothing
//just a placeholder since the message is invalid
OSCMessage::OSCMessage() {
	setupMessage();
}

//sets up a new message
void OSCMessage::setupMessage() {
	address = NULL;
	//setup the attributes
	dataCount = 0;
	reservedCount = 0;
	//setup the space for data
	data = NULL;
	//setup for filling the message
	incomingBuffer = NULL;
	incomingBufferSize = 0;
	incomingBufferFree = 0;
	clearIncomingBuffer();
	//set the decode state
	decodeState = STANDBY;
}

//DESTRUCTOR
OSCMessage::~OSCMessage() {
	//free everything that needs to be freed
	//free the address
	free(address);
	//free the data
	empty();
	//delete the array
	if (reservedCount > 0) {
		delete[] data;
	}
	//free the filling buffer
	free(incomingBuffer);
}

OSCMessage& OSCMessage::empty() {
	while (dataCount > 0) {
		data[--dataCount].f = 0.0;
	}

	decodeState = STANDBY;
	clearIncomingBuffer();

	return *this;
}

//COPY
OSCMessage::OSCMessage(OSCMessage * msg) {
	//start with a message with the same address
	setupMessage();
	setAddress(msg->address);
	//add each of the data to the other message
	reserve(msg->dataCount);
	for (int i = 0; i < msg->dataCount; i++) {
		add(msg->data[i].f);
	}
}

/*=============================================================================
	GETTING DATA
=============================================================================*/

float OSCMessage::getFloat(int position) {
	return data[position].f;
}

/*=============================================================================
	PATTERN MATCHING
=============================================================================*/

int OSCMessage::match(const  char * pattern, int addr_offset) {
	int pattern_offset;
	int address_offset;
	int ret = osc_match(address + addr_offset, pattern, &pattern_offset, &address_offset);
	char * next = (char *)(address + addr_offset + pattern_offset);
	if (ret == 3) {
		return pattern_offset;
	}
	else if (pattern_offset > 0 && *next == '/') {
		return pattern_offset;
	}
	else {
		return 0;
	}
}

bool OSCMessage::fullMatch(const char * pattern, int addr_offset) {
	int pattern_offset;
	int address_offset;
	int ret = osc_match(address + addr_offset, pattern, &address_offset, &pattern_offset);
	return (ret == 3);
}

bool OSCMessage::dispatch(const char * pattern, void(*callback)(OSCMessage &), int addr_offset) {
	if (fullMatch(pattern, addr_offset)) {
		callback(*this);
		return true;
	}
	else {
		return false;
	}
}

bool OSCMessage::route(const char * pattern, void(*callback)(OSCMessage &, int), int initial_offset) {
	int match_offset = match(pattern, initial_offset);
	if (match_offset > 0) {
		callback(*this, match_offset + initial_offset);
		return true;
	}
	else {
		return false;
	}
}

bool OSCMessage::route(OSCMessageHandler * messageHandler, int initial_offset) {
	int match_offset = match(messageHandler->OSCPattern(), initial_offset);
	if (match_offset > 0) {
		messageHandler->OSCCallback(*this, match_offset + initial_offset);
		return true;
	}
	else {
		return false;
	}
}

/*=============================================================================
	ADDRESS
 =============================================================================*/

int OSCMessage::getAddress(char * buffer, int offset) {
	strcpy(buffer, address + offset);
	return strlen(buffer);
}

int OSCMessage::getAddress(char * buffer, int offset, int len) {
	strncpy(buffer, address + offset, len);
	return strlen(buffer);
}

OSCMessage& OSCMessage::setAddress(const char * _address) {
	//free the previous address
	free(address); // are we sure address was allocated?
	//copy the address
	char * addressMemory = (char *)malloc((strlen(_address) + 1) * sizeof(char));
	if (addressMemory == NULL) {
		address = NULL;
	}
	else {
		strcpy(addressMemory, _address);
		address = addressMemory;
	}
	return *this;
}

/*=============================================================================
	SIZE
=============================================================================*/

static inline int padSize(int bytes) { return (4 - (bytes & 03)) & 3; }

//returns the number of OSCData in the OSCMessage
int OSCMessage::size() {
	return dataCount;
}

int OSCMessage::bytes() {
	int messageSize = 0;
	//send the address
	int addrLen = strlen(address) + 1;
	messageSize += addrLen;
	//padding amount
	int addrPad = padSize(addrLen);
	messageSize += addrPad;
	//add the comma seperator
	messageSize += 1;
	//add the types
	messageSize += dataCount;
	//pad the types
	int typePad = padSize(dataCount + 1);   //for the comma
	if (typePad == 0) {
		typePad = 4; // to make sure the type string is null terminated
	}
	messageSize += typePad;
	//then the data
	messageSize += dataCount * 4;

	return messageSize;
}

/*=============================================================================
	SENDING
 =============================================================================*/

 /*
 based on http://stackoverflow.com/questions/809902/64-bit-ntohl-in-c

 if the system is little endian, it will flip the bits
 if the system is big endian, it'll do nothing
 */
template<typename T>
static inline T BigEndian(const T& x)
{
	const int one = 1;
	const char sig = *(char*)&one;
	if (sig == 0) return x; // for big endian machine just return the input
	T ret;
	int size = sizeof(T);
	char* src = (char*)&x + sizeof(T) - 1;
	char* dst = (char*)&ret;
	while (size-- > 0) {
		*dst++ = *src--;
	}
	return ret;
}

// this method assumes the message contains only floats and integers and puts the entire message on the stack prior to sending
// a message with 7 floats and ints will be 48 bytes big, so not that big.
OSCMessage& OSCMessage::send(Print &p) {
	uint8_t nullChar = '\0';
	int addressLength = strlen(address) + 1;
	int addressPadding = padSize(addressLength);
	int typePadding = padSize(dataCount + 1);
	if (typePadding == 0) {
		typePadding = 4;
	}

	int bufferPosition = 0;
	int bufferSize = addressLength + addressPadding + 1 + dataCount + typePadding + (dataCount * 4); // assuming every data is 4 bytes

	// put the complete message on the stack
	uint8_t buffer[bufferSize];

	memcpy(buffer, address, addressLength);
	bufferPosition = addressLength;

	while (addressPadding--) {
		buffer[bufferPosition++] = nullChar;
	}

	buffer[bufferPosition++] = ',';

	for (int i = 0; i < dataCount; ++i) {
		buffer[bufferPosition++] = 'f';
	}

	while (typePadding--) {
		buffer[bufferPosition++] = nullChar;
	}

	// intentionally assuming only floats or integers are transmitted (length = 4)
	for (int i = 0; i < dataCount; ++i) {
		uint32_t f = BigEndian(data[i].i);
		uint8_t * ptr = (uint8_t *)&f;

		memcpy(buffer + bufferPosition, ptr, 4);

		bufferPosition += 4;
	}

	p.write(buffer, bufferSize);

	return *this;
}

/*=============================================================================
	FILLING
 =============================================================================*/

OSCMessage& OSCMessage::fill(uint8_t incomingByte) {
	decode(incomingByte);
	return *this;
}

OSCMessage& OSCMessage::fill(uint8_t * incomingBytes, int length) {
	int i = 0;
	do {
		decode(incomingBytes[i]);
	} while (++i < length);

	return *this;
}

/*=============================================================================
	DECODING
 =============================================================================*/

void OSCMessage::decodeAddress() {
	setAddress((char *)incomingBuffer);
	//change the error from invalide message
	clearIncomingBuffer();
}

void OSCMessage::decodeData(uint8_t incomingByte) {
	//get the first OSCData to re-set
	for (int i = 0; i < dataCount; i++) {
		if (incomingBufferSize == 4) {
			//parse the buffer as a float
			union {
				float f;
				uint8_t b[4];
			} u;
			memcpy(u.b, incomingBuffer, 4);
			float dataVal = BigEndian(u.f);
			data[i].f = dataVal;
			clearIncomingBuffer();
		}
		break;
	}
}

//does not validate the incoming OSC for correctness
void OSCMessage::decode(uint8_t incomingByte) {
	addToIncomingBuffer(incomingByte);
	switch (decodeState) {
	case STANDBY:
		if (incomingByte == '/') {
			decodeState = ADDRESS;
		}
		break;
	case ADDRESS:
		if (incomingByte == 0) {
			//end of the address
			//decode the address
			decodeAddress();
			//next state
			decodeState = ADDRESS_PADDING;
		}
		break;
	case ADDRESS_PADDING:
		//it does not count the padding
		if (incomingByte == ',') {
			//next state
			decodeState = TYPES;
			clearIncomingBuffer();
		}
		break;
	case TYPES:
		if (incomingByte != 0) {
			//ignore types as all types are floats
		}
		else {
			decodeState = TYPES_PADDING;
		}
		//FALL THROUGH to test if it should go to the data state
	case TYPES_PADDING: {
		//compute the padding size for the types
		//to determine the start of the data section
		int typePad = padSize(dataCount + 1); // 1 is the comma
		if (typePad == 0) {
			typePad = 4;     // to make sure it will be null terminated
		}
		if (incomingBufferSize == (typePad + dataCount)) {
			clearIncomingBuffer();
			decodeState = DATA;
		}
	}
						break;
	case DATA:
		decodeData(incomingByte);
		break;
	case DATA_PADDING: {
		//get the last valid data
		for (int i = dataCount - 1; i >= 0; i--) {
			OSCData datum = data[i];
			//compute the padding size for the data
			int dataPad = padSize(4);
			//  if there is no padding required, switch back to DATA, and don't clear the incomingBuffer because it holds next data
			if (dataPad == 0) {
				decodeState = DATA;
			}
			else if (incomingBufferSize == dataPad) {
				clearIncomingBuffer();
				decodeState = DATA;
			}
			break;
		}
	}
	}
}


/*=============================================================================
	INCOMING BUFFER MANAGEMENT
 =============================================================================*/
#define OSCPREALLOCATEIZE 16
void OSCMessage::addToIncomingBuffer(uint8_t incomingByte) {
	//realloc some space for the new byte and stick it on the end
	if (incomingBufferFree > 0)
	{
		incomingBuffer[incomingBufferSize++] = incomingByte;
		incomingBufferFree--;
	}
	else
	{

		incomingBuffer = (uint8_t *)realloc(incomingBuffer, incomingBufferSize + 1 + OSCPREALLOCATEIZE);
		if (incomingBuffer != NULL) {
			incomingBuffer[incomingBufferSize++] = incomingByte;
			incomingBufferFree = OSCPREALLOCATEIZE;
		}
		else {
			//error = ALLOCFAILED;
		}
	}
}

void OSCMessage::clearIncomingBuffer() {
	incomingBuffer = (uint8_t *)realloc(incomingBuffer, OSCPREALLOCATEIZE);
	if (incomingBuffer != NULL) {
		incomingBufferFree = OSCPREALLOCATEIZE;
	}
	else {
		//error = ALLOCFAILED;
		incomingBuffer = NULL;

	}
	incomingBufferSize = 0;
}