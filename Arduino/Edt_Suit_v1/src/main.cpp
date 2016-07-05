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

// DI: button
int testButtonPinConfig = 12;
// DO: led
int ledPinConfig = 5;
/*
void toggleOnOff(OSCMessage &msg, int addrOffset) {
	int state = msg.getInt(0);
	// on ESP led is inverted
	digitalWrite(ledPinConfig, !state);

	Serial.println("Button event send");

	OSCMessage msgOUT("/Button/1");

	msgOUT.add<int>(state);

	Udp.beginPacket(ipBroadcaster, portBroadcaster);
	msgOUT.send(Udp);
	Udp.endPacket();
	msgOUT.empty();
	Serial.println("Button event sent");
}
*/
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
		pinMode(testButtonPinConfig, INPUT);
		pinMode(ledPinConfig, OUTPUT);

		Serial.begin(9600);
		while (!Serial) {
			// really wait for this
			delay(10);

			// keep updating status
			Statemachine.loop();
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

			if (!Serial) {
				Statemachine.restart();
			}
		}
	}
}