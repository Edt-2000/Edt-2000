/*
Edt-Trak

Using PlatformIO
*/
#define VERSION "v1"

#include "Definitions.h"

#include "Arduino.h"
#include "SPI.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSCBundle.h"
#include "Time.h"
#include "Statemachine.h"

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ipBroadcaster(192, 168, 0, 103);

bool hasSerial = false;

int portBroadcaster = 9000;

EthernetUDP Udp;

// AI: LEFT { X, Y, Z } RIGHT { X, Y, Z }
int gameTrakPinConfig[2][3] = { { 0,0,0 },{ 0,0,0 } };
// DI: PEDAL
int foodPedalPinConfig = 7;

long messages = 0L;

void setup() {
	Statemachine.begin(13, LOW);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();
		pinMode(foodPedalPinConfig, INPUT_PULLUP);

		Serial.begin(9600);

		if (Serial) {
			hasSerial = true;
		}

		Serial.print("Edt-Trak ");
		Serial.println(VERSION);

		Serial.println("Starting Ethernet..");
		Ethernet.begin(mac, IP_TRAK);
		Serial.println("Started Ethernet.");

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(Ethernet.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Serial.println("Starting UDP..");
		Udp.beginMulticast(IP_MULTICAST, PORT_MULTICAST);
		Serial.println("Started UDP.");

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();

			if (Time.tOSC) {
				OSCMessage message = OSCMessage(OSC_TRAK);

				for (int i = 0; i < 2; i++) {

					for (int j = 0; j < 3; j++) {
						message.add<float>((float)analogRead(gameTrakPinConfig[i][j] / 1023.0));
					}
				}

				message.add<long>(++messages);

				Udp.beginPacket(Udp.remoteIP(), Udp.remotePort());
				message.send(Udp);
				message.empty();
				Udp.endPacket();
			}

			// restart when Serial has been detected
			if (!hasSerial && Serial) {
				Statemachine.restart();
			}
			// unset hasSerial
			if (hasSerial && !Serial) {
				hasSerial = false;
			}
		}
	}
}