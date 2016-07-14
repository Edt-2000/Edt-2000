#include <ESP8266WiFi.h>
#include <WiFiUdp.h>

// defines WifiName and WifiPassword
#include <WifiConfig.h>

#include <Time.h>
#include <Chuk.h>
#include <Definitions.h>
#include <OSC.h>
#include <OSCMessage.h>

WiFiUDP Udp;
EdtI2CChuk Chuk = EdtI2CChuk(0x52, OSC_SUIT);

void setup()
{
  Time.begin();

  Serial.begin(9600);
  Wire.begin();

  if (Serial) {
  }

  delay(1000);

  Serial.println();
  Serial.println("START");

  // Set WiFi mode to station

  WiFi.disconnect();
  WiFi.mode(WIFI_STA);
  WiFi.begin(WifiName, WifiPassword);

  Serial.println("Wait for wifi.");
  
  while (WiFi.status() != WL_CONNECTED)
  {
    // really wait for this
    delay(100);

    Serial.print(".");
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

  OSC.bindUDP(&Udp);

  Chuk.begin();
}

void loop()
{
  Time.loop();

  if (Time.tOSC) {
    Serial.println("Loop");
    
    Chuk.loop();

    OSCMessage msg = OSCMessage(OSC_SUIT);

    msg.add<float>(Chuk.data.buttonC());

    Udp.beginPacket(IP_MULTICAST, PORT_MULTICAST);

    msg.send(Udp);
    Udp.endPacket();
    msg.empty();
  }
}

