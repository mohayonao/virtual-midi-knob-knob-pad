import midi from "midi";
import * as types from "../../common/ActionTypes";
import { NUMBER_OF_COLS } from "../../common/constants";

export default class MIDIDevice {
  constructor(deviceName, actions) {
    this.deviceName = deviceName;
    this.actions = actions;
    this.midiInput = null;
    this.midiOutput = null;
    this.state = {};
  }

  open() {
    if (this.midiInput === null) {
      this.midiInput = new midi.input();
      this.midiInput.openVirtualPort(this.deviceName);
      this.midiInput.on("message", (_, data) => {
        this.recvMessage(data);
      });
    }
    if (this.midiOutput === null) {
      this.midiOutput = new midi.output();
      this.midiOutput.openVirtualPort(this.deviceName);
    }
  }

  close() {
    if (this.midiInput !== null) {
      this.midiInput.closePort();
      this.midiInput = null;
    }
    if (this.midiOutput !== null) {
      this.midiOutput.closePort();
      this.midiOutput = null;
    }
  }

  setState(state) {
    this.state.midiChannel = state.template * 8;
  }

  doAction(action) {
    switch (action.type) {
    case types.VALUE_CHANGE:
      fromLaucnControlPos(action.row, action.col, (st, d1) => {
        this.sendMessage(st + this.state.midiChannel, d1, action.value);
      });
      break;
    case types.CURSOR_VALUE_CHANGE:
      fromLaucnControlCursorPos(action.index, (st, d1) => {
        this.sendMessage(st + this.state.midiChannel, d1, action.value);
      });
    }
  }

  recvMessage([ st, d1, d2 ]) {
    toLaunchControlPos(st & 0xf0, d1, (row, col) => {
      if (row === -1) {
        this.actions.cursorValueSet(col, d2);
      } else {
        this.actions.valueSet(row, col, d2);
      }
    });
  }

  sendMessage(st, d1, d2) {
    if (this.midiOutput !== null) {
      this.midiOutput.sendMessage([ st, d1, d2 ]);
    }
  }
}

export const D1 = [
  0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c,
  0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f, 0x30,
  0x09, 0x0a, 0x0b, 0x0c, 0x19, 0x1a, 0x1b, 0x1c,
];

export function fromLaucnControlPos(row, col, callback) {
  const st = row === 2 ? 0x90 : 0xb0;
  const d1 = D1[row * NUMBER_OF_COLS + col] || 0x00;

  if (d1 !== 0x00) {
    callback(st, d1);
  }
}

export function fromLaucnControlCursorPos(index, callback) {
  const st = 0xb0;
  const d1 = [ 0x72, 0x73, 0x74, 0x75 ][index] || 0x00;

  if (d1 !== 0x00) {
    callback(st, d1);
  }
}

export function toLaunchControlPos(st, d1, callback) {
  if (st === 0xb0) {
    const index = D1.slice(0, 16).indexOf(d1);

    if (index !== -1) {
      callback(Math.floor(index / NUMBER_OF_COLS), Math.floor(index % NUMBER_OF_COLS));
    }

    const indexCursor = [ 0x72, 0x73, 0x74, 0x75 ].indexOf(d1);

    if (indexCursor !== -1) {
      callback(-1, indexCursor);
    }
  }

  if (st === 0x90) {
    const index = D1.slice(16).indexOf(d1);

    if (index !== -1) {
      callback(2, index);
    }
  }
}
