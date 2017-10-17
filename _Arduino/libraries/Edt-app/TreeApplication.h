#pragma once

#include <functional>

#include "AbstractApplication.h"

#include "Definitions.h"

#include "ESP8266WiFi.h"
#include "Arduino.h"
#include "WiFiUdp.h"

#include "LightPWM.h"
#include "Chuk.h"

#include "WifiConfig.h" // defines WifiName and WifiPassword

enum Button
{
	C,
	Z
};

class TreeApplication : public AbstractApplication
{
public:
	EdtLightPWM PWM = EdtLightPWM();
	EdtOSCChuk chuk = EdtOSCChuk(OSC_SUIT_CHUK);

	WiFiUDP udp;

	Button button;
	int output = 0;
	bool strobo = false;

	unsigned int stroboCycle = 0;
	unsigned int stroboLength = 8096;

	TreeApplication(Button button) : button(button) {}

	void setupStatus() {
		status.setup(5, HIGH);

		PWM.start(5);
	}

	void setupNetwork() {
		WiFi.disconnect();
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);

		continueWhen([]()->bool {return WiFi.status() == WL_CONNECTED; });

		udp.begin(PORT_BROADCAST);
	}

	void setupOsc() {
		osc = OSC::Arduino(1, 0);
		osc.bindUDP(&udp, IP_BROADCAST, PORT_BROADCAST);
		osc.addConsumer(&chuk);
	}

	void applicationLoop() {
		bool activate = false;

		if (button == Button::C) {
			activate = chuk.data.buttonC();
		}
		else {
			activate = chuk.data.buttonZ();
		}

		if (activate) {
			output = 255;

			strobo = chuk.data.joyY() > 0;

			if (strobo) {
				stroboLength = 8096 - (chuk.data.joyY() * 48);
			}
			else {
				stroboLength = 8096;
			}

			if (chuk.data.joyY() < 0) {
				output += max(-255, chuk.data.joyY() * 3);
			}

			if (chuk.data.joyX() > 40) {
				output = max(output, pow(((double)stroboCycle) / ((double)stroboLength), 2.0) * 255);
			}
		}
		else {
			strobo = false;
			output = 0;
		}

		stroboCycle++;

		if (!chuk.data.buttonC() && !chuk.data.buttonZ()) {
			PWM.set(16);
		}
		else if (strobo) {
			PWM.set((stroboCycle < stroboLength) ? output : 0);
		}
		else {
			PWM.set(output);
		}

		if (stroboCycle > 2 * stroboLength) {
			stroboCycle = 0;
		}

		PWM.loop();

		yield();
	}
};