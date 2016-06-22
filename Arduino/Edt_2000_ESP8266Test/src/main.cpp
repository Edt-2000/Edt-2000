#include "Arduino.h"
#include "SPI.h"
//#include "Ethernet.h"
//#include "EthernetUdp.h"
#include "WiFiUdp.h"
#include "OSCBundle.h"
#include "Time.h"
#include "Memory.h"
#include "ESP8266WiFi.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

const int LED_PIN = 5; // Thing's onboard, green LED
const int ANALOG_PIN = A0; // The only analog pin on the Thing
const int DIGITAL_PIN = 12; // Digital pin to be read

IPAddress ipLocal = { 192, 168, 0, 121 };
IPAddress ipBroadcaster = { 192, 168, 0, 101 };

int portLocal = 8000;
int portBroadcaster = 9000;

WiFiUDP Udp;
Time time;

void initHardware()
{
	Serial.begin(9600);
	pinMode(DIGITAL_PIN, INPUT_PULLUP);
	pinMode(LED_PIN, OUTPUT);
	digitalWrite(LED_PIN, LOW);
	// Don't need to set ANALOG_PIN as input, 
	// that's all it can be.
}

void connectWiFi()
{
	byte ledStatus = LOW;

	// Set WiFi mode to station (as opposed to AP or AP_STA)
	WiFi.mode(WIFI_STA);

	// WiFI.begin([ssid], [passkey]) initiates a WiFI connection
	// to the stated [ssid], using the [passkey] as a WPA, WPA2,
	// or WEP passphrase.
	WiFi.begin(WifiName, WifiPassword);

	// Use the WiFi.status() function to check if the ESP8266
	// is connected to a WiFi network.
	while (WiFi.status() != WL_CONNECTED)
	{
		// Blink the LED
		digitalWrite(LED_PIN, ledStatus); // Write LED high/low
		ledStatus = (ledStatus == HIGH) ? LOW : HIGH;

		// Delays allow the ESP8266 to perform critical tasks
		// defined outside of the sketch. These tasks include
		// setting up, and maintaining, a WiFi connection.
		delay(100);
		// Potentially infinite loops are generally dangerous.
		// Add delays -- allowing the processor to perform other
		// tasks -- wherever possible.
	}

	digitalWrite(LED_PIN, HIGH);
	delay(25);
	digitalWrite(LED_PIN, LOW);
	delay(25);
	digitalWrite(LED_PIN, HIGH);
	delay(25);
	digitalWrite(LED_PIN, LOW);
	delay(25);
	digitalWrite(LED_PIN, HIGH);
}

void setup() {
	initHardware();
	connectWiFi();

	time.begin();

	// wait to have serial
	while (!Serial);

	//Serial.println("Starting Ethernet..");
	//if (Ethernet.begin(mac) == 0) {
	//	Serial.println("Failed starting ethernet..");
	//}

	Serial.print("IP: ");
	for (byte thisByte = 0; thisByte < 4; thisByte++) {
		Serial.print(WiFi.localIP()[thisByte], DEC);
		Serial.print(".");
	}
	Serial.println();

	Serial.println("Udp starting..");
	Udp.begin(portLocal);
	Serial.println("Udp started.");
}

void toggleOnOff(OSCMessage &msg, int addrOffset) {
	int state = msg.getInt(0);
	// on ESP led is inverted
	digitalWrite(LED_PIN, !state);

	Serial.println("Button event send");

	OSCMessage msgOUT("/Button/1");

	msgOUT.add<int>(state);

	Udp.beginPacket(ipBroadcaster, portBroadcaster);
	msgOUT.send(Udp);
	Udp.endPacket();
	msgOUT.empty();
	Serial.println("Button event sent");
}

void OSCMsgReceive() {
	OSCMessage msgIN;
	int size;
	if ((size = Udp.parsePacket())>0) {
		while (size--) {
			msgIN.fill(Udp.read());
		}

		if (!msgIN.hasError()) {
			msgIN.route("/Button/1", toggleOnOff);
		}
	}
}

void loop() {
	time.loop();

	if (time.t100ms) {
		Serial.println("100ms");
	}

	OSCMsgReceive();
}