# Edt-2000

The `Edt-2000` is a long-running project created to make live music performances more interesting and interactive. Originally only based around a Gametrak controller, it has evolved into a large collection of code that communicates with each other through various (open source) protocols to create a light/visual show that is mostly directly controlled by the music itself. The code is open source and free for anyone to use, but not yet optimized or setup in a way for non-experienced programmers to easily extend or use without at least some knowledge of Javascript.

## Current state

Currently the project is in a phase where it needs to grow in features; after we have done more performances and fine-tuned the experience we will try to work towards refactoring towards a more modular setup so that it becomes more easy to customize and extend with your own effects and content. Please do get in touch when you want to try the system; we are glad to help!

For now, before you dive in, be aware that we might rewrite big parts of the codebase and break any old versions you have modified; please let us know when you actively use the system so we can notify you of design changes!

## Ecosystem

The `Edt-2000` is mostly written in `TypeScript`, currently using `Node`, `Angular` and `Vue` for it's main apps. There are some side-apps written with `Processing`, `Arduino`, `C++`, `C#` and there is even a test app for windows hidden somewhere. In the older parts of the repository you also will find some `MaxMSP` patches that we used in the beginning of the project which might even be useful for someone. Communication between parts of the system is mostly done with `MIDI`, `OSC` and `websockets/JSON`, trying to keep it as standard and flexible as possible.

### Edt-FastLED & Edt-RGBLED

In a flight case we have mounted some custom PCB's that can currently control up to 8 addressable and 8 normal RGB LED strips. 2 Arduino's run the FastLED library with some custom code to respond to `OSC` send by the `Edt-Sledt` over the serial ports. The LED strips are mounted on aluminium profiles which you can buy almost anywhere nowadays, making them cheap alternatives to the often expensive DMX RGB led lights. As I found a whole batch of UTP keystones a long time ago, we used these to connect standard UTP ethernet cables from the flight case to the LED strips. These cables come in all sizes and are much cheaper than any other cable we could find, making the overall cost reasonable per LED strip.

### Edt-Vidt

The `Edt-Vidt` is the _video_ part of the project; It displays a fullscreen `Vue` web application that can show videos/images/animations/text/colors/etc, controlled by the `Edt-Sledt` over a websocket connection. The app has a number of `presets` that each show something different on screen; check the code to see what is currently implemented.

In our setup we are using 4 old 22" TV's that we bought at a second hand store and a 32" TV on a microphone stand, connected to a laptop with an 8 channel HDMI splitter, making it simple and reliable. It can even run on multiple laptops/computers and control even more screens, so it's pretty flexible depending on your needs.  

### Edt-Control

