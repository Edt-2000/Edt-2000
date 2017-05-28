#pragma once

#include <functional>

#include "AbstractApplication.h"

#include "Definitions.h"

#include "ESP8266WiFi.h"
#include "Arduino.h"
#include "WiFiUdp.h"

#include "Chuk.h"

#include "WifiConfig.h" // defines WifiName and WifiPassword

class SuitApplication : public AbstractApplication
{
public:
	EdtI2CChuk chuk = EdtI2CChuk(0x52, OSC_SUIT_CHUK);
	WiFiUDP udp;

	void setupStatus() {
		status.setup(5, HIGH);
	}

	void setupNetwork() {
		WiFi.disconnect();
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);

		while (!WiFi.status() == WL_CONNECTED) {}

		udp.begin(PORT_BROADCAST);
	}

	void setupOsc() {
		osc = OSC::Arduino(0, 1);
		osc.bindUDP(&udp, IP_BROADCAST, PORT_BROADCAST);
		osc.addProducer(&chuk);

		chuk.begin();
	}

	void applicationLoop() {
		yield();
	}
};


