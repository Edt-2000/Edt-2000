#pragma once

#include <Definitions.h>
#include <Time.h>
#include <OSCMessage.h>
#include <Udp.h>

class IOSCMessageProducer
{
public:
	virtual OSCMessage * generateMessage() = 0;
};

class IOSCMessageConsumer
{
public:
	virtual const char * address() = 0;
	virtual void callback(OSCMessage *) = 0;
};

class EdtOSC
{
public:
	EdtOSC() {}
	EdtOSC(int sources, int objects) {
		_oscProducers = new IOSCMessageProducer*[objects];
		_oscConsumers = new IOSCMessageConsumer*[sources];
	}

	void bindUDP(UDP * udp, IPAddress remoteIP, int remotePort) {
		_udpHandle = udp;
		_remoteIP = remoteIP;
		_remotePort = remotePort;
	}

	void addProducer(IOSCMessageProducer * source) {
		_oscProducers[_producers++] = source;
	}

	void addConsumer(IOSCMessageConsumer * object) {
		_oscConsumers[_consumers++] = object;
	}

	void loop() {
		int i;
		int size;

		for (i = 0; i < _producers; ++i) {
			send(_oscProducers[i]->generateMessage());
		}

		if (_consumers > 0) {
			if ((size = _udpHandle->parsePacket()) > 0) {
				// size exceeds current buffer. resize buffer to fit incoming message
				if (size > _udpBufferSize) {
					delete[] _udpBuffer;

					_udpBufferSize = size;
					_udpBuffer = new char[_udpBufferSize];
				}

				// write udp data to buffer
				_udpHandle->read(_udpBuffer, size);

				// feed udp data via buffer
				// reuse the same message everytime to save repetitive memory allocations
				_messageIN.fill(_udpBuffer, size);

				i = 0;
				do {
					if (_messageIN.route(_oscConsumers[i]->address())) {
						_oscConsumers[i]->callback(&_messageIN);
					}
				} while (++i < _consumers);

				_udpHandle->flush();
			}
		}
		else {
			_udpHandle->flush();
		}
	}

	void send(OSCMessage * message) {
		_udpHandle->beginPacket(_remoteIP, _remotePort);
		message->send(_udpHandle);
		_udpHandle->endPacket();
		message->empty();
	}
private:
	UDP * _udpHandle;

	char * _udpBuffer = new char[16];
	int _udpBufferSize = 16;

	OSCMessage _messageIN = OSCMessage();

	IOSCMessageProducer ** _oscProducers;
	IOSCMessageConsumer ** _oscConsumers;

	IPAddress _remoteIP;
	int _remotePort;

	int _producers = 0;
	int _consumers = 0;
};