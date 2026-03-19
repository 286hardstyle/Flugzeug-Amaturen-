import { Component, signal } from '@angular/core';
import { AttitudeIndicator } from './attitude-indicator';
import { AirspeedIndicator } from './airspeed-indicator';
import { Altimeter } from './altimeter';
import { HeadingIndicator } from './heading-indicator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AttitudeIndicator, AirspeedIndicator, Altimeter, HeadingIndicator],
  template: `
    <div class="min-h-screen bg-neutral-900 text-white p-4 md:p-8 font-sans">
      <div class="max-w-6xl mx-auto">
        <header class="mb-10 text-center">
          <h1 class="text-3xl md:text-4xl font-bold tracking-widest uppercase text-neutral-200">Flugzeugarmaturen</h1>
          <p class="text-neutral-500 mt-2 uppercase tracking-wider text-sm">Flight Instruments Dashboard</p>
        </header>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          <div class="flex flex-col items-center">
            <app-airspeed-indicator [airspeed]="airspeed()" class="w-full max-w-[250px]" />
            <span class="mt-4 text-neutral-400 font-mono text-sm">Airspeed</span>
          </div>
          <div class="flex flex-col items-center">
            <app-attitude-indicator [pitch]="pitch()" [roll]="roll()" class="w-full max-w-[250px]" />
            <span class="mt-4 text-neutral-400 font-mono text-sm">Attitude</span>
          </div>
          <div class="flex flex-col items-center">
            <app-altimeter [altitude]="altitude()" class="w-full max-w-[250px]" />
            <span class="mt-4 text-neutral-400 font-mono text-sm">Altimeter</span>
          </div>
          <div class="flex flex-col items-center">
            <app-heading-indicator [heading]="heading()" class="w-full max-w-[250px]" />
            <span class="mt-4 text-neutral-400 font-mono text-sm">Heading</span>
          </div>
        </div>

        <div class="bg-neutral-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-neutral-700/50">
          <div class="flex items-center justify-between mb-8 border-b border-neutral-700 pb-4">
            <h2 class="text-xl font-semibold text-neutral-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Flight Controls
            </h2>
            <button (click)="reset()" class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
              Reset
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <label for="airspeed-input" class="text-sm font-medium text-neutral-400 uppercase tracking-wider">Airspeed</label>
                <span class="text-lg font-mono text-emerald-400 bg-neutral-900 px-3 py-1 rounded-md border border-neutral-700">{{ airspeed() }} kts</span>
              </div>
              <input id="airspeed-input" type="range" min="0" max="200" [value]="airspeed()" (input)="updateAirspeed($event)" class="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <label for="altitude-input" class="text-sm font-medium text-neutral-400 uppercase tracking-wider">Altitude</label>
                <span class="text-lg font-mono text-emerald-400 bg-neutral-900 px-3 py-1 rounded-md border border-neutral-700">{{ altitude() }} ft</span>
              </div>
              <input id="altitude-input" type="range" min="0" max="10000" step="10" [value]="altitude()" (input)="updateAltitude($event)" class="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <label for="pitch-input" class="text-sm font-medium text-neutral-400 uppercase tracking-wider">Pitch</label>
                <span class="text-lg font-mono text-emerald-400 bg-neutral-900 px-3 py-1 rounded-md border border-neutral-700">{{ pitch() }}°</span>
              </div>
              <input id="pitch-input" type="range" min="-30" max="30" [value]="pitch()" (input)="updatePitch($event)" class="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-end">
                <label for="roll-input" class="text-sm font-medium text-neutral-400 uppercase tracking-wider">Roll</label>
                <span class="text-lg font-mono text-emerald-400 bg-neutral-900 px-3 py-1 rounded-md border border-neutral-700">{{ roll() }}°</span>
              </div>
              <input id="roll-input" type="range" min="-90" max="90" [value]="roll()" (input)="updateRoll($event)" class="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
            </div>

            <div class="space-y-3 md:col-span-2 max-w-md mx-auto w-full">
              <div class="flex justify-between items-end">
                <label for="heading-input" class="text-sm font-medium text-neutral-400 uppercase tracking-wider">Heading</label>
                <span class="text-lg font-mono text-emerald-400 bg-neutral-900 px-3 py-1 rounded-md border border-neutral-700">{{ heading() }}°</span>
              </div>
              <input id="heading-input" type="range" min="0" max="359" [value]="heading()" (input)="updateHeading($event)" class="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class App {
  airspeed = signal(120);
  pitch = signal(0);
  roll = signal(0);
  altitude = signal(2500);
  heading = signal(90);

  updateAirspeed(event: Event) {
    this.airspeed.set(Number((event.target as HTMLInputElement).value));
  }
  updatePitch(event: Event) {
    this.pitch.set(Number((event.target as HTMLInputElement).value));
  }
  updateRoll(event: Event) {
    this.roll.set(Number((event.target as HTMLInputElement).value));
  }
  updateAltitude(event: Event) {
    this.altitude.set(Number((event.target as HTMLInputElement).value));
  }
  updateHeading(event: Event) {
    this.heading.set(Number((event.target as HTMLInputElement).value));
  }

  reset() {
    this.airspeed.set(120);
    this.pitch.set(0);
    this.roll.set(0);
    this.altitude.set(2500);
    this.heading.set(90);
  }
}
