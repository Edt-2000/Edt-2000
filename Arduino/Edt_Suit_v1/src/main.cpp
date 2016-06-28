/*
Edt-Suit

Using PlatformIO
*/
#define VERSION "v1"

// include as first to avoid intellisense issues in visual studio
#include "ESP8266WiFi.h"

#include "Arduino.h"
#include "SPI.h"
#include "WiFiUdp.h"
#include "OSCBundle.h"
#include "Statemachine.h"
#include "Time.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

IPAddress ipLocal = { 192, 168, 0, 121 };
IPAddress ipBroadcaster = { 192, 168, 0, 101 };

//String oscPrefix = "/Suit1/";

int portLocal = 8000;
int portBroadcaster = 9000;

WiFiUDP Udp;

EdtTime Time;

// DI: button
int testButtonPinConfig = 12;
// DO: led
int ledPinConfig = 5;

void setup() {
	Statemachine.begin(5, HIGH);
}

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

void handleTrakMessage(OSCMessage &msg, int addrOffset) {
	float state = msg.getFloat(0);
	analogWrite(ledPinConfig, (int)state);
}

void OSCMsgReceive() {
	OSCMessage msgIN;
	int size;
	if ((size = Udp.parsePacket())>0) {
		while (size--) {
			msgIN.fill(Udp.read());
		}

		if (!msgIN.hasError()) {
			msgIN.route("/Trak1/left", handleTrakMessage);
			//msgIN.route("/Button/1", toggleOnOff);
		}
	}
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();
		pinMode(testButtonPinConfig, INPUT);
		pinMode(ledPinConfig, OUTPUT);

		Serial.begin(9600);

		// really wait for this
		while (!Serial) {
			Statemachine.loop();
		}

		// Set WiFi mode to station
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);
		while (WiFi.status() != WL_CONNECTED)
		{
			// really wait for this
			delay(10);

			Statemachine.loop();
		}

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(WiFi.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Serial.println("Udp starting..");
		Udp.begin(portLocal);
		Serial.println("Udp started.");

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();

			OSCMsgReceive();

			if (!Serial) {
				Statemachine.restart();
			}
		}
	}
}