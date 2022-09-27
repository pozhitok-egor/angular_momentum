import { Component, OnInit } from '@angular/core';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { IStreamState } from 'src/app/interfaces/services/IStreamState';
import { AudioService } from 'src/app/services/audio.service';

const music = [
]

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  state?: IStreamState = undefined;
  tracks = [
    { title: 'Breathe', artist: 'Tobjan', url: '../../../../assets/music/Breathe.mp3'},
    { title: 'Closer', artist: 'LiQWYD', url: '../../../../assets/music/Closer.mp3'},
    { title: 'We are one', artist: 'Vexento', url: '../../../../assets/music/We are one.mp3'},
  ];
  private currentTrack = 0;
  faCirclePlay = faCirclePlay;
  faCirclePause = faCirclePause;
  faBackwardFast = faBackwardFast;
  faForwardFast = faForwardFast;
  constructor(private audioService: AudioService) { }

  play(selected?: number) {
    console.log(this.currentTrack);
    if (selected !== undefined) {
      this.currentTrack = selected;
      this.audioService.playStream(this.tracks[this.currentTrack].url).subscribe();
    } else if (this.state?.canplay) {
      this.audioService.play();
    } else {
      this.audioService.playStream(this.tracks[this.currentTrack].url).subscribe();
    }
  }

  previousTrack() {
    const prev = this.currentTrack - 1;
    this.currentTrack = prev >= 0 ? prev : this.tracks.length - 1;
    this.play(this.currentTrack);
  }

  nextTrack() {
    const next = this.currentTrack + 1;
    const max = this.tracks.length - 1;
    this.currentTrack = next <= max ? next : 0;
    this.play(this.currentTrack);
  }

  pause() {
    this.audioService.pause()
  }

  ngOnInit(): void {
    this.audioService.getState().subscribe({next: (value) => {
      this.state = value;
    }})
  }

}
