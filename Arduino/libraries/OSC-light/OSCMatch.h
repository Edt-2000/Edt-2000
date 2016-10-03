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

#include <string>

#define OSCdevider "/"
#define OSCwildcardFullMatch "*"
#define OSCwildcardSingleMatch "_"

class OSCMatch
{
public:

	bool isMatch(const char * address, const char * pattern, int addressOffset = 0, int patternOffset = 0) {
		bool result = false;

		char * _pattern = new char[strlen(pattern) - patternOffset];
		char * _address = new char[strlen(address) - addressOffset];

		strcpy(_pattern, pattern + patternOffset);
		strcpy(_address, address + addressOffset);

		if (strcmp(address, pattern) == 0) {
			result = true;
		}
		else {
			char * patternPart;
			char * addressPart;

			addressPart = strtok(_address, OSCdevider);
			patternPart = strtok(_pattern, OSCdevider);

			if (patternPart != NULL && _address != NULL) {
				printf("%s %s \n", patternPart, addressPart);
				printf("%d %d - ", strlen(address), strlen(addressPart) + 2);
				printf("%d %d\n", strlen(pattern), strlen(patternPart) + 2);

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
				else if (strcspn(patternPart, OSCwildcardSingleMatch) < strlen(patternPart)) {
					continueMatching = isWildcardMatch(addressPart, patternPart);
				}

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

			// TODO: leaky leaky
			//delete[] patternPart;
			//delete[] addressPart;

			//delete[] _pattern;
			//delete[] _address;
		}

		return result;
	}

	inline bool isWildcardMatch(const char * address, const char * pattern) {
		int patternLength = strlen(pattern);

		if (patternLength > _replacedAddressBufferLength) {
			delete[] _replacedAddressBuffer;

			_replacedAddressBuffer = new char[patternLength];
			_replacedAddressBufferLength = patternLength;
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
	char * _replacedAddressBuffer = new char[16];
	int _replacedAddressBufferLength = 16;
};


