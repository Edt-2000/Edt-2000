#pragma once

class Memory
{
public:
	static int getFreeRAM() {
		extern int __heap_start, *__brkval;
		int v;
		return (int)&v - (__brkval == 0 ? (int)&__heap_start : (int)__brkval);
	}
};