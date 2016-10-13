// simple test app to evaluate matching
// all successfull tests should yield true

#include "stdafx.h"

#include "Print.h"

#include "..\..\Arduino\libraries\OSC-light\OSCMessage.cpp"
#include "..\..\Arduino\libraries\OSC-light\OSCMessage.h"
#include "..\..\Arduino\libraries\OSC-light\OSCMatch.h"


int main()
{
	Print print = Print();

	OSCMatch tester = OSCMatch();
	OSCMessage message = OSCMessage();
	OSCMessage newMessage = OSCMessage();

	int repeats = 0;

	while (repeats++ < 1000) {

		message.setAddress("/M");

		bool tests[100];
		for (int i = 0; i < 100; ++i) {
			tests[i] = false;
		}

		int i = 0, j = 0;

		tests[i++] = tester.isMatch("/Unit1", "/Unit1");
		tests[i++] = tester.isMatch("/Unit1/Preset", "/Unit1/Preset");
		tests[i++] = !tester.isMatch("/Unit1", "/Unit2");
		tests[i++] = !tester.isMatch("/Unit1/Preset", "/Unit2");
		tests[i++] = tester.isMatch("/Unit1/Preset/a", "/Unit1/Preset/a");
		tests[i++] = tester.isMatch("/Unit12345", "/Unit_2345");
		tests[i++] = tester.isMatch("/Unit12345", "/Unit_2_45");
		tests[i++] = tester.isMatch("/Unit12345", "/Unit_2_4_");
		tests[i++] = !tester.isMatch("/Unit12345", "/Unit_2_3_");
		tests[i++] = !tester.isMatch("/Unit12345", "/Unit_2_1_");
		tests[i++] = tester.isMatch("/Unit12345", "/Unit_2___");
		tests[i++] = tester.isMatch("/MegaUnitMegaUnitMegaUnitMegaUnit", "/MegaUnit_egaUnitMegaUnitMeg_Unit");
		tests[i++] = tester.isMatch("/Unit1/Preset", "/Unit_/Preset");
		tests[i++] = tester.isMatch("/Unit1/Preset", "/_n_t_/Preset");
		tests[i++] = tester.isMatch("/Unit1/Preset", "/Unit_/Preset");
		tests[i++] = tester.isMatch("/Unit2/Preset/a", "/Unit_/Preset/a");
		tests[i++] = tester.isMatch("/Unit1", "/*");
		tests[i++] = tester.isMatch("/Unit1/Preset", "/Unit1/*");
		tests[i++] = tester.isMatch("/Unit1/Preset/a", "/Unit1/*/a");
		tests[i++] = tester.isMatch("/Unit1/Preset/a", "/Unit1/Preset/*");
		tests[i++] = tester.isMatch("/Unit1/Preset/a", "/*/Preset/a");
		tests[i++] = !tester.isMatch("/Unit1/Preset", "/Unit1/*/a");
		tests[i++] = tester.isMatch("/Unit1/Preset/a/b/c", "/Unit1/*/a/*/c");
		tests[i++] = !tester.isMatch("/Unit1/Preset/a/b/d", "/Unit1/*/a/*/c");
		tests[i++] = tester.isMatch("/Unit1/Preset/a/c/a", "/*/*/a/*/*");

		tests[i++] = message.isValidRoute("/M");
		message.setAddress("/New/Address");
		tests[i++] = !message.isValidRoute("/M");
		tests[i++] = message.isValidRoute("/New/Address");
		message.setAddress("/M");
		tests[i++] = message.isValidRoute("/M");
		tests[i++] = !message.isValidRoute("/New/Address");

		message.empty();
		message.reserveAtLeast(16);
		message.add<int>(127);
		message.add<float>(2.3);
		message.add<float>(3.4);
		message.add<float>(4.5);
		message.add<float>(5.6);
		message.add<int>(4301);
		message.add<int>(-1);
		message.add<float>(123.123);
		message.add<float>(1234.1234);
		message.add<float>(12345.12345);
		message.add<float>(123456.123456);
		message.add<int>(-2);
		message.add<int>(32767);
		message.add<float>(-2.1);
		message.add<float>(-2.0001);
		message.add<float>(-10.0001);

		message.send(&print);
		newMessage.reserveForProcess(print.bufferSize);
		newMessage.processBuffer = print.buffer;
		newMessage.process();
		
		int m = 0;

		for (m = 0; m < 16; m++) {
			float md = message.getFloat(m);
			float nmd = newMessage.getFloat(m);

			tests[i++] = md == nmd;
		}
		
		bool failed = false;
		for(j = 0; j < i; j++) {
			if (tests[j]) {
				printf("%2i test succeeded.\r\n", j);
			}
			else {
				printf("%2i test failed.\r\n", j);
				failed = true;
			}
		}

		// stop leak test after first failure of complete test
		if (failed) {
			break;
		}
	}

	getchar();

    return 0;
}

