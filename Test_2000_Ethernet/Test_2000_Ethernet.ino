/*
 Name:		Test_2000_Ethernet.ino
 Created:	6/15/2016 8:54:32 PM
 Author:	thoma
*/

// the setup function runs once when you press reset or power the board
#include <EthernetUdp.h>
#include <EthernetServer.h>
#include <EthernetClient.h>
#include <Ethernet.h>
#include <Dns.h>
#include <Dhcp.h>

byte mac[] = {
	0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 0, 177);
IPAddress myDns(192, 168, 0, 1);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 0, 0);


// telnet defaults to port 23
EthernetServer server(23);
boolean alreadyConnected = false; // whether or not the client was connected previously

void setup() {
	// initialize the ethernet device
	Ethernet.begin(mac, ip, myDns, gateway, subnet);
	// start listening for clients
	server.begin();
	// Open serial communications and wait for port to open:
	Serial.begin(9600);
	while (!Serial) {
		; // wait for serial port to connect. Needed for native USB port only
	}

	Serial.print("Chat server address:");
	Serial.println(Ethernet.localIP());
}

void loop() {
	// wait for a new client:
	EthernetClient client = server.available();

	// when the client sends the first byte, say hello:
	if (client) {
		if (!alreadyConnected) {
			// clear out the input buffer:
			client.flush();
			Serial.println("We have a new client");
			client.println("Hello, client!!");
			alreadyConnected = true;
		}

		if (client.available() > 0) {
			// read the bytes incoming from the client:
			char thisChar = client.read();
			// echo the bytes back to the client:
			server.write(thisChar);
			// echo the bytes to the server as well:
			Serial.write(thisChar);
		}
	}
}
