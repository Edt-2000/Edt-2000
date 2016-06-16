//DHCP-based OSC server test code
//for use with IDE 1.0.5
//for use with W5100 or W5200 based ethernet shields

#include <SPI.h>
#include <Ethernet.h>
#include <EthernetUdp.h>
#include <OSCBundle.h>

// you can find this written on the board of some Arduino Ethernets or shields
byte mac[] = {
	0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// NOTE: Alternatively, you can assign a fixed IP to configure your
//       Ethernet shield.
//       byte ip[] = { 192, 168, 0, 154 };


int serverPort = 8000; //TouchOSC (incoming port)
int destPort = 9000;    //TouchOSC (outgoing port)
int ledPin = 9;       //pin 13 on Arduino Uno. Pin 6 on a Teensy++2
int ledState = LOW;
int ledIntensity = 0;

//Create UDP message object
EthernetUDP Udp;

void setup() {
	pinMode(ledPin, OUTPUT);
	analogWrite(ledPin, ledIntensity);

	Serial.begin(9600); //9600 for a "normal" Arduino board (Uno for example). 115200 for a Teensy ++2 
	Serial.println("OSC test");

	// start the Ethernet connection:
	// NOTE: Alternatively, you can assign a fixed IP to configure your
	//       Ethernet shield.
	//       Ethernet.begin(mac, ip);   
	if (Ethernet.begin(mac) == 0) {
		Serial.println("Failed to configure Ethernet using DHCP");
		// no point in carrying on, so do nothing forevermore:
		while (true);
	}
	// print your local IP address:
	Serial.print("Arduino IP address: ");
	for (byte thisByte = 0; thisByte < 4; thisByte++) {
		// print the value of each byte of the IP address:
		Serial.print(Ethernet.localIP()[thisByte], DEC);
		Serial.print(".");
	}

	Udp.begin(serverPort);
}

void loop() {
	//process received messages
	OSCMsgReceive();
}

void OSCMsgReceive() {
	OSCMessage msgIN;
	int size;
	if ((size = Udp.parsePacket())>0) {
		while (size--) {
			Serial.write(Udp.peek());

			msgIN.fill(Udp.read());

		}
		Serial.println();
		

		if (!msgIN.hasError()) {
			msgIN.route("/ToggleButton1", toggleOnOff);
			msgIN.route("/SliderH2", funcValue);
		}
	}
}

void toggleOnOff(OSCMessage &msg, int addrOffset) {
	ledState = msg.getInt(0);
	OSCMessage msgOUT("/ToggleButton1");

	if (ledState) {
		analogWrite(ledPin, ledIntensity);
	}
	else {
		analogWrite(ledPin, 0);
	}

	msgOUT.add(ledState);
	if (ledState) {
		Serial.println("LED on");
	}
	else {
		Serial.println("LED off");
	}

	Udp.beginPacket(Udp.remoteIP(), destPort);
	msgOUT.send(Udp); // send the bytes
	Udp.endPacket(); // mark the end of the OSC Packet
	msgOUT.empty(); // free space occupied by message
}

void funcValue(OSCMessage &msg, int addrOffset) {

	ledIntensity = msg.getInt(0) * 2;
	OSCMessage msgOUT("/SliderH2");

	if (ledState) {
		analogWrite(ledPin, ledIntensity);
	}
	else {
		analogWrite(ledPin, 0);
	}

	Serial.print("Value = : ");
	Serial.println(ledIntensity);

	msgOUT.add(ledIntensity);

	Udp.beginPacket(Udp.remoteIP(), destPort);
	msgOUT.send(Udp); // send the bytes
	Udp.endPacket(); // mark the end of the OSC Packet
	msgOUT.empty(); // free space occupied by message
}
