#include <Ethernet.h>
#include <EthernetUdp.h>
#include <OSCBundle.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

IPAddress mirror = { 192, 168, 0, 101 };
IPAddress ip = { 192, 168, 0, 120 };

int serverPort = 8000;
int destPort = 9000;

int redLEDPin = 5;
int greenLEDPin = 6;

int localButtonPin = A5;
bool localButton = false;

long start;
long stop;

int messages = 0;

EthernetUDP Udp;

void setup() {

	Serial.begin(9600);
	while (!Serial);
	Serial.println("OSC test");
	
	pinMode(localButtonPin, INPUT_PULLUP);

	pinMode(redLEDPin, OUTPUT);
	pinMode(greenLEDPin, OUTPUT);


	Serial.println("Ethernet starting..");
	Ethernet.begin(mac, ip);
	Serial.println("Ethernet started.");

	Serial.println("Udp starting..");
	Udp.begin(serverPort);
	Serial.println("Udp started.");
}

void loop() {
	OSCMsgReceive();

	if (localButton != digitalRead(localButtonPin)) {
		Serial.print("Button event ");
		Serial.println(++messages);

		localButton = !localButton;

		digitalWrite(redLEDPin, localButton);

		Serial.println("Button event send");

		start = micros();

		OSCMessage msgOUT("/Button/1");

		msgOUT.add<int>(localButton);

		Udp.beginPacket(mirror, destPort);
		msgOUT.send(Udp);
		Udp.endPacket();
		msgOUT.empty();
		Serial.println("Button event sent");
	}
}

void OSCMsgReceive() {
	OSCMessage msgIN;
	int size;
	if ((size = Udp.parsePacket())>0) {
		while (size--) {
			msgIN.fill(Udp.read());
		}

		Serial.println("Message received");

		if (!msgIN.hasError()) {
			msgIN.route("/Button/1", toggleOnOff);
		}
	}
}

void toggleOnOff(OSCMessage &msg, int addrOffset) {
	int state = msg.getInt(0);
	digitalWrite(greenLEDPin, state);

	stop = micros();

	Serial.print("Message exchange took: ");
	Serial.print(stop - start);
	Serial.println(" us");
}