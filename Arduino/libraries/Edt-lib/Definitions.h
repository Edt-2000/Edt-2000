#pragma once

#include "Arduino.h"

/* Definition file */

#define IP_INTERFACE IPAddress(0, 0, 0, 0)
#define IP_BROADCAST IPAddress(10, 0, 0, 255)

byte MAC_TRAK[] = { 0x00, 0x00, 0x12, 0x34, 0x56, 0xA0 };

#define PORT_BROADCAST uint16_t(12345)
#define PORT_SEND uint16_t(8888)

// instrument / input OSC names
#define OSC_TRAK "/Trak"
#define OSC_SUIT "/Suit"
#define OSC_SUIT_CHUK "/Suit/Chuk"