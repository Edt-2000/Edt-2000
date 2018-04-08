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
