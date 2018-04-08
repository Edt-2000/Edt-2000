# Edt-2000

Edt-2000 Ecosystem main repository with JS and TS based core code. The `Edt` ecosystem consists of `Edt-<INPUT>`, `Edt-<OUTPUT>` and `Edt-<INPUT|OUTPUT>` devices. These communicate through `OSC`, `MIDI` or `WebSockets`. A few guidelines are defined to make them `talk` to each other, and make cross-control possible.

Please be aware that this github is mostly a way of keeping in sync between two computers, so no branches, features, hotfixes or anything a sane developer would do. It could break anytime. Sometimes we even try to break the master branch so that we can laugh at each other trying to fix bugs.

Other than that, please feel free to try and fork/PR or use for your own project. When we have a bit more time we will try to create a more robust codebase for everyone to use, but this is now currently in extreme Alpha. Use at own risk!

If you need help feel free to ask though!

## Ecosystem and communication rules



### Edt-Sledt

The `Edt-Slet` is the core component; the one to take most inputs and route it to other inputs. `Sledt` means slut in Dutch, as it's basically the one to take input from almost all other components..

#### Song Select MIDI messages

An important function of the Edt-Sledt is to control `Ableton Live` depending on `MIDI` input from the Sequencer.   



### Edt-Vue Vidt
Run: 

`cd Edt-Socket-Server npm start`
`cd Edt-Test-Control npm start`
`cd Edt-Vue-Vidt npm start`













---


Overview
```text

                                                      +------------+
                                                      |            |
                                                      |  Edt-Padt  |
                                                      |            |
                                                      +-----+------+
                                                            |
                                                           OSC
                                                            |
                                                            v

+------------+                                        +-----------+                        +--------------+
|            |                                        |           |                        |              |
| MIDI SYNTH +---> MIDI SELECT + MIDI NOTE INFO +---> | Edt-Sledt <------------------------> ABLETON LIVE |
|            |                                        |           |                        |              |
+------------+                                        +-----+-----+                        +--------------+
                                                            |
                                                            |                              +--------------+
                                                            |                              |              |
                                                            +-----> SOCKET                 |   Edt-Vidt   |
                                                            |                              |              |
                                                            |                              +--------------+
                                                            +-----> OSC
                                                            |
                                                            |
                                                            +-----> MIDI
                                                            |
                                                            |
                                                            +-----> DMX



```

A simple structure of the flows of data within the ecosystem.

# Ed-2000
Arduino &amp; GameTrak based expressive midi controller

>This is our playground for all our code and experiments, we are in the progress of making separate git repositories for released code. Have a look at the [Edt-2000 organisation](https://github.com/Edt-2000) for all the repositories.

## OSC lighting commands

### Single color, solid
/address 1 [start: int] [end: int] [h: int] [s: int] [l: int] [duration (only required with l == 0): int]

l == 0 dims using pulse

### Single color, pulse
/address 2 [start: int] [end: int] [h: int] [s: int] [l: int] [duration: int]

### Rainbow color, solid
/address 3 [start: int] [end: int] [h start: int] [delta h: int] [duration (only required with delta h == 0): int]

delta h == 0 dims using pulse

### Rainbow color, pulse
/address 4 [start: int] [end: int] [h start: int] [delta h: int] [duration: int]

### VU Meter
/address 100 [start: int] [end: int] [center: int] [h start: int] [delta h: int] [intensity: int]

### Strobo
/address 200 [h: int] [fps: int]

h == 0 yields white strobo
fps == 0 stops strobo

## License

Details about the licensing can be found in the LICENSE file.

* Please use this code for your own DIY projects
* When you make interesting changes and additions; send us a message and/or make a Pull Request
* Send us a link to your blog if you have one, we would love others to use our work to create cool live performances
