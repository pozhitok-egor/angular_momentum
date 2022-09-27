import { Component } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-momentum',
  templateUrl: './momentum.component.html',
  styleUrls: ['./momentum.component.scss']
})
export class MomentumComponent {
  now = Date.now();
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  private currentBgIndex = Math.floor(Math.random() * 20) + 1;
  bgURL = '';

  getPartOfDay() {
    const hours = new Date().getHours();
    if (hours < 6) {
      return 'night';
    } else if (hours >= 6 && hours < 12) {
      return 'morning';
    } else if (hours >= 12 && hours < 18) {
      return 'afternoon';
    }
    return 'evening';
  }

  private changeBgUrl() {
    const bgIndex = ('00' + this.currentBgIndex).slice(-2);
    const newBg = new Image();
    newBg.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${this.getPartOfDay()}/${bgIndex}.jpg`;
    newBg.onload = () => {
      this.bgURL = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${this.getPartOfDay()}/${bgIndex}.jpg`
    };
  }

  previous() {
    const prev = this.currentBgIndex - 1;
    this.currentBgIndex = prev >= 1 ? prev : 20;
    this.changeBgUrl();
  }

  next() {
    const next = this.currentBgIndex + 1;
    this.currentBgIndex = next <= 20 ? next : 1;
    this.changeBgUrl();
  }

  constructor()  {
    setInterval(() => {
      this.now = Date.now();
    }, 1000);
    this.changeBgUrl();
  }
}
