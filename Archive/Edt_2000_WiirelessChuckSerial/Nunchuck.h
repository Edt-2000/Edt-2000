#if !defined(Nunchuck_H)
#define Nunchuck_H

class Nunchuck {
public:
	Nunchuck();

	bool init();

	// returns 'true' when values have been read successfully
	bool read();

	inline int joyX() const { return joy_x; }
	inline int joyY() const { return joy_y; }
	inline int accX() const { return acc_x; }
	inline int accY() const { return acc_y; }
	inline int accZ() const { return acc_z; }

	inline bool buttonZ() const { return btn_z; }
	inline bool buttonC() const { return btn_c; }

	// returns 'false', when the nunchuck needs to be initialized
	inline bool ok() const { return !error; }

private:
	void request();
	void decode(uint8_t* buf);

	int joy_x, joy_y, acc_x, acc_y, acc_z;

	bool btn_z, btn_c;
	bool error;

	//int calib_joy_x, calib_joy_y;
	static const int calib_joy_x = 127;
	static const int calib_joy_y = 127;
};

#endif // Nunchuck_H