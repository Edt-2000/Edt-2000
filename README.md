# Ed-2000
Arduino &amp; GameTrak based expressive midi controller

>This is our playground for all our code and experiments, we are in the progress of making separate git repositories for released code. Have a look at the [Edt-2000 organisation](https://github.com/Edt-2000) for all the repositories.

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

## Wishlist overig

Thomas

* Switch (fixed IP per mac-address)

## OSC naming conventions

### Edt-Trak

```
URL                                         Data types  Range           Description
/Tk[0-9]+                                   f,f,f       0.0 - 1.0       XYZ sensor left
                                            f,f,f       0.0 - 1.0       XYZ sensor right
                                            f           0.0 | 1.0       Footpedal
/St[0-9]+                                   f,f         -1.0 - 1.0      Nunchuk XY joystick (0.0 is center)
                                            f,f         0.0 | 1.0       Nunchuk CZ buttons
```

## License

Details about the licensing can be found in the LICENSE file.

* Please use this code for your own DIY projects
* When you make interesting changes and additions; send us a message and/or make a Pull Request
* Send us a link to your blog if you have one, we would love others to use our work to create cool live performances
