#include <SPI.h>
#include <Ethernet.h>
#include <EthernetUdp.h>
#include <OSCBundle.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

IPAddress mirror = { 192, 168, 0, 100 };

int serverPort = 8000;
int destPort = 9000;

int redLEDPin = 5;
int greenLEDPin = 6;

int localButtonPin = 8;
bool localButton = false;

EthernetUDP Udp;

void setup() {
	pinMode(localButtonPin, INPUT_PULLUP);

	pinMode(redLEDPin, OUTPUT);
	pinMode(greenLEDPin, OUTPUT);

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

	if (localButton != digitalRead(localButtonPin)) {
		localButton = !localButton;

		digitalWrite(redLEDPin, !localButton);

		OSCMessage msgOUT("/Button/1");

		msgOUT.add<int>(!localButton);

		Udp.beginPacket(mirror, destPort);
		msgOUT.send(Udp);
		Udp.endPacket();
		msgOUT.empty();
	}
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
			msgIN.route("/Button/1", toggleOnOff);
		}
	}
}

void toggleOnOff(OSCMessage &msg, int addrOffset) {
	int state = msg.getInt(0);
	digitalWrite(greenLEDPin, state);
}

