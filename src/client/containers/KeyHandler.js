const KeyOn = new Set();

const CursorMap = [ 2, 0, 3, 1 ];
const KnobMap = [ 81, 87, 69, 82, 84, 89, 85, 73, 65, 83, 68, 70, 71, 72, 74, 75 ];
const PadMap = [ 90, 88, 67, 86, 66, 78, 77, 188 ];

const state = { knob: [ 0, 0, 0, 0, 0, 0, 0, 0 ] };

export function keyDown(keyCode, props) {
  if (KeyOn.has(keyCode)) {
    return;
  }
  KeyOn.add(keyCode);

  const { actions } = props;
  const knobIndex = KnobMap.indexOf(keyCode);
  const padIndex = PadMap.indexOf(keyCode);

  if (knobIndex !== -1) {
    const i = knobIndex % 8;
    actions.valueShift(state.knob[i], Math.floor(i), knobIndex < 8 ? +1 : -1);
    KeyOn.delete(keyCode);
  } else if (padIndex !== -1) {
    actions.valueChange(2, padIndex, 0x7f);
  } else if (49 <= keyCode && keyCode <= 56) {
    const i = keyCode - 49;
    state.knob[i] = 1 - state.knob[i];
    actions.selectKnob(state.knob[i], i);
  } else if (37 <= keyCode && keyCode <= 40) {
    actions.cusorValueChange(CursorMap[keyCode - 37], 0x7f);
  }
}

export function keyUp(keyCode, props) {
  if (!KeyOn.has(keyCode)) {
    return;
  }
  KeyOn.delete(keyCode);

  const { actions } = props;
  const padIndex = PadMap.indexOf(keyCode);

  if (padIndex !== -1) {
    actions.valueChange(2, padIndex, 0x00);
  } else if (37 <= keyCode && keyCode <= 40) {
    actions.cusorValueChange(CursorMap[keyCode - 37], 0x00);
  }
}
