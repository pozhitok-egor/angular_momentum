import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, skipUntil } from 'rxjs';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent implements OnInit {
  @Input() now: number = Date.now();
  greeting = '';
  name = '';

  constructor() {
  }

  changeName(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    localStorage.setItem('name', this.name);
  }

  changeSize(event: Event) {
    (event.target as HTMLInputElement).style.width =
      this.name.length > 0 ? this.name.length + 'ch' : '12ch';
  }

  private setGreeting(hours: number) {
    if (hours < 6) {
      this.greeting = 'Good night';
    } else if (hours >= 6 && hours < 12) {
      this.greeting = 'Good morning';
    } else if (hours >= 12 && hours < 18) {
      this.greeting = 'Good afternoon';
    } else if (hours >= 18 && hours < 24) {
      this.greeting = 'Good evening';
    }
  }

  ngOnInit(): void {
    this.setGreeting(new Date().getHours());
    this.name = localStorage.getItem('name') || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousHour = new Date(changes['now'].previousValue).getHours();
    const currentHour = new Date(changes['now'].currentValue).getHours();
    if(previousHour !== currentHour) {
      this.setGreeting(currentHour);
    }
  }
}
