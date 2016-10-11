const KeyOn = new Set();

export function keyDown(keyCode /*, props */) {
  if (KeyOn.has(keyCode)) {
    return;
  }
  KeyOn.add(keyCode);
}

export function keyUp(keyCode /*, props */) {
  if (!KeyOn.has(keyCode)) {
    return;
  }
  KeyOn.delete(keyCode);
}
