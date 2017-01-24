#pragma once

#include <functional>

#include "Udp.h"
#include "Statemachine.h"
#include "Time.h"
#include "OSCArduino.h"

#include <functional>

class AbstractApplication
{
public:
	AbstractApplication() {
		statemachine = EdtStatemachine();
		time = EdtTime();
	}

	void setup();

	virtual void setupStatemachine() = 0;
	virtual void setupNetwork() = 0;
	virtual void setupOsc() = 0;
	virtual void loop() = 0;

	void run();

protected:
	void continueWhen(std::function<bool (void)>);

	EdtStatemachine statemachine;
	EdtTime time;

	OSC::Arduino osc;
};

