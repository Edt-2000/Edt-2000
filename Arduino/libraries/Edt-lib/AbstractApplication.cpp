#include <AbstractApplication.h>

void AbstractApplication::setup() {
	setupStatemachine();

	time.begin();
	statemachine.begin();

	setupStatemachine();
	setupNetwork();
	setupOsc();

	statemachine.ready();
}

void AbstractApplication::run() {
	statemachine.loop();

	if (statemachine.isRun()) {
		time.loop();

		osc.loop(time.tOSC);

		loop();
	}
}

void AbstractApplication::continueWhen(std::function<bool(void)> isOk) {
	while (!isOk()) {
		delay(100);
		statemachine.loop();
	}
}