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
	EdtOSC() {
	};

	void bindUDP(UDP * udp, IPAddress remoteIP, int remotePort) {
		_udpHandle = udp;
		_remoteIP = remoteIP;
		_remotePort = remotePort;
	}

	void addSource(EdtOSCSourceObject * source) {
		if (_sources > 0) {
			EdtOSCSourceObject ** old = new EdtOSCSourceObject*[_sources];

			for (int i = 0; i < _sources; i++) {
				old[i] = _oscSources[i];
			}

			// kill the old array
			delete _oscSources;

			_oscSources = new EdtOSCSourceObject*[_sources + 1];
			
			for (int i = 0; i < _sources; i++) {
				_oscSources[i] = old[i];
			}
		}
		else
		{
			_oscSources = new EdtOSCSourceObject*[_sources + 1];
		}

		_oscSources[_sources++] = source;
	}

	void addObject(EdtOSCObject * object) {
		if (_objects > 0) {
			EdtOSCObject ** old = new EdtOSCObject*[_sources];

			for (int i = 0; i < _objects; i++) {
				old[i] = _oscObjects[i];
			}

			// kill the old array
			delete _oscSources;

			_oscObjects = new EdtOSCObject*[_objects + 1];

			for (int i = 0; i < _objects; i++) {
				_oscObjects[i] = old[i];
			}
		}
		else
		{
			_oscObjects = new EdtOSCObject*[_objects + 1];
		}

		_oscObjects[_objects++] = object;
	}

	void loop() {
		int i;

		//if (Time.tOSC) {
		for(i = 0; i < _sources; i++) {
			send(_oscSources[i]->generateMessage());
		}
		//}


		int size;

		if ((size = _udpHandle->parsePacket())>0) {
			OSCMessage msgIN = OSCMessage();

			while (size--) {
				msgIN.fill(_udpHandle->read());
			}

			for (i = 0; i < _objects; i++) {
				msgIN.route(_oscObjects[i]);
			}
		}
	}

	void send(OSCMessage * message) {
		_udpHandle->beginPacket(_remoteIP, _remotePort);

		message->add<int>(++_messages);

		message->send(*_udpHandle);
		_udpHandle->endPacket();
		message->empty();

		delete message;
	}
private:
	UDP * _udpHandle;
	
	EdtOSCObject ** _oscObjects;
	EdtOSCSourceObject ** _oscSources;

	IPAddress _remoteIP;
	int _remotePort;

	int _objects = 0;
	int _sources = 0;
	int _messages = 0;
} OSC;