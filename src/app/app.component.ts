import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly IP: string = '192.168.1.105'
  private readonly SPEED_LIMIT: number = 120
  public speed: number = 0;
  public realSpeed: number = 0;
  constructor(private http: HttpClient) {}

  onSliderChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.changeSpeed(value);
  }

  private mapValue(input: number): number {
    if (input < 0 || input > 99) {
      console.error("Input value should be between 0 and 99.");
      return 0;
    }

    return Math.round((input / 99) * this.SPEED_LIMIT);
  }

  changeSpeed(value: string): void {
    const mapValue = this.mapValue(this.speed)
    this.realSpeed = mapValue;
    this.http.get(`http://${this.IP}/?speed=${String(mapValue)}`).subscribe((next) => {
      console.log('HTTP request successful:', next);
    })
  }

  reverseDirection(): void {
    this.http.get(`http://${this.IP}/reverse`).subscribe((next) => {
      console.log('HTTP request successful:', next);
    })
  }
}
