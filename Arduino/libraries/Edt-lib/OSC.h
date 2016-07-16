#pragma once

#include <Definitions.h>
#include <Time.h>
#include <OSCMessage.h>
#include <Udp.h>

struct EdtOSCRoute {
	const char * pattern;
	void(*callback)(OSCMessage &, int);
};

class EdtOSCSourceObject {
public:
	virtual OSCMessage generateMessage() = 0;
};

class EdtOSCObject {
public:
	virtual const char * OSCPattern() = 0;
	virtual void OSCCallback(OSCMessage &msg, int addrOffset) = 0;
};

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

	void addRoute(const char * pattern, void(*callback)(OSCMessage &, int)) {
		EdtOSCRoute * old;

		if (_routes > 0) {
			old = new EdtOSCRoute[_routes];

			for (int i = 0; i < _routes; i++) {
				old[i] = _oscRoutes[i];
			}
		}
		_oscRoutes = new EdtOSCRoute[_routes + 1];

		for (int i = 0; i < _routes ; i++) {
			_oscRoutes[i] = old[i];
		}

		_oscRoutes[_routes++] = EdtOSCRoute{ pattern, callback };
	}

	void addSource(EdtOSCSourceObject * source) {
		Serial.println("1");
		if (_sources > 0) {
			Serial.println("2");
			EdtOSCSourceObject ** old = new EdtOSCSourceObject*[_sources];
			Serial.println("4");

			for (int i = 0; i < _sources; i++) {
				Serial.println("5");
				old[i] = _oscSources[i];
			}

			// kill the old array
			delete _oscSources;

			Serial.println("6");
			_oscSources = new EdtOSCSourceObject*[_sources + 1];
			Serial.println("7");
		
			for (int i = 0; i < _sources; i++) {
				Serial.println("8");
				_oscSources[i] = old[i];
				Serial.println("9");
			}
		}
		else
		{
			Serial.println("a");
			_oscSources = new EdtOSCSourceObject*[_sources + 1];
		}

		Serial.println("10");
		_oscSources[_sources++] = source;
		Serial.println("11");
	}

	void loop() {
		if (Time.tOSC) {
			int i = 0;
			while (i < _sources) {
				send(_oscSources[i++]->generateMessage());
			}
		}

		OSCMessage msgIN = OSCMessage();
		int size;

		if ((size = _udpHandle->parsePacket())>0) {
			while (size--) {
				msgIN.fill(_udpHandle->read());
			}

			if (!msgIN.hasError()) {
				for (int i = 0; i < _routes; i++) {
					msgIN.route(_oscRoutes[i].pattern, _oscRoutes[i].callback);
				}
			}
		}
	}

	void send(OSCMessage message) {
		message.add<long>(++_messages);

		Serial.println("1");
		_udpHandle->beginPacket(_remoteIP, _remotePort);
		Serial.println("2");

		Serial.println("3");
		message.send(*_udpHandle);
		Serial.println("4");
		_udpHandle->endPacket();
		Serial.println("5");
		message.empty();
		Serial.println("6");
	}
private:
	UDP * _udpHandle;
	
	EdtOSCRoute * _oscRoutes;
	EdtOSCSourceObject ** _oscSources;

	IPAddress _remoteIP;
	int _remotePort;

	int _routes = 0;
	int _sources = 0;

	long _messages = 0;
} OSC;