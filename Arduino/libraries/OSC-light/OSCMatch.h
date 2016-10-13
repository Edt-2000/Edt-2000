#pragma once

//
//	Matching algorithm for OSC messages.
//
//	Supported pattens:
//
//	Pattern						Matches addresses
//
//	/Unit1						/Unit1
//
//	/Unit2/Preset				/Unit2/Preset
//
//	/Unit3/Action/Something		/Unit3/Action/Something
//
//	/Unit_/Preset				/Unit1/Preset
//								/Unit2/Preset
//								/Unit3/Preset
//
//	/*							/Unit1
//								/Unit2
//								/Unit3
//								/Other
//
//	/*/Preset					/Unit1/Preset
//								/Unit2/Preset
//								/Unit3/Preset
//
//	/*/Preset/a					/Unit1/Preset/a
//								/Unit2/Preset/a
//								/Unit3/Preset/a
//
//	/*/Preset/*					/Unit1/Preset/a
//								/Unit1/Preset/b
//								/Unit2/Preset/a
//								/Unit2/Preset/b
//								/Unit3/Preset/a
//								/Unit3/Preset/b
//
//	Algorithm
//
//	1. Full match
//	2. Contains double slash, * or _?
//		1. Validate most left section, strip part and restart
//		2. Go until pattern is empty.
//
//

#include <string.h>

#define OSCdevider "/"
#define OSCwildcardFullMatch "*"
#define OSCwildcardSingleMatch "_"

class OSCMatch
{
public:

	bool isMatch(const char * address, const char * pattern, int addressOffset = 0, int patternOffset = 0) {
		bool result = false;
		
		if (strcmp(address, pattern) == 0) {
			result = true;
		}
		else {
			int addressLength = strlen(address) + 1;

			if (addressLength > _bufferLength) {
				delete[] _patternBuffer;
				delete[] _addressBuffer;

				_bufferLength = addressLength + 4;

				_patternBuffer = new char[_bufferLength];
				_addressBuffer = new char[_bufferLength];
			}

			strcpy(_patternBuffer, pattern + patternOffset);
			strcpy(_addressBuffer, address + addressOffset);

			char * patternPart;
			char * addressPart;

			if (_addressBuffer != NULL) {
				patternPart = strtok(_patternBuffer, OSCdevider);
				addressPart = strtok(_addressBuffer, OSCdevider);

				if (patternPart != NULL) {
					bool continueMatching = false;

					// address pattern compare
					// full match
					if (strcmp(addressPart, patternPart) == 0) {
						continueMatching = true;
					}
					// asterisk
					else if (strcmp(patternPart, OSCwildcardFullMatch) == 0) {
						continueMatching = true;
					}
					// wildcard character
#ifndef ARDUINO_ESP8266_THING
					else if (strcspn(patternPart, OSCwildcardSingleMatch) < strlen(patternPart)) {
						continueMatching = isWildcardMatch(addressPart, patternPart);
					}
#endif

					if (continueMatching) {
						bool patternCanContinue = (strlen(pattern) > patternOffset + strlen(patternPart) + 1);
						bool addressCanContinue = (strlen(address) > addressOffset + strlen(addressPart) + 1);

						if (addressCanContinue && patternCanContinue) {
							result = isMatch(address, pattern, addressOffset + strlen(addressPart) + 1, patternOffset + strlen(patternPart) + 1);
						}
						else {
							result = (!addressCanContinue && !patternCanContinue);
						}
					}
				}
			}
		}

		return result;
	}

	inline bool isWildcardMatch(const char * address, const char * pattern) {
		int patternLength = strlen(pattern) + 1;

		if (patternLength > _replacedAddressBufferLength) {
			delete[] _replacedAddressBuffer;

			_replacedAddressBufferLength = patternLength + 4;

			_replacedAddressBuffer = new char[patternLength];
		}

		strcpy(_replacedAddressBuffer, address);

		int i = 0;
		
		// crawling throught the pattern might not be the fastest way of doing this
		for (i = 0; i < patternLength; ++i) {
			if (strncmp(pattern + i,OSCwildcardSingleMatch, 1) == 0) {
				strncpy(_replacedAddressBuffer + i, OSCwildcardSingleMatch, 1);
			}
		}

		return strncmp(_replacedAddressBuffer, pattern, patternLength) == 0;
	}
private:
	char * _replacedAddressBuffer = new char[4];
	int _replacedAddressBufferLength = 4;

	char * _patternBuffer = new char[4];
	char * _addressBuffer = new char[4];
	int _bufferLength = 4;
};


