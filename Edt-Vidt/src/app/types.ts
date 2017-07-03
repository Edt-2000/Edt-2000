export enum Modes {
  colorFlashMode,
  sparkleMode,
  simpleVid
}

/**
 * A modeChange message changes the route of the front app and does pre-loading if need
 */
export interface modeChange {
  type: Modes
}

export interface NoteMessage {
  type: string,
  note: number,
  velocity: number,
  channel: number
}

export interface ControlMessage {
  type: string,
  controller: number,
  value: number,
  channel: number
}
