#include <OSCMessage.h>
#include <Udp.h>

struct EdtOSCRoute {
	char * pattern;
	void(*callback)(OSCMessage &, int);
};

class EdtOSC
{
public:
	EdtOSC() {

	};

	void bindUDP(UDP * udp) {
		_udpHandle = udp;
	}

	void addRoute(char * pattern, void(*callback)(OSCMessage &, int)) {
		EdtOSCRoute * old = new EdtOSCRoute[_routes];

		for (int i = 0; i < _routes; i++) {
			old[i] = _oscRoutes[i];
		}

		_oscRoutes = new EdtOSCRoute[_routes + 1];

		for (int i = 0; i < _routes ; i++) {
			_oscRoutes[i] = old[i];
		}

		_oscRoutes[_routes++] = EdtOSCRoute{ pattern, callback };
	}

	void loop() {
		OSCMessage msgIN;
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
		_udpHandle->beginPacket(_udpHandle->remoteIP(), _udpHandle->remotePort());

		message.send(*_udpHandle);
		_udpHandle->endPacket();
		message.empty();
	}
private:
	UDP * _udpHandle;
	
	EdtOSCRoute * _oscRoutes;
	int _routes = 0;

} OSC;