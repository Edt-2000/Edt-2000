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

#ifndef OSCMESSAGE_h
#define OSCMESSAGE_h

#include <Arduino.h>
#include <Print.h>

class OSCMessage;

union OSCData {
	int32_t i; //int
	float f; //float
	OSCData(float datum) {
		f = datum;
	}
};

class OSCMessageHandler
{
public:
	virtual const char * OSCPattern() = 0;
	virtual void OSCCallback(OSCMessage &msg, int addrOffset) = 0;
};

class OSCMessage
{
	
private:
    
    //friends
	friend class OSCBundle;

/*=============================================================================
	PRIVATE VARIABLES
=============================================================================*/

	//the address
	char * address;

	//the data
	OSCData * data;
	//OSCData ** data;

	//the number of OSCData in the data array
	int dataCount;

	// the number of OSCData reserved
	int reservedCount;
    
/*=============================================================================
    DECODING INCOMING BYTES
 =============================================================================*/
    
    //the decoding states for incoming bytes
    enum DecodeState {
        STANDBY,
        ADDRESS,
        ADDRESS_PADDING,
        TYPES,
        TYPES_PADDING,
        DATA,
        DATA_PADDING,
        DONE,
    } decodeState;
    
    //stores incoming bytes until they can be decoded
    uint8_t * incomingBuffer;
    int incomingBufferSize; // how many bytes are stored
    int incomingBufferFree; // how many bytes are allocated but unused
    
    //adds a byte to the buffer
    void addToIncomingBuffer(uint8_t);
    //clears the incoming buffer
    void clearIncomingBuffer();
    
    //decoding function
    void decode(uint8_t);
    void decodeAddress();
    void decodeType(uint8_t);
    void decodeData(uint8_t);

/*=============================================================================
	HELPER FUNCTIONS
=============================================================================*/

	void setupMessage();

	//compares the OSCData's type char to a test char
	bool testType(int position, char type);
public:

/*=============================================================================
	CONSTRUCTORS / DESTRUCTOR
=============================================================================*/
	
	//new constructor needs an address
	OSCMessage (const char * _address);
    //no address
    //placeholder since it's invalide OSC
	OSCMessage();
    
	//can optionally accept all of the data after the address
	//OSCMessage(const char * _address, char * types, ... );
    //created from another OSCMessage
    OSCMessage (OSCMessage *);

	//DESTRUCTOR
	~OSCMessage();

	//empties all of the data
	OSCMessage& empty();

/*=============================================================================
	SETTING  DATA
=============================================================================*/

	//reserves a predefined amount of data so multiple add calls won't cause multile reallocations of the data
	//retuns whether it is a success or failure
	bool reserve(int count) {
		reservedCount += count;

		OSCData * dataMem = (OSCData *)realloc(data, sizeof(OSCData) * (reservedCount));
		if (dataMem == NULL) {
			return false;
		} else {
			data = dataMem;
			return true;
		}
	}

	//returns the OSCMessage so that multiple 'add's can be strung together
	//reserve the amount of items that will be added using reserve() for better performance
	OSCMessage& add(float datum){
		if (dataCount < reservedCount) {
			//add data to the end of the array
			data[dataCount++] = datum;
		} else {
			// reserving new memory every add-call is expensive.
			if (reserve(1)) {
				//add data to the end of the array
				data[dataCount++] = datum;
			}
		}
		return *this;
	}

    OSCMessage& setAddress(const char *);

/*=============================================================================
	GETTING DATA

	getters take a position as an argument
=============================================================================*/

	float getFloat(int);

	int getAddress(char * buffer, int offset = 0);
	int getAddress(char * buffer, int offset, int len);
		

/*=============================================================================
	TESTING DATA

	testers take a position as an argument
=============================================================================*/

	bool isFloat(int) { return true; }
		
/*=============================================================================
	PATTERN MATCHING
=============================================================================*/
	
	//match the pattern against the address
	//returns true only for a complete match
	bool fullMatch( const char * pattern, int = 0);
	
	//returns the number of characters matched in the address
	int match( const char * pattern, int = 0);
	
	//calls the function with the message as the arg if it was a full match
	bool dispatch(const char * pattern, void (*callback)(OSCMessage &), int = 0);
	
	//like dispatch, but allows for partial matches
	//the address match offset is sent as an argument to the callback
	//also room for an option address offset to allow for multiple nested routes
	bool route(const char * pattern, void (*callback)(OSCMessage &, int), int = 0);
	bool route(OSCMessageHandler * messageHandler, int = 0);


/*=============================================================================
	SIZE
=============================================================================*/
	
	//the number of data that the message contains
	int size();
	
	//computes the number of bytes the OSCMessage occupies if everything is 32-bit aligned
	int bytes();
    
/*=============================================================================
    TRANSMISSION
 =============================================================================*/
    
    //send the message
    OSCMessage& send(Print &p);
    
    //fill the message from a byte stream
    OSCMessage& fill(uint8_t);
    OSCMessage& fill(uint8_t *, int);
};

#endif