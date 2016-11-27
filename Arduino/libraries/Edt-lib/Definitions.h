#pragma once

#include "Arduino.h"

/* Definition file */

#define IP_INTERFACE IPAddress(0, 0, 0, 0)
#define IP_BROADCAST IPAddress(10, 0, 0, 255)
#define IP_TRAK IPAddress(10, 0, 0, 12)

byte MAC_TRAK[] = { 0x00, 0x00, 0x12, 0x34, 0x56, 0xA0 };
byte MAC_PING[] = { 0x00, 0x00, 0x12, 0x34, 0x56, 0xB0 };
byte MAC_PONG[] = { 0x00, 0x00, 0x12, 0x34, 0x56, 0xC0 };
byte MAC_MOSCIDI[] = { 0x00, 0x00, 0x12, 0x34, 0x56, 0xA1 };

#define PORT_BROADCAST uint16_t(12345)
#define PORT_SEND uint16_t(8888)

// instrument / input OSC names
#define OSC_TRAK "/TK"
#define OSC_PEDAL "/PD/1"
#define OSC_MIDICONTROL "/MC"
#define OSC_MIDINOTE "/MN"
#define OSC_SUIT "/ST"
#define OSC_SUIT_CHUK "/ST/CHK"