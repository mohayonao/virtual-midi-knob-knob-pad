export const WIDTH = 1000;
export const HEIGHT = 500;

export const PadWidth  = 100;
export const PadHeight = 150;
export const PaddingTop   =  25;
export const PaddingLeft  =  50;

export const TemplateLayout = [
  [ 890, toCY(0) ],
  [ 960, toCY(0) ],
];

export const CursorLayout = [
  [ 890, toCY(1) ], [ 960, toCY(1) ],
  [ 890, toCY(2) ], [ 960, toCY(2) ],
];

export function toCX(col) {
  return col * PadWidth + (PaddingLeft + PadWidth / 2);
}

export function toCY(row) {
  return [ 120, 270, 400 ][row];
}
