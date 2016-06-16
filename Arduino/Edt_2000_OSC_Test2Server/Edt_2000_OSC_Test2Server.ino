#include <SPI.h>
#include <Ethernet.h>
#include <EthernetUdp.h>
#include <OSCBundle.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

int serverPort = 8000;
int destPort = 9000;

EthernetUDP Udp;

void setup() {
	pinMode(5, OUTPUT);
	pinMode(6, OUTPUT);
	pinMode(9, OUTPUT);

	Serial.begin(9600);
	Serial.println("OSC test");

	if (Ethernet.begin(mac) == 0) {
		Serial.println("Failed to configure Ethernet using DHCP");
		while (true);
	}
	
	Serial.print("Arduino IP address: ");
	for (byte thisByte = 0; thisByte < 4; thisByte++) {
		Serial.print(Ethernet.localIP()[thisByte], DEC);
		Serial.print(".");
	}
	Serial.println();

	Udp.begin(serverPort);
}

void loop() {
	OSCMsgReceive();
}

void OSCMsgReceive() {
	OSCMessage msgIN;
	int size;
	if ((size = Udp.parsePacket())>0) {
		while (size--) {
			Serial.write(Udp.peek());

			msgIN.fill(Udp.read());

		}
		Serial.println();

		if (!msgIN.hasError()) {
			// metroOSC cannot be configured...
			msgIN.route("/Button1", toggleOnOff);
			msgIN.route("/Button2", toggleOnOff);
			msgIN.route("/Button3", toggleOnOff);
		}
	}
}

void toggleOnOff(OSCMessage &msg, int addrOffset) {
	int state = msg.getInt(0);

	// stripping /Button from address
	char buffer[1];
	msg.getAddress(buffer, 7);

	if (buffer[0] == '1') {
		digitalWrite(5, state);
	}

	if (buffer[0] == '2') {
		digitalWrite(6, state);
	}

	if (buffer[0] == '3') {
		digitalWrite(9, state);
	}
}

