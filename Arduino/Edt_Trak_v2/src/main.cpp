/*
Edt-Trak

Using PlatformIO
*/
#define VERSION "v2"

#include "Arduino.h"
#include "SPI.h"
#include "Ethernet.h"
#include "EthernetUdp.h"
#include "OSCBundle.h"
#include "Time.h"
#include "Memory.h"

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ipLocal = { 192, 168, 0, 117 };
IPAddress ipBroadcaster = { 192, 168, 0, 101 };

char * oscPrefix = "/Trak1/";
char * oscGameTrakName[] = { "left", "right" };

int portLocal = 8000;
int portBroadcaster = 9000;

EthernetUDP udp;
Time time;

// AI: LEFT { X, Y, Z } RIGHT { X, Y, Z }
int gameTrakPinConfig[2][3] = { { 0,0,0 },{ 0,0,0 } };
// DI: PEDAL
int foodPedalPinConfig = 7;

void setup() {
	time.begin();

	pinMode(foodPedalPinConfig, INPUT_PULLUP);

	Serial.begin(9600);

	// wait to have serial
	while (!Serial);

	Serial.print("Edt-Trak ");
	Serial.println(VERSION);

	Serial.println("Starting Ethernet..");
	if (Ethernet.begin(mac) == 0) {
		Serial.println("Failed starting ethernet..");
	}

	Serial.print("IP: ");
	for (byte thisByte = 0; thisByte < 4; thisByte++) {
		Serial.print(Ethernet.localIP()[thisByte], DEC);
		Serial.print(".");
	}
	Serial.println();

	Serial.println("Starting UDP..");
	udp.begin(portLocal);
}


void loop() {
	time.loop();

	//if (time.t100ms) {


	for (int i = 0; i < 2; i++) {
		char url[48];

		strcpy(url, oscPrefix);
		strcat(url, oscGameTrakName[i]);

		OSCMessage message = OSCMessage(url);

		for (int j = 0; j < 3; j++) {
			message.add<float>((float)analogRead(gameTrakPinConfig[i][j]));
		}

		udp.beginPacket(ipBroadcaster, portBroadcaster);
		message.send(udp);
		message.empty();
		udp.endPacket();
	}

	//}
}