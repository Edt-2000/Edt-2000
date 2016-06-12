#include <Dhcp.h>
#include <Ethernet.h>
#include <EthernetUdp.h>

// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(10, 0, 0, 16);

char  ReplyBuffer[] = "acknowledged";       // a string to send back

// An EthernetUDP instance to let us send and receive packets over UDP
EthernetUDP Udp;


void setup() {
  // start the Ethernet and UDP:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
  }

  Serial.begin(115200);
}

void loop() {
    // send a reply to the IP address and port that sent us the packet we received
    Udp.beginPacket(ip, 8080);
    Udp.write("test");
    Udp.endPacket();
    delay(10);
}
