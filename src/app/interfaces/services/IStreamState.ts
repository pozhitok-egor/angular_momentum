export interface IStreamState {
  playing: boolean,
  readableCurrentTime: string,
  readableDuration: string,
  duration?: number,
  currentTime?: number,
  volume: number,
  canplay: boolean,
  error: boolean,
};
