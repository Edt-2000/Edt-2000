/*
Edt-2000 Test Thing
*/

#define SYS 0
#define STEP 1
#define FULL 2

#include "ESP8266WiFi.h"
#include "Arduino.h"
#include "WiFiUdp.h"

#include "Definitions.h"

#include "OSC.h"
#include "OSCMessage.h"
#include "Statemachine.h"
#include "Time.h"

#include "WifiConfig.h"

WiFiUDP Udp;
EdtOSC OSC;

class OSCMessageReader : public IOSCMessageConsumer
{
	const char * address() {
		return "/M";
	}

	void callback(OSCMessage * msg) {
		Serial.print(msg->getInt(0));
		Serial.print(" ");
		Serial.print(msg->getInt(1));
		Serial.print(" ");
		Serial.print(msg->getInt(2));
		Serial.print(" ");
		Serial.print(msg->getInt(3));
		Serial.print(" ");
		Serial.print(msg->getInt(4));
		Serial.print(" ");
		Serial.println(msg->getInt(5));
	}
} OSCReader;

void setup() {
	Statemachine.begin(13, LOW);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		Time.startTiming(SYS);
		Time.startTiming(STEP);
		Time.startTiming(FULL);

		Serial.begin(9600);

		// Ping code
		Time.addTimeEvent(SYS, "Edt-Trak Ping");

		Time.addTimeEvent(SYS, "Starting Wifi..");

		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);

		while (WiFi.status() != WL_CONNECTED)
		{
			// really wait for this
			delay(10);

			// keep updating status
			Statemachine.loop();
		}

		Time.addTimeEvent(SYS, "Started Wifi.");

		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(WiFi.localIP()[thisByte], DEC);
			Serial.print(".");
		}
		Serial.println();

		Time.addTimeEvent(SYS, "Starting UDP..");

		Udp.begin(PORT_BROADCAST);

		Time.addTimeEvent(SYS, "Started UDP.");
		Time.addTimeEvent(SYS, "Starting code..");

		OSC = EdtOSC(1, 0);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addConsumer(&OSCReader);

		Time.addTimeEvent(SYS, "Started code.");
		// /Ping code

		Statemachine.ready();
	}
	else {
		while (Statemachine.isRun()) {
			Time.loop();
			OSC.loop();
		}
	}
}