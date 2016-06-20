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

* Arduino Leonardo with Ethernet (http://www.arduino.org/products/boards/arduino-leonardo-eth, webshop: https://www.antratek.nl/arduino-ethernet)


## OSC naming conventions

### Edt-Trak

```
URL                                                 Data type   Range       Description
/Trak[0-9]+/{x,y,z}/{left,right}                    i           0 - 256     XYZ sensor
/Trak[0-9]+/footpedal                               b           0 - 1       Footpedal
/Trak[0-9]+/chuk[0-9]+/{x,y}                        i           0 - 256     Nunchuk XY joystick
/Trak[0-9]+/chuk[0-9]+/{c,z}                        b           0 - 1       Nunchuck C and Z buttons
```
