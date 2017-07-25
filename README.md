# Edt-2000

Edt-2000 Ecosystem main repository with JS and TS based core code. The `Edt` ecosystem consists of `Edt-<INPUT>`, `Edt-<OUTPUT>` and `Edt-<INPUT|OUTPUT>` devices. These communicate through `OSC`, `MIDI` or `WebSockets`. A few guidelines are defined to make them `talk` to each other, and make cross-control possible.

## Ecosystem and communication rules



### Edt-Sledt

The `Edt-Slet` is the core component; the one to take most inputs and route it to other inputs. `Sledt` means slut in Dutch, as it's basically the one to take input from almost all other components..

#### Song Select MIDI messages

An important function of the Edt-Sledt is to control `Ableton Live` depending on `MIDI` input from the Sequencer.   
















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
