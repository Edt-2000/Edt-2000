/*
Edt-Suit

Using PlatformIO
*/
#include "SuitApplication.h"

SuitApplication application = SuitApplication();

void setup() {
	application.setup();
}

void loop() {
	application.run();
}