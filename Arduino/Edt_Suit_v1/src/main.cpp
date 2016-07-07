/*
Edt-Suit

Using PlatformIO
*/
#define VERSION "v1"

// include as first to avoid intellisense issues in visual studio
#include "ESP8266WiFi.h"

#include "Definitions.h"

#include "Arduino.h"
#include "SPI.h"
#include "WiFiUdp.h"
#include "OSC.h"
#include "Statemachine.h"
#include "Time.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

WiFiUDP Udp;

bool hasSerial = false;

// DI: button
int testButtonPinConfig = 12;
// DO: led
int ledPinConfig = 5;

void handleTrakMessage(OSCMessage &msg, int addrOffset) {
	float state = msg.getFloat(0);
	analogWrite(ledPinConfig, (int)state);

	Serial.print("Received: ");
	Serial.println(state);
}

void setup() {
	Statemachine.begin(5, HIGH);

	OSC.bindUDP(&Udp);
	OSC.addRoute(OSC_TRAK, handleTrakMessage);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		// Suit code

		pinMode(testButtonPinConfig, INPUT);
		pinMode(ledPinConfig, OUTPUT);

		// /Suit code

		Serial.begin(9600);
		
		if (Serial) {
			hasSerial = true;
		}

		// Set WiFi mode to station
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);
		while (WiFi.status() != WL_CONNECTED)
		{
			// really wait for this
			delay(10);

			// keep updating status
			Statemachine.loop();
		}

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(WiFi.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Serial.println("Udp starting..");
		Udp.beginMulticast(IP_INTERFACE, IP_MULTICAST, PORT_MULTICAST);
		Serial.println("Udp started.");

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();
			OSC.loop();

			// Suit code

			// /Suit code

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