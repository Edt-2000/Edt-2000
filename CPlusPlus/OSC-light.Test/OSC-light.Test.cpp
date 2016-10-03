// simple test app to evaluate matching
// all successfull tests should yield true

#include "stdafx.h"

int main()
{
	OSCMatch tester = OSCMatch();

	bool tests[24];
	int i = 0;
	
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
	
	i = 0;
	for each(bool test in tests) {
		if (test) {
			printf("%i test succeeded.\r\n", i++);
		}
		else {
			printf("%i test failed.\r\n", i++);
		}
	}

	getchar();

    return 0;
}

