//#include <wiring.h>
#include <Wire.h>
#include <HardwareSerial.h>
//#include <EEPROM.h>

#include "Arduino.h"

#include "Nunchuck.h"

#define Nunchuck_ADR 0x52
#define INIT_TIMEOUT 100
#define NEW_WAY

#define KEY_ENC_ADD (0x00)
#define KEY_ENC_XOR (0x00)
#define KEY_DECRYPT_ADD (0x97)
#define KEY_DECRYPT_XOR (0x97)

Nunchuck::Nunchuck()
{
	error = true;
}


bool GetIdent()
{
	Wire.beginTransmission(Nunchuck_ADR);
	Wire.write(0xFA);
	if (Wire.endTransmission() == 0)
	{
		uint8_t ident[6];
		int cnt;
		Wire.requestFrom(Nunchuck_ADR, sizeof(ident));
		for (cnt = 0; Wire.available() && (cnt < sizeof(ident)); cnt++)
		{
			ident[cnt] = Wire.read();
		}
		if (cnt == sizeof(ident))
		{
			Serial.print("Ident=");
			for (int i = 0; i < cnt; i++)
			{
				Serial.print(ident[i], HEX);
				Serial.write(' ');
			}
			Serial.println();
			return true;
		}
	}

	return false;
}


bool SetEncKey()
{
	bool rc = false;
	// set 2*8 byte encryption key (6+6+4)
	Wire.beginTransmission(Nunchuck_ADR);      // transmit to device 0x52
	Wire.write(0x40);       // sends memory address
	Wire.write(KEY_ENC_ADD);
	Wire.write(KEY_ENC_ADD);
	Wire.write(KEY_ENC_ADD);
	Wire.write(KEY_ENC_ADD);
	Wire.write(KEY_ENC_ADD);
	Wire.write(KEY_ENC_ADD);
	Wire.write(KEY_ENC_ADD);
	Wire.write(KEY_ENC_ADD);

	Wire.write(KEY_ENC_XOR);
	Wire.write(KEY_ENC_XOR);
	Wire.write(KEY_ENC_XOR);
	Wire.write(KEY_ENC_XOR);
	Wire.write(KEY_ENC_XOR);
	Wire.write(KEY_ENC_XOR);
	Wire.write(KEY_ENC_XOR);
	Wire.write(KEY_ENC_XOR);
	if (Wire.endTransmission() == 0)
	{
#if 1
		// enable encryption
		Wire.beginTransmission(Nunchuck_ADR);      // transmit to device 0x52
		Wire.write(0xF0);       // sends memory address
		Wire.write(0xAA);       // sends data.
		if (Wire.endTransmission() == 0)
		{
			rc = true;
			//Serial.println("OK");
		}
#else
		rc = true;
#endif
	}

	return rc;
}


bool Nunchuck::init()
{
#if defined(NEW_WAY)
	error = true;
	unsigned long time = millis();
	do
	{
		// disable encryption
		Wire.beginTransmission(Nunchuck_ADR);      // transmit to device 0x52
		Wire.write(0xF0);       // sends memory address
		Wire.write(0x55);
		if (Wire.endTransmission() == 0)
		{
			Wire.beginTransmission(Nunchuck_ADR);      // transmit to device 0x52
			Wire.write(0xFB);       // sends memory address
			Wire.write(0x00);
			if (Wire.endTransmission() == 0)
			{
				error = false;
				error = !SetEncKey();
				//Serial.println("OK");
			}
		}
	} while (error && (millis() - time) < INIT_TIMEOUT);

	if (error) {
		return true;
	}

	read();
	return error;
#else
	//Serial.println("Init the old way!");
	Wire.beginTransmission(Nunchuck_ADR);
	Wire.write(0x40);
	Wire.write(0x00);
	Wire.endTransmission();

	read();
	return error;
#endif
}

void Nunchuck::request()
{
	// from http://wiki.wiimoteproject.com/Extensions: When filling in a User Input report, the Wii Remote writes a
	// single byte, 0x00, and then issues 1 - 3 reads to fill the report field with all but the last read being 8 bytes. 
	for (int i = 0; i<2; i++)
	{
		Wire.beginTransmission(Nunchuck_ADR);
		Wire.write(0x00);
		Wire.endTransmission();
	}

	Wire.beginTransmission(Nunchuck_ADR);
	Wire.write(0x08); // Input Data address, see register map below
	Wire.endTransmission();
}

bool Nunchuck::read()
{
	uint8_t buf[6];
	error = true;

	request();
	Wire.requestFrom(Nunchuck_ADR, sizeof(buf));

	// read
	int cnt;
	for (cnt = 0; Wire.available() && (cnt < sizeof(buf)); cnt++)
	{
#if defined(NEW_WAY)
		buf[cnt] = Wire.read();
#else
		// the real key is actually 2*8 bytes, see wiimote_encrypt() below
		buf[cnt] = (Wire.read() ^ KEY_DECRYPT_XOR) + KEY_DECRYPT_ADD;
#endif    
	}

	// less than 6 bytes read? error.
	if (cnt != sizeof(buf))
	{
		// this is tricky: the nunchuck doesn't have to be reinitialized, but the values are not ok
		//Serial.print("cnt=");
		//Serial.println(cnt, DEC);
		error = false;
		return false;
	}

	// all 0xff read? error.
	cnt = 0;
	for (int i = 0; i<sizeof(buf); i++)
	{
		if (buf[i] == 0xff) cnt++;
	}
	if (cnt == sizeof(buf)) {
		return false;
	}

	error = false;
	decode(buf);

	return true;
}

void Nunchuck::decode(uint8_t* buf)
{
	joy_x = (int)(buf[0]) - calib_joy_x;
	joy_y = (int)(buf[1]) - calib_joy_y;
	acc_x = (buf[2] << 2) | ((buf[5] >> 2) & 0x03);
	acc_y = (buf[3] << 2) | ((buf[5] >> 4) & 0x03);
	acc_z = (buf[4] << 2) | ((buf[5] >> 6) & 0x03);
	btn_z = (buf[5] & 0x01) ^ 0x01;
	btn_c = ((buf[5] >> 1) & 0x01) ^ 0x01;
}