/*
Edt-Tree

Using PlatformIO
*/
#include "TreeApplication.h"

TreeApplication application = TreeApplication(Button::C);

void setup() {
	application.setup();
}

void loop() {
	application.loop();
}