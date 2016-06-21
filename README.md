# Ed-2000
Arduino &amp; GameTrak based expressive midi controller

## Wishlist [Floris.cc](http://www.floris.cc)

Edwin

* Nunchucky's
* Lots of Neopixels
* Arduino's that fit into the Edt housing
* Wireless modules to create Edt-Light Suits!
* EL Wire to test with

Thomas

* ~~Arduino Leonardo with Ethernet (http://www.arduino.org/products/boards/arduino-leonardo-eth, webshop: https://www.antratek.nl/arduino-ethernet)~~
* ~~Sparkfun Thing (https://www.antratek.nl/sparkfun-esp8266-thing)~~


## OSC naming conventions

### Edt-Trak

```
URL                                           Data types  Range           Description
/Trak[0-9]+/{left,right}                      f,f,f       0.0 - 1.0       XYZ sensor
/Trak[0-9]+/footpedal                         f           0.0 | 1.0       Footpedal
/Trak[0-9]+/chuk[0-9]+                        f,f         0.0 - 1.0       Nunchuk XY joystick
/Trak[0-9]+/chuk[0-9]+                        f,f         0.0 | 1.0       Nunchuck C and Z buttons
```
