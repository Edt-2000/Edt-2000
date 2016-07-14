#pragma once

#include "Arduino.h"

/* Definition file */

#define IP_TRAK IPAddress(192, 168, 0, 120)
#define IP_SUIT_1 IPAddress(192, 168, 0, 103)
#define IP_INTERFACE IPAddress(0, 0, 0, 0)
#define IP_BROADCAST IPAddress(192, 168, 0, 255)

byte MAC_TRAK[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

#define PORT_BROADCAST uint16_t(12345)
#define PORT_SEND uint16_t(8888)

// instrument / input OSC names
#define OSC_TRAK "/Trak"
#define OSC_SUIT "/Suit"