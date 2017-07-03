# Edt-2000

Edt-2000 Ecosystem main repository with JS and TS based core code.

## Ecosystem and communication rules

The `Edt` ecosystem consists of `Edt-<INPUT>`, `Edt-<OUTPUT>` and `Edt-<INPUT|OUTPUT>` devices. These communicate through `OSC`, `MIDI` or `WebSockets`. A few guidelines are defined to make them `talk` to each other, and make cross-control possible.

The idea is to have a preset for each output, which can be automated through MIDI or overridden with OSC for improvisation and testing. For each Edt-_Device_ a designated preset **MIDI CC** number is available. That way, we can switch presets programmatically from a MIDI track in _Ableton Live_. Upon receiving a PRESET CC message, the `Edt-Sledt` will send the appropriate messages to initialize the `Edt-<OUTPUT>`. After that, it will also route the correct data so the `Edt-<OUTPUT>` can respond.  

```text
PRESET OUTPUT PRESETS:

20: Edt-Vidt
21: Edt-TOP
22: 
23:
24:
25:
26:
27:
28:
29:
30:
31:

```

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