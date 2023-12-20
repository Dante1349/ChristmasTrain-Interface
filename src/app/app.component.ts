import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  onSliderChange(event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    this.changeSpeed(value);
  }

  private mapValue(input: number): number {
    if (input === 0) {
      return 0;
    } else if (input >= 1 && input <= 99) {
      // Map input from the range 1-99 to the range 80-255
      const mappedValue = Math.round((input - 1) * (175 / 98)) + 50;
      return Math.min(Math.max(mappedValue, 50), 255); // Ensure the value stays within 80-255 range
    } else {
      // For values outside the specified range
      console.error("error, value not in range")
      return -1;
    }
  }

  changeSpeed(value: string) {
    const mapValue = this.mapValue(Number(value))
    // Send HTTP request here using Angular's HttpClient
    // For example:
    this.http.get(`http://192.168.1.105/?speed=${String(mapValue)}`).subscribe((next) => {
      console.log('HTTP request successful:', next);
    })
  }

  reverseDirection() {
    this.http.get('http://192.168.1.105/reverse').subscribe((next) => {
      console.log('HTTP request successful:', next);
    })
  }
}
