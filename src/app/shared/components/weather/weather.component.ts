import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IWeatherData } from 'src/app/interfaces/IWeatherData';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  faSpinner = faSpinner;
  weatherData?: IWeatherData;
  city = "Warsaw";
  isLoading = false;

  changeCity(name: string): void
  changeCity(event: Event): void
  changeCity(arg: string | Event) {
    if (typeof arg === 'object') {
      const target = arg.target as HTMLInputElement;
      this.city = target.value;
    } else {
      this.city = arg;
    }
    this.getCityWeather(this.city);
  }

  toCelsius(value: number) {
    return Math.round(value - 273.15);
  }

  private getCityWeather(city: string) {
    this.isLoading = true;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4dc23877eb7f44ef030e79b174670df2`)
    .then((res) => res.json())
    .then(res => {
      this.isLoading = false;
      if (res.cod === 200) {
        this.weatherData = res;
        localStorage.setItem('city', city)
      }
    })
  }

  constructor() { }

  ngOnInit(): void {
    this.city = localStorage.getItem('city') || "Warsaw";
    this.getCityWeather(this.city);
  }

}
