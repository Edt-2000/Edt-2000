#pragma once

#include <Definitions.h>
#include <Time.h>
#include <OSCMessage.h>
#include <Udp.h>

class IOSCMessageProducer
{
public:
	virtual void loop() = 0;
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
	EdtOSC(int consumers, int producers) {
		_oscConsumers = new IOSCMessageConsumer*[consumers];
		_oscProducers = new IOSCMessageProducer*[producers];
	}

	void bindUDP(UDP * udp, IPAddress remoteIP, int remotePort) {
		_udpHandle = udp;
		_remoteIP = remoteIP;
		_remotePort = remotePort;
	}

	void consumeExclusivelyFrom(IPAddress remoteIP) {
		_exclusiveIP = remoteIP;
		_hasExclusiveIP = true;
	}

	void addConsumer(IOSCMessageConsumer * consumer) {
		_oscConsumers[_consumers++] = consumer;
	}

	void addProducer(IOSCMessageProducer * producer) {
		_oscProducers[_producers++] = producer;
	}

	void loop(bool send = true) {
		int i;
		int size;

		i = 0;

		// first, loop all producer's loop methods, then get all the messages out
		while (i < _producers) {

			_oscProducers[i]->loop();

			if (send) {
				OSCMessage * message = _oscProducers[i]->generateMessage();

				if (message->isSendableMessage()) {
					_udpHandle->beginPacket(_remoteIP, _remotePort);
					message->send(_udpHandle);
					_udpHandle->endPacket();
				}

				message->empty();
			}
			++i;
		}

		// then process all the messages in
		if (_consumers > 0) {
			if ((size = _udpHandle->parsePacket()) > 0) {

				// ignore messages which are not from a specific IP
				if (_hasExclusiveIP && _exclusiveIP != _udpHandle->remoteIP()) {
					return;
				}

				// make sure buffer is big enough
				_messageIN.reserveForProcess(size);

				// write udp data to buffer
				_udpHandle->read(_messageIN.processBuffer, size);

				// reuse the same message everytime to save repetitive memory allocations
				_messageIN.process();

				i = 0;
				do {
					if (_messageIN.isValidRoute(_oscConsumers[i]->address())) {
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
private:
	UDP * _udpHandle;
	IPAddress _exclusiveIP;
	bool _hasExclusiveIP = false;

	OSCMessage _messageIN = OSCMessage();

	IOSCMessageProducer ** _oscProducers;
	IOSCMessageConsumer ** _oscConsumers;

	IPAddress _remoteIP;
	int _remotePort;

	int _producers = 0;
	int _consumers = 0;
};