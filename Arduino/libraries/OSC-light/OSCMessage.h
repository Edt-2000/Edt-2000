#pragma once

#include <Print.h>

#include "OSCData.h"

class OSCMessage
{
public:
	OSCMessage();

	void setAddress(const char * address);

	// Reserves the specified amount of OSCData elements to avoid multiple reallocations of the buffer.
	void reserve(int count);
	// Removes all data from the OSCData buffer.
	void empty();

	
	template <typename T>
	void get(int position, T datum) {
		if (position < _dataCount) {
			_data[position].get(datum);
		}
	}

	template <typename T>
	void add(T datum) {
		if (_dataCount >= _reservedCount) {
			reserve(1);
		}

		_data[_dataCount++].set(datum);
	}

	bool route(const char * pattern);

	void send(Print * print);

	void fill(const char * data, int dataLength);
private:
	char * _address;

	OSCData * _data;
	int _reservedCount = 0;
	int _dataCount = 0;

	bool _isMatch(const char *);

	template<typename T>
	static inline T _bigEndian(const T& x)
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

	static inline int _padSize(int bytes) { return (4 - (bytes & 03)) & 3; }
};
