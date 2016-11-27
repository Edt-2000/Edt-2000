/*
Edt-Tree

Using PlatformIO
*/
#define VERSION "v1"
#define DEBUG
//#define CButton
#define ZButton

// include as first to avoid intellisense issues in visual studio
#include "ESP8266WiFi.h"

#include "Definitions.h"

#include "Arduino.h"
#include "WiFiUdp.h"
#include "OSC.h"
#include "Statemachine.h"
#include "Time.h"

#include "LightPWM.h"
#include "Trak.h"
#include "Chuk.h"
#include "Pedal.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

WiFiUDP Udp;
EdtOSC OSC;

EdtLightPWM PWM = EdtLightPWM();
EdtOSCTrak Trak = EdtOSCTrak(OSC_TRAK);
EdtOSCPedal Pedal = EdtOSCPedal(OSC_PEDAL);
EdtOSCChuk Chuk = EdtOSCChuk(OSC_SUIT_CHUK);

void setup() {
	Statemachine.begin(5, HIGH);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		// Tree code
		int i = 0;
		while (++i < 500) {
			// add some delay
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

		Udp.begin(PORT_BROADCAST);

		OSC = EdtOSC(3, 0);
		OSC.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		OSC.addConsumer(&Trak);
		OSC.addConsumer(&Pedal);
		OSC.addConsumer(&Chuk);

		PWM.start(5);

		Statemachine.ready();
	}
	else {

		int output = 0;
		bool strobo = false;
		unsigned int stroboCycle = 0;
		unsigned int stroboLength = 8096;

		while (Statemachine.isRun()) {
			Time.loop();
			PWM.loop();

			OSC.loop(Time.tOSC);

#ifdef CButton
			if (Chuk.data.buttonC()) {
#endif
#ifdef ZButton
			if (Chuk.data.buttonZ()) {
#endif
				output = 255;

				strobo = Chuk.data.joyY() > 0;

				if (strobo) {
					stroboLength = 8096 - (Chuk.data.joyY() * 48);
				}
				else {
					stroboLength = 8096;
				}

				if (Chuk.data.joyY() < 0) {
					output += max(-255, Chuk.data.joyY() * 3);
				}

				if (Chuk.data.joyX() > 40) {
					output = max(output, pow(((double)stroboCycle) / ((double)stroboLength), 2.0) * 255);
				}
			}
			else {
				output = 0;
			}

			stroboCycle++;

			if (strobo) {
				PWM.set((stroboCycle < stroboLength) ? output : 0);
			}
			else {
				PWM.set(output);
			}

			if (stroboCycle > 2 * stroboLength) {
				stroboCycle = 0;
			}

			// yield to the mighty ESP8266 code 
			yield();
		}
	}
}

