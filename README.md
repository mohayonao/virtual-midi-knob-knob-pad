# Virtual MIDI Knob Knob Pad

Electron-based Virtual MIDI Controller that like [Novation Launch Control](https://us.novationmusic.com/launch/launch-control)

![screen shot](./assets/screenshot.png)

## Installation

```
$ git clone https://github.com/mohayonao/virtual-midi-knob-knob-pad.git
$ cd virtual-midi-knob-knob-pad
$ npm install
```

## Run

```
$ npm start
```

### ...with Web Based App

If set the environment variable `PORT`, you can use the web based app. In the web based app with a tablet, you would get the UX that is closer to a hardware MIDI device.

```
$ PORT=7700 npm start
```

## Keyboard Layout

![keyboard layout](./assets/key-layout.png)

## Build (for macOS)

```
$ npm run package
```

## License

MIT
