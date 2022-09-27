import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";
import { IStreamState } from '../interfaces/services/IStreamState';
import { IAudioEvents } from '../interfaces/services/IAudioEvents';
import { IAudioEvent } from '../interfaces/services/IAudioEvent';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private state: IStreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    volume: 0.5,
    canplay: false,
    error: false,
  };
  private stop$ = new Subject();
  private audioObj = new Audio();
  audioEvents: IAudioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  private stateChange: BehaviorSubject<IStreamState> = new BehaviorSubject(
    this.state
  );

  constructor() {
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      volume: 0.5,
      canplay: false,
      error: false
    };
  }

  getState(): Observable<IStreamState> {
    return this.stateChange.asObservable();
  }

  private streamObservable(url: string) {
    return new Observable(observer => {
      // Play audio
      console.log("trying to play: ", url);
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj: HTMLAudioElement, events: IAudioEvents, handler: (event: Event) => void) {
    events.forEach((event: IAudioEvent) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: HTMLAudioElement, events: IAudioEvents, handler: (event: Event) => void) {
    events.forEach((event: IAudioEvent) => {
      obj.removeEventListener(event, handler);
    });
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next(true);
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  setVolume(volume: number) {
    this.audioObj.volume = volume;
  }

  formatTime(time: number) {
    const momentTime = time * 1000;
    return (time < 3600) ? moment.utc(momentTime).format("mm:ss") : moment.utc(momentTime).format("HH:mm:ss");
  }
}
