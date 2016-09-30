#pragma once

#include <Definitions.h>
#include <Time.h>
#include <OSCMessage.h>
#include <Udp.h>

class EdtOSCSourceObject {
public:
	virtual OSCMessage * generateMessage() = 0;
};

class EdtOSCObject : public OSCMessageHandler {};

class EdtOSC
{
public:
	EdtOSC() {}
	EdtOSC(int sources, int objects) {
		_oscObjects = new EdtOSCObject*[objects];
		_oscSources = new EdtOSCSourceObject*[sources];
	}

	void bindUDP(UDP * udp, IPAddress remoteIP, int remotePort) {
		_udpHandle = udp;
		_remoteIP = remoteIP;
		_remotePort = remotePort;
	}

	void addSource(EdtOSCSourceObject * source) {
		_oscSources[_sources++] = source;
	}

	void addObject(EdtOSCObject * object) {
		_oscObjects[_objects++] = object;
	}

	void loop() {
		int i;
		int size;

		for (i = 0; i < _sources; ++i) {
			send(_oscSources[i]->generateMessage());
		}

		if (_objects > 0) {
			handleTime = micros();

			if ((size = _udpHandle->parsePacket()) > 0) {
				OSCMessage msgIN = OSCMessage();

				// size exceeds current buffer. resize buffer to fit incoming message
				if (size > _udpBufferSize) {
					delete[] _udpBuffer;

					_udpBufferSize = size;
					_udpBuffer = new unsigned char[_udpBufferSize];

				}

				// write udp data to buffer
				_udpHandle->read(_udpBuffer, size);

				// feed message udp data via buffer
				msgIN.fill((uint8_t*)_udpBuffer, size);

				i = 0;
				do {
					msgIN.route(_oscObjects[i]);
				} while (++i < _objects);

				_udpHandle->flush();
			}
		}
		else {
			handleTime = micros();

			//Serial.println("No data received.");

			_udpHandle->flush();

		}
		//Serial.print("Handling: ");
		//Serial.print(micros() - handleTime);
		//Serial.print(" Loop time: ");
		//Serial.println(micros() - loopTime);
		loopTime = micros();
	}

	void send(OSCMessage * message) {
		if (message) {
			_udpHandle->beginPacket(_remoteIP, _remotePort);
			message->send(*_udpHandle);
			_udpHandle->endPacket();
			message->empty();
		}
	}
private:
	UDP * _udpHandle;

	unsigned char * _udpBuffer = new unsigned char[16];
	int _udpBufferSize = 16;

	EdtOSCObject ** _oscObjects;
	EdtOSCSourceObject ** _oscSources;

	IPAddress _remoteIP;
	int _remotePort;

	int _objects = 0;
	int _sources = 0;

	long loopTime = micros();
	long handleTime;
};