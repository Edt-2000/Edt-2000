/*
Edt-Trak

Using PlatformIO
*/
#define VERSION "v1"

#include "Definitions.h"

#include "Arduino.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSC.h"
#include "Time.h"
#include "Statemachine.h"
#include "Preset.h"
#include "Chuk.h"

bool hasSerial = false;

EthernetUDP Udp;

// AI: LEFT { X, Y, Z } RIGHT { X, Y, Z }
int gameTrakPinConfig[2][3] = { { 0,0,0 },{ 0,0,0 } };
// DI: PEDAL
int foodPedalPinConfig = 7;

long messages = 0L;

void setup() {
	Statemachine.begin(13, LOW);

	OSC.bindUDP(&Udp);

	// Trak code



	// /Trak code
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		Serial.begin(9600);

		while (!Serial) {
			hasSerial = true;
		}

		Serial.print("Edt-Trak ");
		Serial.println(VERSION);

		Serial.println("Starting Ethernet..");
		Ethernet.begin(MAC_TRAK, IP_TRAK);
		Serial.println("Started Ethernet.");

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(Ethernet.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Serial.println("Starting UDP..");
		Udp.begin(PORT_MULTICAST);
		Serial.println("Started UDP.");
		
		Serial.println("Starting code..");
		// Trak code


		// /Trak code
		Serial.println("Started code.");

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();

			// Trak code

			if (Time.tOSC) {
				Serial.println("Loop");

				OSCMessage message = OSCMessage(OSC_TRAK);

				for (int i = 0; i < 2; i++) {
					for (int j = 0; j < 3; j++) {
						message.add<float>((float)analogRead(gameTrakPinConfig[i][j] / 1023.0));
					}
				}
				message.add<long>(++messages);

				Udp.beginPacket(IP_MULTICAST, PORT_MULTICAST);

				message.send(Udp);
				Udp.endPacket();
				message.empty();
			}

			// /Trak code
			
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