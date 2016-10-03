#pragma once

#include <Print.h>

#include "OSCData.h"

class OSCMessage
{
public:
	OSCMessage();
	~OSCMessage();

	// Sets the address of the message.
	void setAddress(const char * address);

	// Reserves the specified amount of OSCData elements to avoid multiple reallocations of the buffer.
	void reserve(int count);
	// Removes all data from the OSCData buffer.
	void empty();

	// Gets the value at the given data position and writes it in the reference.
	template <typename T>
	void get(int position, T * datum) {
		if (position < _dataCount) {
			_data[position].get(&datum);
		}
	}

	// Sets the value in a new data position. To improve performance, this new position should be reserved first.
	template <typename T>
	void add(T datum) {
		if (_dataCount >= _reservedCount) {
			reserve(1);
		}

		_data[_dataCount++].set(datum);
	}

	// Evaluates wheter the given pattern is a valid route for the message.
	bool route(const char * pattern) {
		return _matchHelper.isMatch(_address, pattern);
	}

	// Sends the data using the given Print object.
	void send(Print * print);

	// Fills the data with the given data buffer.
	void fill(const char * data, int dataLength) {

	}
private:
	char * _address;

	OSCData * _data;
	OSCMatch _matchHelper = OSCMatch();

	int _reservedCount = 0;
	int _dataCount = 0;
	bool _isBigEndian = false;

	template<typename T>
	inline static T _makeBigEndian(const T& x)
	{
		T result;
		int size = sizeof(T);
		char* src = (char*)&x + sizeof(T) - 1;
		char* dst = (char*)&result;
		while (size-- > 0) {
			*dst++ = *src--;
		}
		return result;
	}

	bool _determineIsBigEndian() {
		const int one = 1;
		const char sig = *(char*)&one;

		return (sig == 0);
	}

	static inline int _padSize(int bytes) { return (4 - (bytes & 03)) & 3; }
};
