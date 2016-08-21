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

		for(i = 0; i < _sources; ++i) {
			send(_oscSources[i]->generateMessage());
		}
		
		if (_objects > 0) {
			if ((size = _udpHandle->parsePacket()) > 0) {
				OSCMessage msgIN = OSCMessage();

				do {
					msgIN.fill(_udpHandle->read());
				} while (--size >= 0);

				i = 0;
				do {
					msgIN.route(_oscObjects[i]);
				} while (++i < _objects);
			}
		}
		else {
			_udpHandle->flush();
		}
	}

	void send(OSCMessage * message) {
		_udpHandle->beginPacket(_remoteIP, _remotePort);

		message->send(*_udpHandle);
		_udpHandle->endPacket();
		message->empty();
	}
private:
	UDP * _udpHandle;
	
	EdtOSCObject ** _oscObjects;
	EdtOSCSourceObject ** _oscSources;

	IPAddress _remoteIP;
	int _remotePort;

	int _objects = 0;
	int _sources = 0;
};